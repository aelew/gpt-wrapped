export interface Chat {
  title: string;
  create_time: number;
  update_time: number;
  mapping: { [key: string]: MappingEntry };
  moderation_results: any[];
  current_node: string;
  conversation_id: string;
  is_archived: boolean;
  safe_urls: any[];
  is_public: boolean;
  linear_conversation: LinearConversationEntry[];
  has_user_editable_context: boolean;
  continue_conversation_url: string;
  model: ModelInfo;
  moderation_state: ModerationState;
}

interface MappingEntry {
  id: string;
  message: Message;
  parent: string;
  children: string[];
}

interface Message {
  id: string;
  author: Author;
  create_time: number;
  content: Content;
  status: string;
  end_turn?: boolean;
  weight: number;
  metadata: MessageMetadata;
  recipient: string;
}

interface Author {
  role: string;
  metadata: any;
}

interface Content {
  content_type: string;
  parts: string[];
}

interface MessageMetadata {
  finish_details?: FinishDetails;
  citations?: any[];
  is_complete?: boolean;
  model_slug?: string;
  default_model_slug?: string;
  pad?: string;
  parent_id?: string;
  request_id?: string;
  timestamp_?: string;
  shared_conversation_id?: string;
  is_visually_hidden_from_conversation?: boolean;
}

interface FinishDetails {
  type: string;
  stop_tokens?: number[];
}

interface LinearConversationEntry {
  id: string;
  children?: string[];
  message?: Message;
  parent?: string;
}

interface ModelInfo {
  slug: string;
  max_tokens: number;
  title: string;
  description: string;
  tags: string[];
}

interface ModerationState {
  has_been_moderated: boolean;
  has_been_blocked: boolean;
  has_been_accepted: boolean;
  has_been_auto_blocked: boolean;
  has_been_auto_moderated: boolean;
}
