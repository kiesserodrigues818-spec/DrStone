import React from 'react';
import { motion } from 'motion/react';
import { Zap, Star, Shield, Flame, BookOpen, Trophy } from 'lucide-react';
import { UserStats } from '../types';
import { cn } from '../lib/utils';

interface DashboardProps {
  stats: UserStats;
}

export function Dashboard({ stats }: DashboardProps) {
  const progressPercentage = (stats.xp / stats.nextLevelXp) * 100;

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-stone-100">Bem-vindo de volta, Doutor</h2>
          <p className="text-stone-400 mt-1">Sua jornada médica continua. Reconstrua a civilização com conhecimento.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-panel px-4 py-2 flex items-center gap-2">
            <Flame className="text-orange-500 w-5 h-5" />
            <span className="font-bold">{stats.streak} Dias de Ofensiva</span>
          </div>
          <div className="glass-panel px-4 py-2 flex items-center gap-2">
            <Zap className="text-amber-500 w-5 h-5" />
            <span className="font-bold">{stats.stones} Stones</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Level Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 col-span-1 md:col-span-2 relative overflow-hidden group"
        >
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Star className="text-emerald-400 w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-stone-400 uppercase tracking-widest font-bold">Nível Atual</p>
                  <h3 className="text-2xl font-bold text-stone-100">Nível {stats.level}</h3>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-stone-400">{stats.xp} / {stats.nextLevelXp} XP</p>
              </div>
            </div>
            
            <div className="h-4 bg-stone-800 rounded-full overflow-hidden border border-stone-700">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              />
            </div>
          </div>
          
          <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <Shield className="w-64 h-64 text-emerald-500" />
          </div>
        </motion.div>

        {/* Daily Quest */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 border-amber-500/20 bg-amber-500/5"
        >
          <h4 className="text-amber-400 font-bold uppercase text-xs tracking-widest mb-4">Missão Diária</h4>
          <p className="text-stone-100 font-medium mb-4">Complete 2 Lições de Cardiovascular para ganhar Stones bônus.</p>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1 h-1.5 bg-stone-800 rounded-full">
              <div className="w-1/2 h-full bg-amber-500 rounded-full" />
            </div>
            <span className="text-xs text-stone-400 font-mono">1/2</span>
          </div>
          <button className="w-full stone-button bg-amber-500 text-stone-950 font-bold hover:bg-amber-400">
            Continuar Missão
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Zap className="text-emerald-500 w-5 h-5" />
            Atividade Recente
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel p-4 flex items-center justify-between hover:bg-stone-800/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center">
                    <BookOpen className="text-emerald-400 w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-stone-100">Anatomia Cardiovascular</p>
                    <p className="text-xs text-stone-500">Lição 2: Grandes Vasos</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-500">+120 XP</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Trophy className="text-amber-500 w-5 h-5" />
            Emblemas Desbloqueados
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {stats.badges.map((badge) => (
              <div 
                key={badge.id}
                className={cn(
                  "aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all group cursor-help",
                  badge.unlocked 
                    ? "bg-stone-800/50 border-stone-700 text-stone-100" 
                    : "bg-stone-900/20 border-stone-800/50 text-stone-600 grayscale"
                )}
                title={badge.description}
              >
                <div className="text-2xl">{badge.icon}</div>
                <span className="text-[10px] font-bold uppercase tracking-tighter text-center px-1">
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


