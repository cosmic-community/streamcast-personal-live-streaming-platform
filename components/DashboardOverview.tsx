import type { Stream, DashboardStats } from '@/types';

interface DashboardOverviewProps {
  streams: Stream[];
}

export default function DashboardOverview({ streams }: DashboardOverviewProps) {
  const liveStreams = streams.filter(stream => stream.metadata.status === 'active');
  const totalViewers = liveStreams.reduce((acc, stream) => acc + (stream.metadata.viewer_count || 0), 0);
  const totalDuration = streams.reduce((acc, stream) => acc + (stream.metadata.duration || 0), 0);

  const stats: DashboardStats = {
    totalStreams: streams.length,
    liveStreams: liveStreams.length,
    totalViewers,
    totalDuration
  };

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold mb-4">Overview</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-dark-400">Total Streams</span>
          <span className="font-semibold">{stats.totalStreams}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-dark-400">Live Now</span>
          <span className="font-semibold text-primary-400">{stats.liveStreams}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-dark-400">Total Viewers</span>
          <span className="font-semibold">{stats.totalViewers}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-dark-400">Total Hours</span>
          <span className="font-semibold">{Math.round(stats.totalDuration / 3600)} hrs</span>
        </div>
      </div>
    </div>
  );
}