import { BarChart3, Users, Clock, Video } from 'lucide-react';
import type { DashboardStats as StatsType } from '@/types';

interface DashboardStatsProps {
  stats: StatsType;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    if (hours > 0) {
      return `${hours}h`;
    }
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  };

  const statCards = [
    {
      label: 'Total Streams',
      value: stats.totalStreams,
      icon: Video,
      color: 'text-primary-400',
      bgColor: 'bg-primary-600/10'
    },
    {
      label: 'Live Now',
      value: stats.liveStreams,
      icon: BarChart3,
      color: 'text-red-400',
      bgColor: 'bg-red-600/10'
    },
    {
      label: 'Total Viewers',
      value: stats.totalViewers,
      icon: Users,
      color: 'text-green-400',
      bgColor: 'bg-green-600/10'
    },
    {
      label: 'Total Duration',
      value: formatDuration(stats.totalDuration),
      icon: Clock,
      color: 'text-blue-400',
      bgColor: 'bg-blue-600/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}