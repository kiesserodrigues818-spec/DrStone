import { StudyModule, Quiz } from './types';

export const STUDY_MODULES: StudyModule[] = [
  {
    id: 'anat-01',
    title: 'Anatomia Cardiovascular',
    category: 'Anatomia',
    difficulty: 3,
    progress: 45,
    lessons: [
      { id: 'l1', title: 'Câmaras Cardíacas', content: 'O coração consiste em quatro câmaras...', completed: true },
      { id: 'l2', title: 'Grandes Vasos', content: 'A aorta e a veia cava...', completed: false },
    ]
  },
  {
    id: 'phys-01',
    title: 'Fisiologia Renal',
    category: 'Fisiologia',
    difficulty: 4,
    progress: 10,
    lessons: [
      { id: 'l1', title: 'Filtração Glomerular', content: 'O primeiro passo na formação da urina...', completed: true },
    ]
  }
];

export const QUIZZES: Quiz[] = [
  {
    id: 'q-cardio-01',
    title: 'Desafio de Anatomia do Coração',
    xpReward: 500,
    stoneReward: 50,
    questions: [
      {
        id: 'q1',
        text: 'Qual válvula separa o átrio esquerdo do ventrículo esquerdo?',
        options: ['Válvula Tricúspide', 'Válvula Mitral', 'Válvula Pulmonar', 'Válvula Aórtica'],
        correctAnswer: 1,
        explanation: 'A válvula Mitral (ou Bicúspide) está localizada entre o átrio esquerdo e o ventrículo esquerdo.'
      },
      {
        id: 'q2',
        text: 'Qual é o marcapasso primário do coração?',
        options: ['Nó AV', 'Feixe de His', 'Nó SA', 'Fibras de Purkinje'],
        correctAnswer: 2,
        explanation: 'O nó Sinoatrial (SA) inicia o impulso elétrico em um coração normal.'
      }
    ]
  }
];
