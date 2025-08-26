import { Suspense } from 'react';
import { getStreams, getLiveStreams } from '@/lib/cosmic';
import Hero from '@/components/Hero';
import StreamGrid from '@/components/StreamGrid';
import LiveStreams from '@/components/LiveStreams';
import DashboardStats from '@/components/DashboardStats';
import Navigation from '@/components/Navigation';

export default async function HomePage() {
  const [allStreams, liveStreams] = await Promise.all([
    getStreams(),
    getLiveStreams()
  ]);

  const stats = {
    totalStreams: allStreams.length,
    liveStreams: liveStreams.length,
    totalViewers: liveStreams.reduce((acc, stream) => acc + (stream.metadata.viewer_count || 0), 0),
    totalDuration: allStreams.reduce((acc, stream) => acc + (stream.metadata.duration || 0), 0)
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        <Hero liveStreamCount={liveStreams.length} />
        
        <div className="container mx-auto px-6 py-12">
          <Suspense fallback={<div className="text-center">Loading stats...</div>}>
            <DashboardStats stats={stats} />
          </Suspense>
          
          {liveStreams.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 gradient-text">🔴 Live Now</h2>
              <Suspense fallback={<div className="text-center">Loading live streams...</div>}>
                <LiveStreams streams={liveStreams} />
              </Suspense>
            </section>
          )}
          
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">All Streams</h2>
              <a 
                href="/dashboard/streams/new" 
                className="btn-primary"
              >
                Create Stream
              </a>
            </div>
            <Suspense fallback={<div className="text-center">Loading streams...</div>}>
              <StreamGrid streams={allStreams} />
            </Suspense>
          </section>
        </div>
      </main>
    </div>
  );
}