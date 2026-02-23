import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Clock, BarChart3, ChevronRight, Play } from 'lucide-react';
import { StudyModule } from '../types';
import { cn } from '../lib/utils';

interface StudyViewProps {
  modules: StudyModule[];
  onSelectModule: (module: StudyModule) => void;
}

export function StudyView({ modules, onSelectModule }: StudyViewProps) {
  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <header>
        <h2 className="text-3xl font-bold text-stone-100">Laboratório de Estudos</h2>
        <p className="text-stone-400 mt-1">Selecione um módulo para aprofundar seu conhecimento médico.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, idx) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 group hover:border-emerald-500/50 transition-all cursor-pointer flex flex-col"
            onClick={() => onSelectModule(module)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn(
                "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                module.category === 'Anatomia' ? "bg-blue-500/20 text-blue-400" :
                module.category === 'Fisiologia' ? "bg-purple-500/20 text-purple-400" :
                "bg-emerald-500/20 text-emerald-400"
              )}>
                {module.category}
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div 
                    key={star} 
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      star <= module.difficulty ? "bg-amber-500" : "bg-stone-800"
                    )} 
                  />
                ))}
              </div>
            </div>

            <h3 className="text-xl font-bold text-stone-100 mb-2 group-hover:text-emerald-400 transition-colors">
              {module.title}
            </h3>
            
            <div className="flex items-center gap-4 text-stone-500 text-sm mb-6">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{module.lessons.length} Lições</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>~45m</span>
              </div>
            </div>

            <div className="mt-auto space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-stone-400">Progresso</span>
                <span className="text-emerald-500">{module.progress}%</span>
              </div>
              <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500" 
                  style={{ width: `${module.progress}%` }}
                />
              </div>
              <button className="w-full mt-4 stone-button-secondary py-3 flex items-center justify-center gap-2 group-hover:bg-emerald-500 group-hover:text-stone-950 group-hover:border-emerald-500 transition-all">
                <Play className="w-4 h-4 fill-current" />
                Continuar
              </button>
            </div>
          </motion.div>
        ))}

        {/* Locked Module Placeholder */}
        <div className="glass-panel p-6 opacity-40 border-dashed border-stone-800 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center">
            <BarChart3 className="text-stone-600 w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-stone-400">Patologia Avançada</p>
            <p className="text-xs text-stone-600">Desbloqueie no Nível 5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
