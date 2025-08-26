import { getStreams } from '@/lib/cosmic';
import Navigation from '@/components/Navigation';
import DashboardOverview from '@/components/DashboardOverview';
import StreamManagement from '@/components/StreamManagement';

export default async function DashboardPage() {
  const streams = await getStreams();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
          <a href="/dashboard/streams/new" className="btn-primary">
            Create New Stream
          </a>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StreamManagement streams={streams} />
          </div>
          <div>
            <DashboardOverview streams={streams} />
          </div>
        </div>
      </div>
    </div>
  );
}