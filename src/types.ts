export interface UserStats {
  level: number;
  xp: number;
  nextLevelXp: number;
  stones: number; // Currency
  streak: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface StudyModule {
  id: string;
  title: string;
  category: 'Anatomia' | 'Fisiologia' | 'Patologia' | 'Farmacologia' | 'Clínica';
  difficulty: 1 | 2 | 3 | 4 | 5;
  progress: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  completed: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  xpReward: number;
  stoneReward: number;
}
