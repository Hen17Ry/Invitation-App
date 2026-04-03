export type EventType = 
  | 'mariage' 
  | 'deces' 
  | 'naissance' 
  | 'bapteme' 
  | 'anniversaire' 
  | 'ceremonie'

export type LienStatus = 'actif' | 'expire' | 'revoque' | 'termine'

export interface Evenement {
  id: string
  user_id: string
  type: EventType
  titre: string
  date_evenement: string
  lieu: string
  description: string
  nombre_invites: number
  brief_genere: string
  image_url: string | null
  modifications_count: number  // max 3 gratuites
  statut: 'brouillon' | 'paye' | 'actif' | 'termine'
  prix_final: number
  created_at: string
}

export interface Lien {
  id: string
  evenement_id: string
  token: string               // token unique dans l'URL
  statut: LienStatus
  compteur: number            // validations effectuées
  max_utilisations: number    // = nombre_invites
  created_at: string
  expire_at: string | null
}

export interface Invitation {
  id: string
  lien_id: string
  evenement_id: string
  nom: string
  prenom: string
  valide_at: string
  scan_count: number          // 0 ou 1 (marqué au scan)
  scanne_at: string | null
}

export interface Paiement {
  id: string
  evenement_id: string
  user_id: string
  montant: number
  statut: 'pending' | 'success' | 'failed'
  kkiapay_transaction_id: string | null
  created_at: string
}

export type CreationStep = 
  | 'type' 
  | 'details' 
  | 'description' 
  | 'brief' 
  | 'generation' 
  | 'paiement'