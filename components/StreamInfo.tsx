import type { Stream } from '@/types';

interface StreamInfoProps {
  stream: Stream;
}

export default function StreamInfo({ stream }: StreamInfoProps) {
  const isLive = stream.metadata.status === 'active';
  const viewerCount = stream.metadata.viewer_count || 0;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{stream.title}</h1>
        <div className="flex items-center space-x-2">
          {isLive && (
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-red-500 font-medium">LIVE</span>
            </span>
          )}
          <span className="text-dark-400">{viewerCount} viewers</span>
        </div>
      </div>
      
      {stream.metadata.description && (
        <div className="mb-4">
          <p className="text-dark-300">{stream.metadata.description}</p>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-4">
        {stream.metadata.tags?.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-dark-700 rounded text-sm">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="text-sm text-dark-400">
        <p>Category: {stream.metadata.category || 'General'}</p>
        <p>Created: {new Date(stream.created_at).toLocaleDateString()}</p>
        {stream.metadata.actual_start && (
          <p>Started: {new Date(stream.metadata.actual_start).toLocaleString()}</p>
        )}
      </div>
    </div>
  );
}