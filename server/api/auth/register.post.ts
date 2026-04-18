import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { email, password, nom_complet } = await readBody(event)

  if (!email || !password || !nom_complet) {
    throw createError({ statusCode: 400, message: 'Champs manquants.' })
  }

  if (password.length < 8) {
    throw createError({ statusCode: 400, message: 'Minimum 8 caractères.' })
  }

  const supabase = createClient(
    config.public.supabaseUrl,
    process.env.SUPABASE_SERVICE_KEY!
  )

  // Vérifie si l'email existe déjà
  const { data: existing } = await supabase
    .from('utilisateurs')
    .select('id')
    .eq('email', email.toLowerCase())
    .single()

  if (existing) {
    throw createError({ statusCode: 409, message: 'Cet email est déjà utilisé.' })
  }

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, 12)
  const id = uuidv4()

  // Création de l'utilisateur
  const { data: user, error: dbError } = await supabase
    .from('utilisateurs')
    .insert({
      id,
      email: email.toLowerCase(),
      nom_complet,
      password: hashedPassword,
      provider: 'email',
    })
    .select('id, email, nom_complet, avatar_url, provider')
    .single()

  if (dbError) {
    console.error('DB error:', dbError)
    throw createError({ statusCode: 500, message: 'Erreur création compte.' })
  }

  // Génération du JWT (expire 24h)
  const token = jwt.sign(
    { id: user.id, email: user.email },
    config.jwtSecret,
    { expiresIn: '24h' }
  )

  return { success: true, token, user }
})