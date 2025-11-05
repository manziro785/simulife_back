export interface Character {
  id: string;
  name: string;
  description: string;
  avatar: string;
  stats: {
    money: number;
    energy: number;
    mood: number;
  };
}

export interface ChoiceImpact {
  money: number;
  energy: number;
  mood: number;
}

export interface Choice {
  id: string;
  text: string;
  impact: ChoiceImpact;
}

export interface Lesson {
  title: string;
  text: string;
  icon: string;
}

export interface DayStory {
  day: number;
  title: string;
  description: string;
  context: string;
  choices: Choice[];
  lesson: Lesson;
}

export interface User {
  email: string;
  password: string;
}
