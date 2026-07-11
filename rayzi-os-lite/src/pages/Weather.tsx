import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudSun, 
  Thermometer, 
  Wind, 
  Droplets,
  MapPin,
  RefreshCw,
  Sunrise,
  Sunset
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { GlassCard, Button, LoadingSkeleton, EmptyState } from '../components/ui';
import { WeatherData } from '../types';

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchWeather = async () => {
    setIsRefreshing(true);
    // Mock weather API - will be replaced with real API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setWeather({
      temperature: 28,
      condition: 'Partly Cloudy',
      humidity: 65,
      wind: 12,
      location: 'Yangon',
      icon: '⛅',
    });
    
    setIsLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const hourlyForecast = [
    { time: 'Now', temp: 28, icon: '⛅' },
    { time: '2 PM', temp: 29, icon: '☀️' },
    { time: '3 PM', temp: 30, icon: '☀️' },
    { time: '4 PM', temp: 29, icon: '⛅' },
    { time: '5 PM', temp: 27, icon: '🌥️' },
    { time: '6 PM', temp: 26, icon: '☁️' },
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Weather</h1>
            <p className="text-white/50">Real-time weather information</p>
          </div>
          <Button
            variant="secondary"
            onClick={fetchWeather}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard className="lg:col-span-2">
              <LoadingSkeleton className="w-full h-64" />
            </GlassCard>
            <GlassCard>
              <LoadingSkeleton className="w-full h-64" />
            </GlassCard>
          </div>
        ) : !weather ? (
          <EmptyState
            icon={<CloudSun className="w-16 h-16" />}
            title="No weather data"
            description="Unable to fetch weather information. Please try again."
            action={
              <Button onClick={fetchWeather}>
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Weather Card */}
            <GlassCard className="lg:col-span-2">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <MapPin className="text-white/50 w-5 h-5" />
                    <span className="text-white/70">{weather.location}</span>
                  </div>
                  <div className="text-7xl md:text-8xl mb-4">{weather.icon}</div>
                  <p className="text-5xl md:text-6xl font-bold text-white mb-2">
                    {weather.temperature}°C
                  </p>
                  <p className="text-xl text-white/70">{weather.condition}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                  <div className="glass-card p-4 text-center">
                    <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-white/50 text-sm mb-1">Humidity</p>
                    <p className="text-2xl font-bold text-white">{weather.humidity}%</p>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <Wind className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-white/50 text-sm mb-1">Wind Speed</p>
                    <p className="text-2xl font-bold text-white">{weather.wind} km/h</p>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <Sunrise className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <p className="text-white/50 text-sm mb-1">Sunrise</p>
                    <p className="text-2xl font-bold text-white">6:12 AM</p>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <Sunset className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-white/50 text-sm mb-1">Sunset</p>
                    <p className="text-2xl font-bold text-white">6:45 PM</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Hourly Forecast */}
            <GlassCard>
              <h2 className="text-xl font-semibold text-white mb-6">Hourly Forecast</h2>
              <div className="space-y-4">
                {hourlyForecast.map((hour, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <span className="text-white/70 w-16">{hour.time}</span>
                    <span className="text-2xl">{hour.icon}</span>
                    <span className="text-white font-semibold w-16 text-right">
                      {hour.temp}°C
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Weather Tips */}
        {!isLoading && weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <GlassCard>
              <h2 className="text-xl font-semibold text-white mb-4">Today's Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💧</div>
                  <div>
                    <p className="text-white font-medium mb-1">Stay Hydrated</p>
                    <p className="text-white/50 text-sm">
                      With {weather.humidity}% humidity, drink plenty of water.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">👕</div>
                  <div>
                    <p className="text-white font-medium mb-1">Light Clothing</p>
                    <p className="text-white/50 text-sm">
                      Temperature is {weather.temperature}°C, wear comfortable clothes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🌂</div>
                  <div>
                    <p className="text-white font-medium mb-1">Be Prepared</p>
                    <p className="text-white/50 text-sm">
                      Weather may change, keep an umbrella handy.
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
