export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
}

export interface StaffProfile {
  id: number;
  user_id: number;
  job_title: string;
  compliance_status: 'compliant' | 'warning' | 'non_compliant';
  skills: string[];
  contract_hours: number;
  user: User;
}

export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  address_line_1: string;
  post_code: string;
  critical_alerts: string[];
}

export interface Visit {
  id: number;
  client_id: number;
  staff_id: number | null;
  scheduled_start: string; // ISO String
  scheduled_end: string;
  status: 'pending' | 'in_progress' | 'completed' | 'missed';
  client?: Client;
  staff?: StaffProfile;
}

export interface DashboardStats {
  active_visits: number;
  staff_online: number;
  compliance_score: number;
  recent_alerts: string[];
}