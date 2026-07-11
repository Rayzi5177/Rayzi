import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Activity, Award } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { GlassCard, Button } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';

export default function Profile() {
  const { user } = useAuth();
  const { notes } = useNotes();

  const stats = [
    { label: 'Total Notes', value: notes.length, icon: '📝' },
    { label: 'Pinned Notes', value: notes.filter(n => n.pinned).length, icon: '📌' },
    { label: 'Days Active', value: 7, icon: '🔥' },
    { label: 'Level', value: 'Explorer', icon: '🏆' },
  ];

  const recentActivity = [
    { action: 'Created a note', time: '2 hours ago', icon: '➕' },
    { action: 'Pinned a note', time: '5 hours ago', icon: '📌' },
    { action: 'Updated profile', time: '1 day ago', icon: '✏️' },
    { action: 'Joined Rayzi OS', time: '7 days ago', icon: '🎉' },
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-white/50">Manage your account information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <GlassCard className="lg:col-span-1">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl text-white font-bold">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-1">{user?.username}</h2>
              <p className="text-white/50 mb-6">{user?.email}</p>

              <div className="flex items-center justify-center gap-2 text-white/50 mb-6">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  Joined {new Date(user?.created_at || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>

              <Button variant="secondary" className="w-full">
                Edit Profile
              </Button>
            </div>
          </GlassCard>

          {/* Stats & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Info */}
            <GlassCard>
              <h2 className="text-xl font-semibold text-white mb-6">Account Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/50 text-sm">Username</p>
                    <p className="text-white font-medium">{user?.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/50 text-sm">Email Address</p>
                    <p className="text-white font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/50 text-sm">Account Status</p>
                    <p className="text-white font-medium">Active</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <GlassCard key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/50 text-sm mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Recent Activity */}
            <GlassCard>
              <div className="flex items-center gap-2 mb-6">
                <Activity className="text-white/50 w-5 h-5" />
                <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-white">{activity.action}</p>
                      <p className="text-white/30 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
