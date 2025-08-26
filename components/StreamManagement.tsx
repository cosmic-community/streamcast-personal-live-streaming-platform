import type { Stream } from '@/types';
import StreamCard from './StreamCard';

interface StreamManagementProps {
  streams: Stream[];
}

export default function StreamManagement({ streams }: StreamManagementProps) {
  const liveStreams = streams.filter(stream => stream.metadata.status === 'active');
  const offlineStreams = streams.filter(stream => stream.metadata.status !== 'active');

  return (
    <div className="space-y-8">
      {liveStreams.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Live Streams ({liveStreams.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveStreams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </section>
      )}
      
      <section>
        <h3 className="text-xl font-semibold mb-4">
          All Streams ({streams.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offlineStreams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      </section>
    </div>
  );
}