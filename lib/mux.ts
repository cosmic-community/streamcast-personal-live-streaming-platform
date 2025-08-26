import Mux from '@mux/mux-node';
import type { MuxLiveStream, MuxAsset, MuxPlaybackId } from '@/types';

// Initialize Mux client
const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

// Create a new live stream
export async function createMuxLiveStream(): Promise<MuxLiveStream> {
  try {
    const stream = await mux.video.liveStreams.create({
      playback_policy: ['public'],
      new_asset_settings: {
        playback_policy: ['public']
      }
    });

    return {
      id: stream.id!,
      stream_key: stream.stream_key!,
      status: stream.status!,
      playback_ids: stream.playback_ids?.map((p: any) => ({
        id: p.id,
        policy: p.policy as 'public' | 'signed'
      })) || [],
      created_at: stream.created_at!,
      recent_asset_ids: stream.recent_asset_ids
    };
  } catch (error) {
    console.error('Failed to create Mux live stream:', error);
    throw new Error('Failed to create live stream');
  }
}

// Get live stream details
export async function getMuxLiveStream(streamId: string): Promise<MuxLiveStream | null> {
  try {
    const stream = await mux.video.liveStreams.retrieve(streamId);
    
    return {
      id: stream.id!,
      stream_key: stream.stream_key!,
      status: stream.status!,
      playback_ids: stream.playback_ids?.map((p: any) => ({
        id: p.id,
        policy: p.policy as 'public' | 'signed'
      })) || [],
      created_at: stream.created_at!,
      recent_asset_ids: stream.recent_asset_ids
    };
  } catch (error) {
    console.error(`Failed to get Mux live stream ${streamId}:`, error);
    return null;
  }
}

// Delete a live stream
export async function deleteMuxLiveStream(streamId: string): Promise<void> {
  try {
    await mux.video.liveStreams.delete(streamId);
  } catch (error) {
    console.error(`Failed to delete Mux live stream ${streamId}:`, error);
    throw new Error('Failed to delete live stream');
  }
}

// Get asset details
export async function getMuxAsset(assetId: string): Promise<MuxAsset | null> {
  try {
    const asset = await mux.video.assets.retrieve(assetId);
    
    return {
      id: asset.id!,
      status: asset.status!,
      duration: asset.duration,
      max_resolution: asset.max_stored_resolution,
      playback_ids: asset.playback_ids?.map((p: any) => ({
        id: p.id,
        policy: p.policy as 'public' | 'signed'
      })) || []
    };
  } catch (error) {
    console.error(`Failed to get Mux asset ${assetId}:`, error);
    return null;
  }
}

// Create a thumbnail for an asset
export async function createAssetThumbnail(assetId: string): Promise<string | null> {
  try {
    const playbackId = `${assetId}.jpg`;
    return `https://image.mux.com/${playbackId}`;
  } catch (error) {
    console.error(`Failed to create thumbnail for asset ${assetId}:`, error);
    return null;
  }
}

// Get live stream metrics
export async function getLiveStreamMetrics(streamId: string) {
  try {
    // Updated to use the correct Mux Data API structure
    const metrics = await mux.data.metrics.breakdown(streamId, {
      timeframe: ['24:hours'],
      metrics: ['video_startup_time', 'video_views', 'concurrent_viewers']
    });
    
    return metrics;
  } catch (error) {
    console.error(`Failed to get metrics for stream ${streamId}:`, error);
    return null;
  }
}

// Validate webhook signature
export function validateMuxWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  try {
    // Updated to use the correct webhook verification method
    return Mux.Webhooks.verifyHeader(payload, signature, secret);
  } catch (error) {
    console.error('Failed to validate webhook signature:', error);
    return false;
  }
}

export { mux };