/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { StudyView } from './components/StudyView';
import { QuizView } from './components/QuizView';
import { AIAssistant } from './components/AIAssistant';
import { UserStats, Quiz } from './types';
import { STUDY_MODULES, QUIZZES } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Zap } from 'lucide-react';

const INITIAL_STATS: UserStats = {
  level: 1,
  xp: 450,
  nextLevelXp: 1000,
  stones: 120,
  streak: 5,
  badges: [
    { id: 'b1', name: 'Primeira Descoberta', icon: '🧪', description: 'Complete sua primeira lição.', unlocked: true },
    { id: 'b2', name: 'Estudioso', icon: '📚', description: 'Estude por 3 dias seguidos.', unlocked: true },
    { id: 'b3', name: 'Cirurgião', icon: '🔪', description: 'Acerte 100% em um quiz de Anatomia.', unlocked: false },
    { id: 'b4', name: 'Alquimista', icon: '⚗️', description: 'Desbloqueie 5 módulos médicos.', unlocked: false },
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const handleQuizComplete = (xp: number, stones: number) => {
    setStats(prev => {
      let newXp = prev.xp + xp;
      let newLevel = prev.level;
      let newNextXp = prev.nextLevelXp;

      if (newXp >= prev.nextLevelXp) {
        newLevel += 1;
        newXp -= prev.nextLevelXp;
        newNextXp = Math.round(prev.nextLevelXp * 1.5);
        setShowLevelUp(true);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        nextLevelXp: newNextXp,
        stones: prev.stones + stones
      };
    });
    setActiveQuiz(null);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    if (activeQuiz) {
      return (
        <QuizView 
          quiz={activeQuiz} 
          onComplete={handleQuizComplete}
          onCancel={() => setActiveQuiz(null)}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} />;
      case 'study':
        return <StudyView modules={STUDY_MODULES} onSelectModule={() => {}} />;
      case 'quizzes':
        return (
          <div className="p-8 space-y-8 max-w-6xl mx-auto">
            <header>
              <h2 className="text-3xl font-bold text-stone-100">Desafios</h2>
              <p className="text-stone-400 mt-1">Teste seus conhecimentos e ganhe recursos valiosos.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {QUIZZES.map(quiz => (
                <div key={quiz.id} className="glass-panel p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-stone-100">{quiz.title}</h3>
                    <div className="flex gap-2">
                      <span className="text-xs font-mono text-emerald-500">+{quiz.xpReward} XP</span>
                      <span className="text-xs font-mono text-amber-500">+{quiz.stoneReward} S</span>
                    </div>
                  </div>
                  <p className="text-stone-400 text-sm mb-6">Um teste abrangente sobre estruturas e funções cardiovasculares.</p>
                  <button 
                    onClick={() => setActiveQuiz(quiz)}
                    className="stone-button-primary mt-auto flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    Iniciar Desafio
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'rewards':
        return (
          <div className="p-8 space-y-8 max-w-6xl mx-auto">
            <header>
              <h2 className="text-3xl font-bold text-stone-100">Troféus e Recompensas</h2>
              <p className="text-stone-400 mt-1">Suas conquistas na reconstrução da ciência médica.</p>
            </header>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.badges.map(badge => (
                <div key={badge.id} className={`glass-panel p-6 text-center space-y-4 ${!badge.unlocked && 'opacity-40 grayscale'}`}>
                  <div className="text-5xl">{badge.icon}</div>
                  <div>
                    <h4 className="font-bold text-stone-100">{badge.name}</h4>
                    <p className="text-xs text-stone-500 mt-1">{badge.description}</p>
                  </div>
                  {badge.unlocked ? (
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Desbloqueado</span>
                  ) : (
                    <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">Bloqueado</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="p-8 text-stone-500">Recurso em breve...</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-stone-950 text-stone-100 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 h-screen overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (activeQuiz ? '-quiz' : '')}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        <AIAssistant />

        {/* Level Up Notification */}
        <AnimatePresence>
          {showLevelUp && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm p-4"
            >
              <div className="glass-panel p-12 max-w-sm w-full text-center space-y-6 border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                <div className="w-24 h-24 bg-emerald-500 rounded-3xl rotate-12 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/40">
                  <Trophy className="text-stone-950 w-12 h-12 -rotate-12" />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-stone-100 italic uppercase tracking-tighter">Subiu de Nível!</h2>
                  <p className="text-emerald-400 font-bold text-xl">Você alcançou o Nível {stats.level}</p>
                </div>
                <p className="text-stone-400">Sua perícia médica está crescendo. Novos módulos foram desbloqueados no Laboratório.</p>
                <button 
                  onClick={() => setShowLevelUp(false)}
                  className="w-full stone-button-primary py-4 text-lg"
                >
                  Continuar Jornada
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
