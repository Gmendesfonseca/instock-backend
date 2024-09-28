export interface user_config {
  id: string;
  user_id: string;
  auth2f: boolean;
  default_language: 'pt-BR' | 'en-US';
  default_interface: 'LIGHT' | 'DARK';
  schedule_default: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  default_timezone: string;
  share_my_publications: boolean;
}
