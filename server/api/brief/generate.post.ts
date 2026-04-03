export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const {
    type, titre, date_evenement, lieu,
    nombre_invites, description, theme,
    couleurs, langue
  } = body

  const typeLabels: Record<string, string> = {
    mariage: 'mariage',
    deces: 'avis de décès',
    naissance: 'annonce de naissance',
    bapteme: 'baptême',
    anniversaire: 'anniversaire',
    ceremonie: 'cérémonie',
  }

  const langueLabels: Record<string, string> = {
    fr: 'français',
    en: 'anglais',
    fon: 'fon',
    yoruba: 'yoruba',
  }

  const prompt = `Tu es un directeur artistique senior spécialisé dans les faire-parts de luxe pour l'Afrique de l'Ouest. Tu as 20 ans d'expérience dans la conception visuelle haut de gamme.

INFORMATIONS DU CLIENT :
- Type d'événement : ${typeLabels[type] || type}
- Titre : ${titre}
- Date : ${date_evenement}
- Lieu : ${lieu}
- Nombre d'invités : ${nombre_invites}
- Vision du client : ${description}
- Thème / Ambiance : ${theme || 'Au choix selon le type'}
- Couleurs choisies : ${couleurs?.length ? couleurs.join(', ') : 'À définir selon le style'}
- Langue de la carte : ${langueLabels[langue] || langue}

TON TRAVAIL :

1. BRIEF_UTILISATEUR (ce que le client va lire et valider) :
Rédige une description artistique et précise en français de la carte finale.
Tu dois décrire avec précision :
- Le fond : texture, matière, couleur exacte, effets (dégradé, motif, uni...)
- La typographie : police principale (serif, script, moderne...), taille relative, graisse, couleur, espacement
- La hiérarchie visuelle : ce qui apparaît en premier, deuxième, troisième à l'oeil
- Les éléments décoratifs : formes, ornements, filets, cadres, motifs culturels, fleurs, etc.
- Les couleurs : avec leurs rôles exacts (fond, texte principal, accent, bordure...)
- L'ambiance générale : ce que ressent la personne qui reçoit cette carte
- Le positionnement du texte : centré, aligné, disposition sur la carte
Style : fluide, élégant, inspirant. Max 200 mots. Pas de liste à puces.

2. PROMPT_IMAGE (le prompt technique pour générer l'image, le client ne le verra pas) :
Rédige un prompt en anglais ultra-détaillé et optimisé pour FLUX Pro / SDXL.
Structure obligatoire : [description principale] [style graphique] [couleurs exactes en hex] [typographie] [éléments décoratifs] [composition] [éclairage et texture] [qualité]
Inclus impérativement :
- "invitation card" et le type exact en anglais
- Les couleurs en hex
- Le style graphique précis (Art Deco, Afrocentric luxury, modern minimalist, etc.)
- Les éléments culturels si pertinents (kente pattern, bogolan, adinkra symbols, etc.)
- La qualité : "ultra high quality, 4K, print ready, professional design"
Max 250 mots, une seule ligne dense sans retour à la ligne.

REPONDS UNIQUEMENT AVEC CE JSON (rien avant, rien après, pas de backticks) :
{"brief_utilisateur": "...", "prompt_image": "..."}`

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.openrouterApiKey}`,
        'HTTP-Referer': 'https://avis-app.com',
        'X-Title': 'Avis App',
      },
      body: JSON.stringify({
        model: 'openrouter/auto',
        messages: [
          {
            role: 'system',
            content: 'Tu es un directeur artistique expert. Tu reponds uniquement en JSON valide, sans markdown, sans backticks, sans texte avant ou apres le JSON.',
          },
          {
            role: 'user',
            content: prompt,
          }
        ],
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('OpenRouter HTTP error:', response.status, errText)
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()
    console.log('OpenRouter raw response:', JSON.stringify(data))

    const text = data.choices?.[0]?.message?.content || ''
    console.log('OpenRouter text content:', text)

    if (!text) {
      throw new Error('Réponse vide du modèle')
    }

    const cleaned = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Aucun JSON trouvé dans la réponse')
    }

    const parsed = JSON.parse(jsonMatch[0])

    return {
      success: true,
      brief_utilisateur: parsed.brief_utilisateur || '',
      prompt_image: parsed.prompt_image || '',
    }

  } catch (err) {
    console.error('Erreur OpenRouter:', err)
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la génération du brief',
    })
  }
})