'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  MapPin,
  Eye,
  Users,
  Zap,
  RefreshCw,
  Globe,
  Activity,
  TrendingUp,
  Radio,
  Wifi,
  Signal,
  Clock,
} from 'lucide-react';

interface LocationData {
  id: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  viewers: number;
  status: 'live' | 'active' | 'idle';
}

const LIVE_LOCATIONS: LocationData[] = [
  { id: '1', country: 'USA', city: 'Los Angeles', lat: 34.05, lng: -118.24, viewers: 12500, status: 'live' },
  { id: '2', country: 'USA', city: 'New York', lat: 40.71, lng: -74.01, viewers: 8900, status: 'live' },
  { id: '3', country: 'UK', city: 'London', lat: 51.51, lng: -0.13, viewers: 6700, status: 'active' },
  { id: '4', country: 'DE', city: 'Berlin', lat: 52.52, lng: 13.41, viewers: 4500, status: 'active' },
  { id: '5', country: 'JP', city: 'Tokyo', lat: 35.68, lng: 139.69, viewers: 11200, status: 'live' },
  { id: '6', country: 'KR', city: 'Seoul', lat: 37.57, lng: 126.98, viewers: 7800, status: 'live' },
  { id: '7', country: 'BR', city: 'São Paulo', lat: -23.55, lng: -46.63, viewers: 5600, status: 'active' },
  { id: '8', country: 'EG', city: 'Cairo', lat: 30.04, lng: 31.24, viewers: 9200, status: 'live' },
  { id: '9', country: 'SA', city: 'Riyadh', lat: 24.71, lng: 46.67, viewers: 4300, status: 'active' },
  { id: '10', country: 'IN', city: 'Mumbai', lat: 19.08, lng: 72.88, viewers: 7100, status: 'live' },
];

const PLATFORM_STATS = [
  { name: 'TikTok Live', viewers: '45.2K', growth: '+12%', color: 'pink' },
  { name: 'YouTube Live', viewers: '28.7K', growth: '+8%', color: 'red' },
  { name: 'Instagram Live', viewers: '15.3K', growth: '+5%', color: 'purple' },
];

export default function LiveCenterPage() {
  const [totalViewers, setTotalViewers] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const [viewers, setViewers] = useState(LIVE_LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalViewers(prev => prev + Math.floor(Math.random() * 100 - 20));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const baseViewers = LIVE_LOCATIONS.reduce((acc, loc) => acc + loc.viewers, 0);
    setTotalViewers(baseViewers);
  }, []);

  const handleRefresh = () => {
    setViewers(prev =>
      prev.map(loc => ({
        ...loc,
        viewers: loc.viewers + Math.floor(Math.random() * 500 - 200),
      }))
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              'text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-widest flex items-center gap-1',
              isLive
                ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 text-emerald-400'
                : 'bg-gray-800/50 border border-gray-700/50 text-gray-500'
            )}>
              <Radio className={cn('h-3 w-3', isLive && 'animate-pulse')} />
              {isLive ? 'مباشر الآن' : 'غير نشط'}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
            مركز التحكم الحي 🗺️
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            مراقبة الجمهور والمشاهدات المباشرة حول العالم
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card border border-emerald-500/20 text-emerald-400 hover:border-emerald-400/50 text-sm font-medium transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            تحديث
          </motion.button>
        </div>
      </motion.div>

      {/* Main Counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden glass-card border border-gradient-to-r from-emerald-500/30 to-cyan-500/30 p-8"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5" />
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <Wifi className="h-3 w-3 text-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">اتصال نشط</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">إجمالي المشاهدات المباشرة</p>
            <motion.p
              key={totalViewers}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-6xl md:text-7xl font-black bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent"
            >
              {totalViewers.toLocaleString()}
            </motion.p>
            <p className="text-sm text-gray-400 mt-2">مشاهد حول العالم</p>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6">
            {PLATFORM_STATS.map((platform) => (
              <div key={platform.name} className="text-center">
                <p className="text-lg font-bold text-white">{platform.viewers}</p>
                <p className="text-[10px] text-gray-500">{platform.name}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* World Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card border border-blue-500/15 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-400" />
            الخريطة العالمية
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              مباشر
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              نشط
            </span>
          </div>
        </div>

        {/* SVG World Map */}
        <div className="relative aspect-[16/9] bg-gray-900/50 rounded-xl overflow-hidden">
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full opacity-30"
            style={{ filter: 'brightness(0.5)' }}
          >
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a5f" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <rect width="1000" height="500" fill="url(#mapGradient)" />
            {/* Simplified continents - just shapes for visualization */}
            <path
              d="M150,120 Q200,100 250,120 T350,150 Q400,180 380,220 T320,280 Q280,320 220,300 T150,250 Q100,200 150,120"
              fill="#1e3a5f"
              opacity="0.6"
            />
            <path
              d="M450,80 Q500,60 550,80 T650,120 Q700,150 680,200 T620,250 Q580,280 520,260 T450,200 Q400,150 450,80"
              fill="#1e3a5f"
              opacity="0.6"
            />
            <path
              d="M700,100 Q750,80 800,100 T880,150 Q920,180 900,220 T840,260 Q800,280 750,260 T700,200 Q650,150 700,100"
              fill="#1e3a5f"
              opacity="0.6"
            />
            <path
              d="M200,300 Q250,280 300,300 T380,350 Q420,380 400,420 T340,450 Q300,460 250,440 T200,400 Q150,360 200,300"
              fill="#1e3a5f"
              opacity="0.6"
            />
            <path
              d="M550,300 Q600,280 650,300 T720,350 Q760,380 740,420 T680,450 Q640,460 600,440 T550,400 Q500,360 550,300"
              fill="#1e3a5f"
              opacity="0.6"
            />
          </svg>

          {/* Pulsing Location Dots */}
          {viewers.map((loc, i) => {
            const x = ((loc.lng + 180) / 360) * 100;
            const y = ((90 - loc.lat) / 180) * 100;
            const isSelected = selectedLocation?.id === loc.id;

            return (
              <motion.div
                key={loc.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={cn(
                  'absolute cursor-pointer',
                  isSelected ? 'z-20' : 'z-10'
                )}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => setSelectedLocation(isSelected ? null : loc)}
              >
                {/* Outer pulse ring */}
                <motion.div
                  animate={{
                    scale: [1, 2, 2.5],
                    opacity: [0.8, 0.4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className={cn(
                    'absolute -inset-4 rounded-full',
                    loc.status === 'live'
                      ? 'bg-emerald-400'
                      : loc.status === 'active'
                      ? 'bg-cyan-400'
                      : 'bg-gray-500'
                  )}
                />
                {/* Inner dot */}
                <div
                  className={cn(
                    'relative h-3 w-3 rounded-full',
                    isSelected ? 'h-4 w-4' : '',
                    loc.status === 'live'
                      ? 'bg-emerald-400 shadow-lg shadow-emerald-400/60'
                      : loc.status === 'active'
                      ? 'bg-cyan-400 shadow-lg shadow-cyan-400/60'
                      : 'bg-gray-500'
                  )}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-gray-900/90 border border-gray-700 text-[10px] text-white whitespace-nowrap"
                    >
                      {loc.city} - {loc.viewers.toLocaleString()} viewer
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Live Locations List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card border border-blue-500/15 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-blue-400" />
          <h3 className="font-bold text-white">المواقع النشطة</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {viewers
            .sort((a, b) => b.viewers - a.viewers)
            .map((loc, i) => (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                onClick={() => setSelectedLocation(selectedLocation?.id === loc.id ? null : loc)}
                className={cn(
                  'p-3 rounded-xl border cursor-pointer transition-all',
                  selectedLocation?.id === loc.id
                    ? 'bg-emerald-500/10 border-emerald-500/40'
                    : 'bg-gray-800/30 border-transparent hover:bg-gray-800/50 hover:border-gray-700/50'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{loc.country === 'USA' ? '🇺🇸' : loc.country === 'UK' ? '🇬🇧' : loc.country === 'DE' ? '🇩🇪' : loc.country === 'JP' ? '🇯🇵' : loc.country === 'KR' ? '🇰🇷' : loc.country === 'BR' ? '🇧🇷' : loc.country === 'EG' ? '🇪🇬' : loc.country === 'SA' ? '🇸🇦' : loc.country === 'IN' ? '🇮🇳' : '🌍'}</span>
                    <span className="font-semibold text-white text-sm">{loc.city}</span>
                  </div>
                  <span className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1',
                    loc.status === 'live'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : loc.status === 'active'
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-gray-700 text-gray-500'
                  )}>
                    <Signal className="h-2.5 w-2.5" />
                    {loc.status === 'live' ? 'مباشر' : loc.status === 'active' ? 'نشط' : 'خامل'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{loc.country}</span>
                  <span className="text-sm font-bold text-emerald-400">{loc.viewers.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Real-time Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { label: 'متوسط وقت المشاهدة', value: '4:32', icon: Clock, color: 'blue' },
          { label: 'معدل الاحتفاظ', value: '78%', icon: TrendingUp, color: 'emerald' },
          { label: 'الذروة اليوم', value: '67.5K', icon: Activity, color: 'violet' },
        ].map((stat, i) => (
          <div key={stat.label} className="glass-card border border-blue-500/15 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{stat.label}</span>
              <stat.icon className={cn('h-4 w-4', `text-${stat.color}-400`)} />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}