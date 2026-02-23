import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, X, Loader2 } from 'lucide-react';
import { explainMedicalConcept } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse(null);
    const result = await explainMedicalConcept(query);
    setResponse(result || "No explanation found.");
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-emerald-500 text-stone-950 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform z-40"
      >
        <Sparkles className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 w-96 max-h-[600px] glass-panel shadow-2xl z-50 flex flex-col overflow-hidden border-emerald-500/30"
          >
            <div className="p-4 border-b border-stone-800 flex justify-between items-center bg-emerald-500/5">
              <div className="flex items-center gap-2">
                <Sparkles className="text-emerald-400 w-5 h-5" />
                <span className="font-bold text-stone-100">Mentor Médico IA</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-stone-500 hover:text-stone-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {response ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="prose prose-invert prose-emerald max-w-none text-sm"
                >
                  <ReactMarkdown>{response}</ReactMarkdown>
                  <button 
                    onClick={() => { setResponse(null); setQuery(''); }}
                    className="mt-4 text-emerald-500 hover:underline text-xs font-bold uppercase tracking-widest"
                  >
                    Fazer outra pergunta
                  </button>
                </motion.div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-stone-800 rounded-2xl flex items-center justify-center mx-auto">
                    <Search className="text-stone-500 w-8 h-8" />
                  </div>
                  <p className="text-stone-400 text-sm px-8">
                    Pergunte-me qualquer coisa sobre anatomia, fisiologia ou medicina clínica.
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-stone-800 bg-stone-900/50">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ex: Mecanismo de ação da Varfarina"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-500 text-stone-950 rounded-lg flex items-center justify-center disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
