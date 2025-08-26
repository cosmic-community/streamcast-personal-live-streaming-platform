// app/stream/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getStreamBySlug } from '@/lib/cosmic';
import Navigation from '@/components/Navigation';
import StreamPlayer from '@/components/StreamPlayer';
import StreamInfo from '@/components/StreamInfo';
import StreamChat from '@/components/StreamChat';

interface StreamPageProps {
  params: Promise<{ slug: string }>;
}

export default async function StreamPage({ params }: StreamPageProps) {
  const { slug } = await params;
  const stream = await getStreamBySlug(slug);

  if (!stream) {
    notFound();
  }

  const isLive = stream.metadata.status === 'active';

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {stream.metadata.mux_playback_id ? (
                <StreamPlayer 
                  playbackId={stream.metadata.mux_playback_id}
                  isLive={isLive}
                  title={stream.title}
                />
              ) : (
                <div className="player-container flex items-center justify-center bg-dark-800">
                  <div className="text-center">
                    <h3 className="text-xl mb-2">Stream Not Available</h3>
                    <p className="text-dark-400">This stream is not currently configured.</p>
                  </div>
                </div>
              )}
              
              <StreamInfo stream={stream} />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            {isLive && (
              <StreamChat streamId={stream.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: StreamPageProps) {
  const { slug } = await params;
  const stream = await getStreamBySlug(slug);
  
  if (!stream) {
    return {
      title: 'Stream Not Found',
    };
  }
  
  return {
    title: `${stream.title} - StreamCast`,
    description: stream.metadata.description || 'Watch live stream on StreamCast',
  };
}