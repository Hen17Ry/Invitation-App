export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { prompt, type } = body

  if (!prompt) {
    throw createError({ statusCode: 400, message: 'Prompt manquant' })
  }

  // Enrichissement du prompt selon le type d'événement
  const styleByType: Record<string, string> = {
    mariage: 'luxury wedding invitation card, romantic, elegant, celebratory',
    deces: 'funeral announcement card, solemn, dignified, respectful, dark tones',
    naissance: 'birth announcement card, joyful, soft, delicate, warm pastel tones',
    bapteme: 'baptism invitation card, pure, serene, spiritual, gentle colors',
    anniversaire: 'birthday invitation card, festive, colorful, joyful, celebratory',
    ceremonie: 'ceremony invitation card, formal, prestigious, sophisticated',
  }

  const enrichedPrompt = `${prompt}, ${styleByType[type] || 'event invitation card'}, ultra high quality, 4K, print ready, professional graphic design, sharp details, no text, no watermark`

  console.log('Prompt image envoyé:', enrichedPrompt)

  try {
    const response = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${config.falApiKey}`,
      },
      body: JSON.stringify({
        prompt: enrichedPrompt,
        image_size: 'portrait_4_3',
        num_inference_steps: 8,
        num_images: 1,
        enable_safety_checker: false,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('fal.ai HTTP error:', response.status, errText)
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()
    console.log('fal.ai response:', JSON.stringify(data))

    const imageUrl = data.images?.[0]?.url

    if (!imageUrl) {
      throw new Error('Aucune image retournée par fal.ai')
    }

    return {
      success: true,
      image_url: imageUrl,
    }

  } catch (err) {
    console.error('Erreur fal.ai:', err)
    throw createError({
      statusCode: 500,
      message: "Erreur lors de la génération de l'image",
    })
  }
})