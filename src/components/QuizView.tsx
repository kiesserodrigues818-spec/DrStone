import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, Zap, FlaskConical, AlertCircle } from 'lucide-react';
import { Quiz, Question } from '../types';
import { cn } from '../lib/utils';

interface QuizViewProps {
  quiz: Quiz;
  onComplete: (xp: number, stones: number) => void;
  onCancel: () => void;
}

export function QuizView({ quiz, onComplete, onCancel }: QuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (isCorrect) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    const finalXp = Math.round((score / quiz.questions.length) * quiz.xpReward);
    const finalStones = Math.round((score / quiz.questions.length) * quiz.stoneReward);

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto mt-20 p-8 glass-panel text-center space-y-8"
      >
        <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
          <FlaskConical className="text-emerald-400 w-12 h-12" />
        </div>
        
        <div>
          <h2 className="text-4xl font-bold text-stone-100">Experimento Concluído!</h2>
          <p className="text-stone-400 mt-2">Você analisou os dados com sucesso.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone-800/50 p-6 rounded-2xl border border-stone-700">
            <p className="text-stone-500 text-sm uppercase font-bold tracking-widest">XP Ganho</p>
            <p className="text-3xl font-bold text-emerald-400">+{finalXp}</p>
          </div>
          <div className="bg-stone-800/50 p-6 rounded-2xl border border-stone-700">
            <p className="text-stone-500 text-sm uppercase font-bold tracking-widest">Stones Ganhas</p>
            <p className="text-3xl font-bold text-amber-400">+{finalStones}</p>
          </div>
        </div>

        <div className="py-4">
          <p className="text-stone-100 font-medium">Pontuação: {score} / {quiz.questions.length}</p>
          <div className="w-full h-2 bg-stone-800 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-emerald-500" 
              style={{ width: `${(score / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <button 
          onClick={() => onComplete(finalXp, finalStones)}
          className="w-full stone-button-primary py-4 text-lg"
        >
          Voltar ao Laboratório
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 space-y-8">
      <div className="flex justify-between items-center">
        <button onClick={onCancel} className="text-stone-500 hover:text-stone-100 transition-colors">
          Sair do Desafio
        </button>
        <div className="flex items-center gap-4">
          <span className="text-stone-400 font-mono text-sm">Pergunta {currentQuestionIndex + 1} de {quiz.questions.length}</span>
          <div className="w-32 h-1.5 bg-stone-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500" 
              style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="space-y-8"
        >
          <h3 className="text-2xl font-bold text-stone-100 leading-tight">
            {currentQuestion.text}
          </h3>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
                className={cn(
                  "w-full p-5 rounded-2xl text-left border-2 transition-all flex items-center justify-between group",
                  selectedOption === index 
                    ? isAnswered 
                      ? isCorrect 
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                        : "bg-red-500/10 border-red-500 text-red-400"
                      : "bg-emerald-500/5 border-emerald-500/50 text-emerald-400"
                    : isAnswered && index === currentQuestion.correctAnswer
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                      : "bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200"
                )}
              >
                <span className="font-medium">{option}</span>
                {isAnswered && index === currentQuestion.correctAnswer && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                )}
                {isAnswered && selectedOption === index && !isCorrect && (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </button>
            ))}
          </div>

          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-6 rounded-2xl border flex gap-4",
                isCorrect ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                isCorrect ? "bg-emerald-500/20" : "bg-red-500/20"
              )}>
                {isCorrect ? <Zap className="text-emerald-400 w-5 h-5" /> : <AlertCircle className="text-red-400 w-5 h-5" />}
              </div>
              <div>
                <p className={cn("font-bold mb-1", isCorrect ? "text-emerald-400" : "text-red-400")}>
                  {isCorrect ? "Análise Excelente!" : "Inconsistência de Dados"}
                </p>
                <p className="text-sm text-stone-400 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="pt-4">
        {!isAnswered ? (
          <button
            onClick={handleConfirm}
            disabled={selectedOption === null}
            className="w-full stone-button-primary py-4 text-lg disabled:opacity-30"
          >
            Confirmar Análise
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full stone-button-secondary py-4 text-lg flex items-center justify-center gap-2"
          >
            {currentQuestionIndex < quiz.questions.length - 1 ? "Próxima Pergunta" : "Ver Resultados"}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
