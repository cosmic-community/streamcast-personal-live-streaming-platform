import { createBucketClient } from '@cosmicjs/sdk';
import type { Stream, CosmicResponse } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all streams with proper error handling
export async function getStreams(): Promise<Stream[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'streams' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    
    // Sort by created date (newest first)
    return (response.objects as Stream[]).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch streams');
  }
}

// Get a single stream by ID
export async function getStream(id: string): Promise<Stream | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'streams',
      id
    }).depth(1);
    
    return response.object as Stream;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch stream: ${id}`);
  }
}

// Get stream by slug
export async function getStreamBySlug(slug: string): Promise<Stream | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'streams',
      slug
    }).depth(1);
    
    return response.object as Stream;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch stream by slug: ${slug}`);
  }
}

// Create a new stream
export async function createStream(streamData: Partial<Stream>): Promise<Stream> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'streams',
      title: streamData.title || 'Untitled Stream',
      metadata: {
        description: '',
        status: 'idle',
        visibility: 'public',
        viewer_count: 0,
        max_viewers: 0,
        duration: 0,
        tags: [],
        ...streamData.metadata
      }
    });
    
    return response.object as Stream;
  } catch (error) {
    throw new Error('Failed to create stream');
  }
}

// Update stream metadata
export async function updateStream(id: string, updateData: Partial<Stream['metadata']>): Promise<Stream> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata: updateData
    });
    
    return response.object as Stream;
  } catch (error) {
    throw new Error(`Failed to update stream: ${id}`);
  }
}

// Delete a stream
export async function deleteStream(id: string): Promise<void> {
  try {
    await cosmic.objects.deleteOne(id);
  } catch (error) {
    throw new Error(`Failed to delete stream: ${id}`);
  }
}

// Get live streams only
export async function getLiveStreams(): Promise<Stream[]> {
  try {
    const streams = await getStreams();
    return streams.filter(stream => stream.metadata.status === 'active');
  } catch (error) {
    throw new Error('Failed to fetch live streams');
  }
}

// Get streams by category
export async function getStreamsByCategory(category: string): Promise<Stream[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'streams',
        'metadata.category': category 
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as Stream[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error(`Failed to fetch streams by category: ${category}`);
  }
}