import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button, GlassCard } from '../components/ui';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background aurora-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold gradient-text">Rayzi OS</h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/60 max-w-2xl mx-auto mb-8"
          >
            Your personal productivity operating system. 
            Manage your daily tasks, notes, and more in one beautiful place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              className="group"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/register')}
            >
              Create Account
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
        >
          <GlassCard className="text-center">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-lg font-semibold mb-2">Smart Notes</h3>
            <p className="text-white/50 text-sm">
              Organize your thoughts with our intuitive note-taking system
            </p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="text-3xl mb-3">🌤️</div>
            <h3 className="text-lg font-semibold mb-2">Live Weather</h3>
            <p className="text-white/50 text-sm">
              Stay updated with real-time weather information
            </p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Fast & Smooth</h3>
            <p className="text-white/50 text-sm">
              Experience premium performance with modern design
            </p>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
