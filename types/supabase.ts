export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Event: {
        Row: {
          created_by: string
          date: string
          description: string
          duration_hours: number | null
          id: number
          location: string
          modified_at: string
          price: number | null
          published: boolean
          title: string
        }
        Insert: {
          created_by: string
          date: string
          description: string
          duration_hours?: number | null
          id?: number
          location: string
          modified_at?: string
          price?: number | null
          published?: boolean
          title: string
        }
        Update: {
          created_by?: string
          date?: string
          description?: string
          duration_hours?: number | null
          id?: number
          location?: string
          modified_at?: string
          price?: number | null
          published?: boolean
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Event_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Participant: {
        Row: {
          did_attend: boolean
          id: number
          registered_at: string
          registration_type: number
          user_id: string
        }
        Insert: {
          did_attend?: boolean
          id?: number
          registered_at?: string
          registration_type: number
          user_id: string
        }
        Update: {
          did_attend?: boolean
          id?: number
          registered_at?: string
          registration_type?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Participant_registration_type_fkey"
            columns: ["registration_type"]
            isOneToOne: false
            referencedRelation: "Registration_Type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Participant_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Registration_Type: {
        Row: {
          created_by_user_id: string | null
          description: string | null
          event_id: number
          id: number
          max_registrations: number
          name: string
        }
        Insert: {
          created_by_user_id?: string | null
          description?: string | null
          event_id: number
          id?: number
          max_registrations: number
          name: string
        }
        Update: {
          created_by_user_id?: string | null
          description?: string | null
          event_id?: number
          id?: number
          max_registrations?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "Registration_Type_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Registration_Type_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "Event"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      event_registrations: {
        Row: {
          email: string | null
          event_id: number | null
          event_title: string | null
          participant_id: number | null
          registration_type_id: number | null
          rego_type_name: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Participant_registration_type_fkey"
            columns: ["registration_type_id"]
            isOneToOne: false
            referencedRelation: "Registration_Type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Participant_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Registration_Type_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "Event"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
