import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  FlaskConical, 
  User, 
  Settings,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Painel', icon: LayoutDashboard },
  { id: 'study', label: 'Laboratório', icon: BookOpen },
  { id: 'quizzes', label: 'Desafios', icon: Zap },
  { id: 'rewards', label: 'Troféus', icon: Trophy },
  { id: 'profile', label: 'Perfil', icon: User },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 h-screen border-r border-stone-800 flex flex-col bg-stone-950/50 backdrop-blur-xl">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <FlaskConical className="text-stone-950 w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-stone-100">
          Dr<span className="text-emerald-500">Stone</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              activeTab === item.id 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                : "text-stone-400 hover:text-stone-100 hover:bg-stone-900"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-transform group-hover:scale-110",
              activeTab === item.id ? "text-emerald-400" : "text-stone-500"
            )} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-stone-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-900 transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Configurações</span>
        </button>
      </div>
    </aside>
  );
}
