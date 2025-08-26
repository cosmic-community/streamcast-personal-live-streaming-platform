import type { Stream } from '@/types';
import StreamCard from './StreamCard';

interface LiveStreamsProps {
  streams: Stream[];
}

export default function LiveStreams({ streams }: LiveStreamsProps) {
  if (streams.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-dark-400">No live streams at the moment</p>
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