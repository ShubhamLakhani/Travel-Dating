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
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      interview_opt_ins: {
        Row: {
          completed_at: string | null
          contacted_at: string | null
          created_at: string
          id: string
          status: string
          submission_id: string
          waitlist_user_id: string
        }
        Insert: {
          completed_at?: string | null
          contacted_at?: string | null
          created_at?: string
          id?: string
          status?: string
          submission_id: string
          waitlist_user_id: string
        }
        Update: {
          completed_at?: string | null
          contacted_at?: string | null
          created_at?: string
          id?: string
          status?: string
          submission_id?: string
          waitlist_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_opt_ins_waitlist_user_id_fkey"
            columns: ["waitlist_user_id"]
            isOneToOne: false
            referencedRelation: "waitlist_users"
            referencedColumns: ["id"]
          },
        ]
      }
      preferences: {
        Row: {
          created_at: string
          custom_interest: string | null
          id: string
          meet_preference: string
          relationship_intentions: string[]
          travel_interests: string[]
          updated_at: string
          waitlist_user_id: string
        }
        Insert: {
          created_at?: string
          custom_interest?: string | null
          id?: string
          meet_preference: string
          relationship_intentions: string[]
          travel_interests?: string[]
          updated_at?: string
          waitlist_user_id: string
        }
        Update: {
          created_at?: string
          custom_interest?: string | null
          id?: string
          meet_preference?: string
          relationship_intentions?: string[]
          travel_interests?: string[]
          updated_at?: string
          waitlist_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "preferences_waitlist_user_id_fkey"
            columns: ["waitlist_user_id"]
            isOneToOne: true
            referencedRelation: "waitlist_users"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          arrival_date: string
          created_at: string
          departure_date: string
          destination_country: string
          destination_country_code: string | null
          destination_id: string
          destination_name: string
          id: string
          market_slug: string
          travel_mode: string
          updated_at: string
          waitlist_user_id: string
        }
        Insert: {
          arrival_date: string
          created_at?: string
          departure_date: string
          destination_country: string
          destination_country_code?: string | null
          destination_id: string
          destination_name: string
          id?: string
          market_slug: string
          travel_mode: string
          updated_at?: string
          waitlist_user_id: string
        }
        Update: {
          arrival_date?: string
          created_at?: string
          departure_date?: string
          destination_country?: string
          destination_country_code?: string | null
          destination_id?: string
          destination_name?: string
          id?: string
          market_slug?: string
          travel_mode?: string
          updated_at?: string
          waitlist_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_waitlist_user_id_fkey"
            columns: ["waitlist_user_id"]
            isOneToOne: false
            referencedRelation: "waitlist_users"
            referencedColumns: ["id"]
          },
        ]
      }
      validation_submissions: {
        Row: {
          confirmation_email_last_attempt_at: string | null
          confirmation_email_sent_at: string | null
          confirmation_email_status: string
          created_at: string
          interview_opt_in: boolean
          payload_hash: string
          submission_id: string
          trip_created: boolean
          trip_id: string
          waitlist_user_id: string
        }
        Insert: {
          confirmation_email_last_attempt_at?: string | null
          confirmation_email_sent_at?: string | null
          confirmation_email_status?: string
          created_at?: string
          interview_opt_in?: boolean
          payload_hash: string
          submission_id: string
          trip_created: boolean
          trip_id: string
          waitlist_user_id: string
        }
        Update: {
          confirmation_email_last_attempt_at?: string | null
          confirmation_email_sent_at?: string | null
          confirmation_email_status?: string
          created_at?: string
          interview_opt_in?: boolean
          payload_hash?: string
          submission_id?: string
          trip_created?: boolean
          trip_id?: string
          waitlist_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "validation_submissions_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "validation_submissions_waitlist_user_id_fkey"
            columns: ["waitlist_user_id"]
            isOneToOne: false
            referencedRelation: "waitlist_users"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist_users: {
        Row: {
          age_band: string
          created_at: string
          email: string
          email_normalized: string
          gender: string
          gender_self_describe: string | null
          home_country: string
          id: string
          interested_in: string
          is_18_plus: boolean
          marketing_consent: boolean
          travel_frequency: string | null
          updated_at: string
          used_dating_apps_traveling: boolean | null
        }
        Insert: {
          age_band: string
          created_at?: string
          email: string
          email_normalized: string
          gender: string
          gender_self_describe?: string | null
          home_country: string
          id?: string
          interested_in: string
          is_18_plus?: boolean
          marketing_consent?: boolean
          travel_frequency?: string | null
          updated_at?: string
          used_dating_apps_traveling?: boolean | null
        }
        Update: {
          age_band?: string
          created_at?: string
          email?: string
          email_normalized?: string
          gender?: string
          gender_self_describe?: string | null
          home_country?: string
          id?: string
          interested_in?: string
          is_18_plus?: boolean
          marketing_consent?: boolean
          travel_frequency?: string | null
          updated_at?: string
          used_dating_apps_traveling?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      submit_early_access: {
        Args: {
          p_age_band: string
          p_arrival_date: string
          p_custom_interest: string
          p_departure_date: string
          p_destination_country: string
          p_destination_country_code: string
          p_destination_id: string
          p_destination_name: string
          p_email: string
          p_gender: string
          p_gender_self_describe: string
          p_home_country: string
          p_interested_in: string
          p_interview_opt_in: boolean
          p_is_18_plus: boolean
          p_market_slug: string
          p_marketing_consent: boolean
          p_meet_preference: string
          p_payload_hash: string
          p_relationship_intentions: string[]
          p_submission_id: string
          p_travel_frequency: string
          p_travel_interests: string[]
          p_travel_mode: string
          p_used_dating_apps_traveling: boolean
        }
        Returns: Json
      }
      update_confirmation_email_status: {
        Args: { p_status: string; p_submission_id: string }
        Returns: undefined
      }
      update_interview_status: {
        Args: { p_opt_in_id: string; p_status: string }
        Returns: undefined
      }
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
