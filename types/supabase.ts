export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			Event: {
				Row: {
					created_by: string;
					date: string;
					description: string;
					duration_hours: number | null;
					id: number;
					location: string;
					modified_at: string;
					price: number | null;
					published: boolean;
					title: string;
				};
				Insert: {
					created_by: string;
					date: string;
					description: string;
					duration_hours?: number | null;
					id?: number;
					location: string;
					modified_at?: string;
					price?: number | null;
					published?: boolean;
					title: string;
				};
				Update: {
					created_by?: string;
					date?: string;
					description?: string;
					duration_hours?: number | null;
					id?: number;
					location?: string;
					modified_at?: string;
					price?: number | null;
					published?: boolean;
					title?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'Event_created_by_fkey';
						columns: ['created_by'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			Participant: {
				Row: {
					did_attend: boolean;
					id: number;
					registered_at: string;
					registration_type: number;
					user_id: string;
				};
				Insert: {
					did_attend?: boolean;
					id?: number;
					registered_at?: string;
					registration_type: number;
					user_id: string;
				};
				Update: {
					did_attend?: boolean;
					id?: number;
					registered_at?: string;
					registration_type?: number;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'Participant_registration_type_fkey';
						columns: ['registration_type'];
						isOneToOne: false;
						referencedRelation: 'Registration_Type';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'Participant_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			Registration_Type: {
				Row: {
					event_id: number;
					id: number;
					max_registrations: number;
					name: string;
				};
				Insert: {
					event_id: number;
					id?: number;
					max_registrations: number;
					name: string;
				};
				Update: {
					event_id?: number;
					id?: number;
					max_registrations?: number;
					name?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'Registration_Type_event_id_fkey';
						columns: ['event_id'];
						isOneToOne: false;
						referencedRelation: 'Event';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
