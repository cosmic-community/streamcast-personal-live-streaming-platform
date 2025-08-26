import { Play, Users, Zap } from 'lucide-react';

interface HeroProps {
  liveStreamCount: number;
}

export default function Hero({ liveStreamCount }: HeroProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-primary-800/20" />
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-2xl">
              <Play className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
            Stream<span className="gradient-text">Cast</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-dark-300 mb-12 leading-relaxed">
            Professional live streaming platform powered by Mux infrastructure
            <br />
            Create, manage, and broadcast with enterprise-grade video delivery
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a href="/dashboard/streams/new" className="btn-primary inline-flex items-center gap-2">
              <Play className="w-5 h-5" />
              Start Streaming
            </a>
            <a href="/dashboard" className="btn-secondary inline-flex items-center gap-2">
              <Users className="w-5 h-5" />
              View Dashboard
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Low Latency</h3>
              <p className="text-dark-400">Ultra-fast streaming with Mux's global CDN</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-dark-400">Monitor viewer metrics and performance</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Now</h3>
              <p className="text-dark-400">
                {liveStreamCount > 0 
                  ? `${liveStreamCount} stream${liveStreamCount !== 1 ? 's' : ''} live`
                  : 'No active streams'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}