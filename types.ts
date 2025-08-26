// Cosmic object interfaces
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Stream object type
interface Stream extends CosmicObject {
  type: 'streams';
  metadata: {
    description?: string;
    mux_stream_key?: string;
    mux_playback_id?: string;
    mux_asset_id?: string;
    status: StreamStatus;
    scheduled_start?: string;
    actual_start?: string;
    actual_end?: string;
    viewer_count?: number;
    max_viewers?: number;
    duration?: number;
    thumbnail_url?: string;
    tags?: string[];
    category?: string;
    visibility: StreamVisibility;
  };
}

// Type literals for stream properties
type StreamStatus = 'idle' | 'active' | 'disconnected' | 'ready' | 'ended';
type StreamVisibility = 'public' | 'unlisted' | 'private';

// Mux API interfaces
interface MuxLiveStream {
  id: string;
  stream_key: string;
  status: string;
  playback_ids: MuxPlaybackId[];
  created_at: string;
  recent_asset_ids?: string[];
}

interface MuxPlaybackId {
  id: string;
  policy: 'public' | 'signed';
}

interface MuxAsset {
  id: string;
  status: string;
  duration?: number;
  max_resolution?: string;
  playback_ids?: MuxPlaybackId[];
}

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Component prop interfaces
interface StreamCardProps {
  stream: Stream;
  onStatusChange?: (streamId: string, status: StreamStatus) => void;
}

interface StreamPlayerProps {
  playbackId: string;
  isLive: boolean;
  title?: string;
  onViewerCountUpdate?: (count: number) => void;
}

interface DashboardStats {
  totalStreams: number;
  liveStreams: number;
  totalViewers: number;
  totalDuration: number;
}

// Form interfaces
interface CreateStreamForm {
  title: string;
  description: string;
  category: string;
  visibility: StreamVisibility;
  tags: string[];
  scheduled_start?: string;
}

// Webhook payload interfaces
interface MuxWebhookEvent {
  type: string;
  object: {
    type: string;
    id: string;
  };
  id: string;
  environment: {
    name: string;
    id: string;
  };
  data: Record<string, any>;
  created_at: string;
}

// Utility types
type OptionalMetadata<T extends CosmicObject> = Partial<T['metadata']>;
type CreateStreamData = Omit<Stream, 'id' | 'created_at' | 'modified_at'>;

// Type guards
function isStream(obj: CosmicObject): obj is Stream {
  return obj.type === 'streams';
}

function isMuxWebhookEvent(data: any): data is MuxWebhookEvent {
  return data && typeof data === 'object' && 'type' in data && 'object' in data;
}

export type {
  CosmicObject,
  Stream,
  StreamStatus,
  StreamVisibility,
  MuxLiveStream,
  MuxPlaybackId,
  MuxAsset,
  CosmicResponse,
  ApiResponse,
  StreamCardProps,
  StreamPlayerProps,
  DashboardStats,
  CreateStreamForm,
  MuxWebhookEvent,
  OptionalMetadata,
  CreateStreamData
};

export { isStream, isMuxWebhookEvent };