export interface ConversationData {
  id: string;
  members: string[];
  created_at: string;
  last_message?: { content: string; sent_by: string; sent_at: string };
}

export interface UserData {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  provider: string;
}