import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Champs manquants.' })
  }

  const supabase = createClient(
    config.public.supabaseUrl,
    process.env.SUPABASE_SERVICE_KEY!
  )

  // Récupère l'utilisateur
  const { data: user, error } = await supabase
    .from('utilisateurs')
    .select('id, email, nom_complet, avatar_url, provider, password')
    .eq('email', email.toLowerCase())
    .single()

  if (error || !user) {
    throw createError({ statusCode: 401, message: 'Email ou mot de passe incorrect.' })
  }

  if (!user.password) {
    throw createError({ statusCode: 401, message: 'Compte sans mot de passe. Utilisez Google.' })
  }

  // Vérifie le mot de passe
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    throw createError({ statusCode: 401, message: 'Email ou mot de passe incorrect.' })
  }

  // Génération du JWT (expire 24h)
  const token = jwt.sign(
    { id: user.id, email: user.email },
    config.jwtSecret,
    { expiresIn: '24h' }
  )

  // Retourne sans le mot de passe
  const { password: _, ...userSafe } = user

  return { success: true, token, user: userSafe }
})