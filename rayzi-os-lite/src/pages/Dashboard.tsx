import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudSun, 
  StickyNote, 
  Plus, 
  Thermometer, 
  Wind, 
  Droplets,
  MapPin,
  Calendar
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { GlassCard, Button, LoadingSkeleton } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import { WeatherData } from '../types';

export default function Dashboard() {
  const { user } = useAuth();
  const { notes } = useNotes();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Mock weather data - will be replaced with API
    setTimeout(() => {
      setWeather({
        temperature: 28,
        condition: 'Partly Cloudy',
        humidity: 65,
        wind: 12,
        location: 'Yangon',
        icon: '⛅',
      });
      setIsLoadingWeather(false);
    }, 1000);
  }, []);

  const pinnedNotes = notes.filter(note => note.pinned).slice(0, 3);
  const recentNotes = notes.slice(0, 3);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Hello, {user?.username} 👋
          </h1>
          <div className="flex items-center gap-2 text-white/50">
            <Calendar className="w-4 h-4" />
            <span>
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="mx-2">•</span>
            <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50 text-sm mb-1">Total Notes</p>
                <p className="text-3xl font-bold text-white">{notes.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <StickyNote className="w-6 h-6 text-primary" />
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50 text-sm mb-1">Pinned</p>
                <p className="text-3xl font-bold text-white">{notes.filter(n => n.pinned).length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                📌
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50 text-sm mb-1">Temperature</p>
                {isLoadingWeather ? (
                  <LoadingSkeleton className="w-20 h-8" />
                ) : (
                  <p className="text-3xl font-bold text-white">{weather?.temperature}°C</p>
                )}
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50 text-sm mb-1">Location</p>
                {isLoadingWeather ? (
                  <LoadingSkeleton className="w-24 h-8" />
                ) : (
                  <p className="text-lg font-bold text-white">{weather?.location}</p>
                )}
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weather Card */}
          <GlassCard className="lg:col-span-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Weather</h2>
              <CloudSun className="text-white/50 w-6 h-6" />
            </div>

            {isLoadingWeather ? (
              <div className="space-y-4">
                <LoadingSkeleton className="w-full h-32" />
                <LoadingSkeleton className="w-3/4 h-4" />
                <LoadingSkeleton className="w-1/2 h-4" />
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">{weather?.icon}</div>
                <p className="text-4xl font-bold text-white mb-2">{weather?.temperature}°C</p>
                <p className="text-white/70 mb-6">{weather?.condition}</p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="flex items-center justify-center gap-2 text-white/50 mb-1">
                      <Droplets className="w-4 h-4" />
                      <span className="text-sm">Humidity</span>
                    </div>
                    <p className="text-white font-semibold">{weather?.humidity}%</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-2 text-white/50 mb-1">
                      <Wind className="w-4 h-4" />
                      <span className="text-sm">Wind</span>
                    </div>
                    <p className="text-white font-semibold">{weather?.wind} km/h</p>
                  </div>
                </div>
              </div>
            )}
          </GlassCard>

          {/* Recent Notes */}
          <GlassCard className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Notes</h2>
              <Button size="sm" onClick={() => window.location.href = '/notes'}>
                <Plus className="w-4 h-4 mr-1" />
                New Note
              </Button>
            </div>

            {recentNotes.length === 0 ? (
              <div className="text-center py-12">
                <StickyNote className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/50 mb-4">No notes yet</p>
                <Button onClick={() => window.location.href = '/notes'}>
                  Create your first note
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentNotes.map((note) => (
                  <motion.div
                    key={note.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {note.pinned && <span className="text-yellow-400">📌</span>}
                          <h3 className="text-white font-medium">{note.title}</h3>
                        </div>
                        <p className="text-white/50 text-sm line-clamp-2">{note.content}</p>
                      </div>
                      <span className="text-white/30 text-xs whitespace-nowrap ml-4">
                        {new Date(note.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="secondary"
              className="h-20 flex flex-col gap-2"
              onClick={() => window.location.href = '/notes'}
            >
              <Plus className="w-6 h-6" />
              <span>New Note</span>
            </Button>
            <Button
              variant="secondary"
              className="h-20 flex flex-col gap-2"
              onClick={() => window.location.href = '/weather'}
            >
              <CloudSun className="w-6 h-6" />
              <span>Weather</span>
            </Button>
            <Button
              variant="secondary"
              className="h-20 flex flex-col gap-2"
              onClick={() => window.location.href = '/profile'}
            >
              <span className="text-2xl">👤</span>
              <span>Profile</span>
            </Button>
            <Button
              variant="secondary"
              className="h-20 flex flex-col gap-2"
              onClick={() => window.location.href = '/settings'}
            >
              <span className="text-2xl">⚙️</span>
              <span>Settings</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
