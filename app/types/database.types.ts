export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      evenements: {
        Row: {
          brief_genere: string | null
          couleurs: string[] | null
          created_at: string
          date_evenement: string
          description: string
          id: string
          image_url: string | null
          langue: string
          lieu: string
          modifications_count: number
          nombre_invites: number
          prix_base: number
          prix_final: number
          statut: string
          theme: string | null
          titre: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          brief_genere?: string | null
          couleurs?: string[] | null
          created_at?: string
          date_evenement: string
          description: string
          id?: string
          image_url?: string | null
          langue?: string
          lieu: string
          modifications_count?: number
          nombre_invites: number
          prix_base?: number
          prix_final?: number
          statut?: string
          theme?: string | null
          titre: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          brief_genere?: string | null
          couleurs?: string[] | null
          created_at?: string
          date_evenement?: string
          description?: string
          id?: string
          image_url?: string | null
          langue?: string
          lieu?: string
          modifications_count?: number
          nombre_invites?: number
          prix_base?: number
          prix_final?: number
          statut?: string
          theme?: string | null
          titre?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      invitations: {
        Row: {
          evenement_id: string
          id: string
          lien_id: string
          nom: string
          prenom: string
          scan_count: number
          scanne_at: string | null
          valide_at: string
        }
        Insert: {
          evenement_id: string
          id?: string
          lien_id: string
          nom: string
          prenom: string
          scan_count?: number
          scanne_at?: string | null
          valide_at?: string
        }
        Update: {
          evenement_id?: string
          id?: string
          lien_id?: string
          nom?: string
          prenom?: string
          scan_count?: number
          scanne_at?: string | null
          valide_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitations_evenement_id_fkey"
            columns: ["evenement_id"]
            isOneToOne: false
            referencedRelation: "evenements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitations_lien_id_fkey"
            columns: ["lien_id"]
            isOneToOne: false
            referencedRelation: "liens"
            referencedColumns: ["id"]
          },
        ]
      }
      liens: {
        Row: {
          compteur: number
          created_at: string
          evenement_id: string
          expire_at: string | null
          id: string
          max_utilisations: number
          statut: string
          token: string
        }
        Insert: {
          compteur?: number
          created_at?: string
          evenement_id: string
          expire_at?: string | null
          id?: string
          max_utilisations: number
          statut?: string
          token: string
        }
        Update: {
          compteur?: number
          created_at?: string
          evenement_id?: string
          expire_at?: string | null
          id?: string
          max_utilisations?: number
          statut?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "liens_evenement_id_fkey"
            columns: ["evenement_id"]
            isOneToOne: false
            referencedRelation: "evenements"
            referencedColumns: ["id"]
          },
        ]
      }
      paiements: {
        Row: {
          created_at: string
          evenement_id: string
          id: string
          kkiapay_transaction_id: string | null
          montant: number
          statut: string
          user_id: string
        }
        Insert: {
          created_at?: string
          evenement_id: string
          id?: string
          kkiapay_transaction_id?: string | null
          montant: number
          statut?: string
          user_id: string
        }
        Update: {
          created_at?: string
          evenement_id?: string
          id?: string
          kkiapay_transaction_id?: string | null
          montant?: number
          statut?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "paiements_evenement_id_fkey"
            columns: ["evenement_id"]
            isOneToOne: false
            referencedRelation: "evenements"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      valider_invitation: {
        Args: { p_nom: string; p_prenom: string; p_token: string }
        Returns: Json
      }
      verifier_qr: { Args: { p_invitation_id: string }; Returns: Json }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
