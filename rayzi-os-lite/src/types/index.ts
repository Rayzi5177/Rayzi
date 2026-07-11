export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  created_at: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  user_id: string;
  pinned: boolean;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  wind: number;
  location: string;
  icon: string;
}

export interface UserSettings {
  theme: 'dark' | 'light';
  notifications: boolean;
  language: string;
}
