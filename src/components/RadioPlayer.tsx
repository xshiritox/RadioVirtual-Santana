import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Disc } from 'lucide-react';

const RadioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // URL de stream de radio de ejemplo (reemplazar con la URL real)
  const streamUrl = "https://stream.zeno.fm/your-stream-url"; // Reemplazar con URL real

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-dark-800/95 backdrop-blur-md border border-gold-400/30 rounded-2xl p-6 shadow-2xl min-w-[320px] animate-float">
        <audio ref={audioRef} src={streamUrl} />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Radio className="w-5 h-5 text-gold-400" />
              {isLive && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <span className="text-gold-400 font-medium">EN VIVO</span>
          </div>
          <div className="flex items-center space-x-1">
            <Disc className={`w-4 h-4 text-silver-400 ${isPlaying ? 'animate-spin' : ''}`} />
            <span className="text-silver-400 text-sm">Radio Santana</span>
          </div>
        </div>

        {/* Now Playing */}
        <div className="mb-4">
          <p className="text-white font-medium text-sm mb-1">Ahora Suena:</p>
          <p className="text-silver-400 text-xs">Música Selecta 24/7</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={togglePlay}
            className="bg-gradient-gold text-dark-900 w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-glow"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <div className="flex items-center space-x-3 flex-1 ml-4">
            <button
              onClick={toggleMute}
              className="text-silver-400 hover:text-gold-400 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-dark-600 rounded-lg appearance-none cursor-pointer slider"
              />
              <style jsx>{`
                .slider::-webkit-slider-thumb {
                  appearance: none;
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #FFD700 0%, #FFC700 100%);
                  cursor: pointer;
                  border: 2px solid #212529;
                  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                }
                .slider::-moz-range-thumb {
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #FFD700 0%, #FFC700 100%);
                  cursor: pointer;
                  border: 2px solid #212529;
                  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                }
              `}</style>
            </div>
          </div>
        </div>

        {/* Visualizer Effect */}
        <div className="mt-4 flex items-center justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-gradient-gold rounded-full ${
                isPlaying ? 'animate-pulse' : ''
              }`}
              style={{
                height: isPlaying ? `${Math.random() * 20 + 10}px` : '4px',
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.5s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadioPlayer;