'use client';

import { useEffect, useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import type { StreamPlayerProps } from '@/types';

export default function StreamPlayer({ 
  playbackId, 
  isLive, 
  title,
  onViewerCountUpdate 
}: StreamPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate viewer count updates for live streams
    if (isLive && onViewerCountUpdate) {
      const interval = setInterval(() => {
        const randomViewers = Math.floor(Math.random() * 100) + 1;
        onViewerCountUpdate(randomViewers);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isLive, onViewerCountUpdate]);

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError('Failed to load stream');
  };

  return (
    <div className="player-container">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-800">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4" />
            <p className="text-dark-400">Loading stream...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-800">
          <div className="text-center">
            <div className="text-red-400 mb-4">⚠️</div>
            <p className="text-red-400">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary mt-4"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <MuxPlayer
        streamType={isLive ? "live" : "on-demand"}
        playbackId={playbackId}
        metadata={{
          video_title: title || "Live Stream"
        }}
        primaryColor="#8b4cf7"
        secondaryColor="#6b7280"
        onLoadStart={handleLoadStart}
        onLoadedData={handleLoadedData}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
        }}
      />

      {isLive && (
        <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full flex items-center gap-2 animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          LIVE
        </div>
      )}
    </div>
  );
}