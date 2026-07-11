import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Palette, 
  User, 
  Shield,
  Moon,
  Sun,
  Monitor,
  Globe,
  Trash2,
  Download,
  LogOut
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { GlassCard, Button, Input } from '../components/ui';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('appearance');
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('dark');

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'account', label: 'Account', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Shield },
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
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/50">Customize your Rayzi OS experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <GlassCard className="p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary/20 text-primary'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </GlassCard>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'appearance' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <GlassCard>
                  <h2 className="text-xl font-semibold text-white mb-6">Theme Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/70 mb-3">Color Theme</label>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          onClick={() => setTheme('light')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            theme === 'light'
                              ? 'border-primary bg-primary/10'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <Sun className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                          <p className="text-white text-sm">Light</p>
                        </button>
                        <button
                          onClick={() => setTheme('dark')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            theme === 'dark'
                              ? 'border-primary bg-primary/10'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <Moon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                          <p className="text-white text-sm">Dark</p>
                        </button>
                        <button
                          onClick={() => setTheme('system')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            theme === 'system'
                              ? 'border-primary bg-primary/10'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <Monitor className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                          <p className="text-white text-sm">System</p>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 mb-3">Language</label>
                      <select className="w-full glass-card px-4 py-3 bg-transparent text-white focus:outline-none focus:border-primary/50">
                        <option value="en">English</option>
                        <option value="my">မြန်မာ</option>
                        <option value="zh">中文</option>
                        <option value="es">Español</option>
                      </select>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <GlassCard>
                  <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div>
                        <p className="text-white font-medium">Push Notifications</p>
                        <p className="text-white/50 text-sm">Receive notifications about updates</p>
                      </div>
                      <button
                        onClick={() => setNotifications(!notifications)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notifications ? 'bg-primary' : 'bg-white/20'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            notifications ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div>
                        <p className="text-white font-medium">Email Notifications</p>
                        <p className="text-white/50 text-sm">Get updates via email</p>
                      </div>
                      <button
                        className="w-12 h-6 rounded-full bg-white/20"
                      >
                        <div className="w-5 h-5 rounded-full bg-white translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === 'account' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <GlassCard>
                  <h2 className="text-xl font-semibold text-white mb-6">Account Settings</h2>
                  
                  <div className="space-y-4">
                    <Input
                      label="Username"
                      defaultValue={user?.username}
                    />
                    <Input
                      label="Email"
                      type="email"
                      defaultValue={user?.email}
                    />
                    <Input
                      label="New Password"
                      type="password"
                      placeholder="••••••••"
                    />

                    <div className="pt-4 flex flex-wrap gap-3">
                      <Button>Save Changes</Button>
                      <Button variant="secondary">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard>
                  <h2 className="text-xl font-semibold text-white mb-4">Danger Zone</h2>
                  <p className="text-white/50 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="danger">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === 'privacy' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <GlassCard>
                  <h2 className="text-xl font-semibold text-white mb-6">Privacy Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div>
                        <p className="text-white font-medium">Profile Visibility</p>
                        <p className="text-white/50 text-sm">Make your profile visible to others</p>
                      </div>
                      <button className="w-12 h-6 rounded-full bg-primary">
                        <div className="w-5 h-5 rounded-full bg-white translate-x-6" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div>
                        <p className="text-white font-medium">Activity Status</p>
                        <p className="text-white/50 text-sm">Show when you're active</p>
                      </div>
                      <button className="w-12 h-6 rounded-full bg-primary">
                        <div className="w-5 h-5 rounded-full bg-white translate-x-6" />
                      </button>
                    </div>

                    <div className="pt-4">
                      <Button variant="secondary">
                        <Shield className="w-4 h-4 mr-2" />
                        Privacy Policy
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
