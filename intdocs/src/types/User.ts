export interface User {
  sub: string
  name: string
  given_name: string
  family_name: string
  email: string
  picture?: any
  roles: string[]
  iss: string
}

export interface APIUser {
  name: string;
  creation: string;
  modified: string;
  modified_by: string;
  owner: string;
  docstatus: number;
  idx: number;
  enabled: number;
  email: string;
  first_name: string;
  middle_name?: any;
  last_name?: any;
  full_name: string;
  username: string;
  language: string;
  time_zone: string;
  send_welcome_email: number;
  unsubscribed: number;
  user_image?: any;
  role_profile_name?: any;
  gender?: any;
  birth_date?: any;
  interest?: any;
  banner_image?: any;
  desk_theme: string;
  phone?: any;
  location?: any;
  bio?: any;
  mute_sounds: number;
  mobile_no?: any;
  new_password: string;
  logout_all_sessions: number;
  reset_password_key: string;
  last_reset_password_key_generated_on: string;
  last_password_reset_date?: any;
  redirect_url?: any;
  document_follow_notify: number;
  document_follow_frequency: string;
  follow_created_documents: number;
  follow_commented_documents: number;
  follow_liked_documents: number;
  follow_assigned_documents: number;
  follow_shared_documents: number;
  email_signature?: any;
  thread_notify: number;
  send_me_a_copy: number;
  allowed_in_mentions: number;
  module_profile?: any;
  home_settings?: any;
  simultaneous_sessions: number;
  restrict_ip?: any;
  last_ip: string;
  login_after: number;
  user_type: string;
  last_active: string;
  login_before: number;
  bypass_restrict_ip_check_if_2fa_enabled: number;
  last_login: string;
  last_known_versions: string;
  api_key?: any;
  api_secret?: any;
  _user_tags?: any;
  _comments?: any;
  _assign?: any;
  _liked_by?: any;
}