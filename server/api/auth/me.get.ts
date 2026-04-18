import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const authHeader = getHeader(event, 'authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, message: 'Token manquant.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    throw createError({ statusCode: 401, message: 'Token manquant.' });
  }

  if (!config.jwtSecret) {
    throw createError({ statusCode: 500, message: 'JWT secret is missing.' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as unknown;

    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'email' in decoded) {
      const userPayload = decoded as { id: string; email: string };

      // Check if the Supabase key is missing
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
      if (!supabaseServiceKey) {
        throw createError({ statusCode: 500, message: 'Supabase service key is missing.' });
      }

      // Initialize Supabase client with the service key
      const supabase = createClient(config.public.supabaseUrl, supabaseServiceKey);

      const { data: user } = await supabase
        .from('utilisateurs')
        .select('id, email, nom_complet, avatar_url, provider')
        .eq('id', userPayload.id)
        .single();

      if (!user) {
        throw createError({ statusCode: 401, message: 'Utilisateur introuvable.' });
      }

      return { user };
    } else {
      throw createError({ statusCode: 401, message: 'Token invalide ou expiré.' });
    }
  } catch (err) {
    throw createError({ statusCode: 401, message: 'Token invalide ou expiré.' });
  }
});