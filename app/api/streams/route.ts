import { NextRequest, NextResponse } from 'next/server';
import { createStream } from '@/lib/cosmic';
import { createMuxLiveStream } from '@/lib/mux';
import type { CreateStreamForm, ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: CreateStreamForm = await request.json();
    
    if (!body.title?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title is required' } as ApiResponse,
        { status: 400 }
      );
    }

    // Create Mux live stream
    const muxStream = await createMuxLiveStream();
    
    // Create stream in Cosmic with Mux data
    const stream = await createStream({
      title: body.title.trim(),
      metadata: {
        description: body.description || '',
        category: body.category || '',
        visibility: body.visibility || 'public',
        tags: body.tags || [],
        status: 'idle',
        mux_stream_key: muxStream.stream_key,
        mux_playback_id: muxStream.playback_ids[0]?.id,
        viewer_count: 0,
        max_viewers: 0,
        duration: 0
      }
    });

    return NextResponse.json({
      success: true,
      data: stream,
      message: 'Stream created successfully'
    } as ApiResponse);

  } catch (error) {
    console.error('Error creating stream:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create stream' 
      } as ApiResponse,
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { getStreams } = await import('@/lib/cosmic');
    const streams = await getStreams();
    
    return NextResponse.json({
      success: true,
      data: streams
    } as ApiResponse);

  } catch (error) {
    console.error('Error fetching streams:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch streams' 
      } as ApiResponse,
      { status: 500 }
    );
  }
}