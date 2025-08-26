import Link from 'next/link';
import { Calendar, Eye, Clock } from 'lucide-react';
import type { StreamCardProps } from '@/types';

export default function StreamCard({ stream }: StreamCardProps) {
  const isLive = stream.metadata.status === 'active';
  const viewerCount = stream.metadata.viewer_count || 0;
  const duration = stream.metadata.duration || 0;
  
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Link href={`/stream/${stream.slug}`} className="card-hover block overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-primary-600/20 to-primary-800/20">
        {stream.metadata.thumbnail_url ? (
          <img 
            src={`${stream.metadata.thumbnail_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={stream.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-4xl opacity-50">📺</div>
          </div>
        )}
        
        {/* Live indicator */}
        {isLive && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
        )}
        
        {/* Status badge */}
        <div className={`absolute top-3 right-3 status-${stream.metadata.status}`}>
          {stream.metadata.status}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{stream.title}</h3>
        
        {stream.metadata.description && (
          <p className="text-dark-400 text-sm mb-4 line-clamp-2">
            {stream.metadata.description}
          </p>
        )}

        {/* Stream info */}
        <div className="flex items-center justify-between text-sm text-dark-400">
          <div className="flex items-center gap-4">
            {isLive ? (
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{viewerCount}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(stream.created_at)}</span>
              </div>
            )}
            
            {duration > 0 && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(duration)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {stream.metadata.tags && stream.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {stream.metadata.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-dark-700 text-xs rounded text-dark-300"
              >
                {tag}
              </span>
            ))}
            {stream.metadata.tags.length > 3 && (
              <span className="px-2 py-1 bg-dark-700 text-xs rounded text-dark-300">
                +{stream.metadata.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}