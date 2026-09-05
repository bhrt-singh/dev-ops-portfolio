import { useEffect, useRef, useState, useCallback } from 'react';

const LERP_TAU = 8;
const SNAP = 0.002;

export interface UseVideoScrubOptions {
  videoUrl: string;
  scrollProgress: number; // 0 to 1
}

export interface UseVideoScrubResult {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isLoaded: boolean;
  contrast: 'light' | 'dark';
  currentTime: number;
  duration: number;
}

export function useVideoScrub({ videoUrl, scrollProgress }: UseVideoScrubOptions): UseVideoScrubResult {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [contrast, setContrast] = useState<'light' | 'dark'>('dark');
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const targetProgressRef = useRef(scrollProgress);
  const currentTimeRef = useRef(0);
  const durationRef = useRef(0);
  const lastTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number | null>(null);

  // Sync scrollProgress to ref
  useEffect(() => {
    targetProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  // Video initialization
  useEffect(() => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.crossOrigin = 'anonymous';

    const handleLoadedMetadata = () => {
      durationRef.current = video.duration || 1;
      setDuration(video.duration || 1);
      setIsLoaded(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoRef.current = video;
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.pause();
      video.src = '';
    };
  }, [videoUrl]);

  // Sample brightness from canvas to determine contrast mode (dark vs light text)
  const sampleBrightness = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    try {
      // Sample top area where navigation and header text reside
      const sampleWidth = Math.min(canvas.width, 200);
      const sampleHeight = Math.min(canvas.height, 120);
      if (sampleWidth <= 0 || sampleHeight <= 0) return;

      const imageData = ctx.getImageData(0, 0, sampleWidth, sampleHeight);
      const data = imageData.data;
      let totalLuminance = 0;
      const step = 4 * 10; // sample every 10th pixel for performance

      let count = 0;
      for (let i = 0; i < data.length; i += step) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // Standard perceived brightness formula
        const luminance = (r * 299 + g * 587 + b * 114) / 1000;
        totalLuminance += luminance;
        count++;
      }

      const avgLuminance = count > 0 ? totalLuminance / count : 0;
      // If average brightness is high (> 130), background is light -> dark navy text required
      setContrast(avgLuminance > 130 ? 'light' : 'dark');
    } catch {
      // Fallback if cross-origin or canvas error
      setContrast('dark');
    }
  }, []);

  // Scrubbing & rendering animation loop
  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderLoop = (now: number) => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && durationRef.current > 0) {
        const dt = Math.max(0.001, (now - lastTimeRef.current) / 1000);
        lastTimeRef.current = now;

        const targetTime = targetProgressRef.current * durationRef.current;

        if (prefersReducedMotion) {
          currentTimeRef.current = targetTime;
        } else {
          // Lerp current time toward target time
          const diff = targetTime - currentTimeRef.current;
          if (Math.abs(diff) < SNAP) {
            currentTimeRef.current = targetTime;
          } else {
            currentTimeRef.current += diff * Math.min(1, dt * LERP_TAU);
          }
        }

        // Clamp to video duration
        currentTimeRef.current = Math.max(0, Math.min(durationRef.current, currentTimeRef.current));
        setCurrentTime(currentTimeRef.current);

        // Update video currentTime if ready
        if (video.readyState >= 2 && Math.abs(video.currentTime - currentTimeRef.current) > 0.02) {
          video.currentTime = currentTimeRef.current;
        }

        // Draw video frame to canvas
        if (canvas && video.readyState >= 2) {
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (ctx) {
            if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
            }

            // Cover fit calculation
            const vWidth = video.videoWidth || 1920;
            const vHeight = video.videoHeight || 1080;
            const cWidth = canvas.width;
            const cHeight = canvas.height;

            const scale = Math.max(cWidth / vWidth, cHeight / vHeight);
            const x = (cWidth - vWidth * scale) / 2;
            const y = (cHeight - vHeight * scale) / 2;

            ctx.clearRect(0, 0, cWidth, cHeight);
            ctx.drawImage(video, x, y, vWidth * scale, vHeight * scale);

            sampleBrightness(canvas, ctx);
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    lastTimeRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [sampleBrightness]);

  return {
    videoRef,
    canvasRef,
    isLoaded,
    contrast,
    currentTime,
    duration,
  };
}
