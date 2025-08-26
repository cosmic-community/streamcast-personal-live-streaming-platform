import type { Stream } from '@/types';
import StreamCard from '@/components/StreamCard';

interface StreamGridProps {
  streams: Stream[];
}

export default function StreamGrid({ streams }: StreamGridProps) {
  if (!streams || streams.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📺</div>
        <h3 className="text-xl font-semibold mb-2">No streams yet</h3>
        <p className="text-dark-400 mb-6">Create your first stream to get started</p>
        <a href="/dashboard/streams/new" className="btn-primary">
          Create Stream
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {streams.map((stream) => (
        <StreamCard key={stream.id} stream={stream} />
      ))}
    </div>
  );
}