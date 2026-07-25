export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: string;
}

export interface VoiceProfile {
  rawProfileText: string;
  sentenceLength?: string;
  vocabularyTier?: string;
  tone?: string;
  recurringPhrases?: string[];
  rhythm?: string;
  extractedAt: Date;
}

export interface GenerationResult {
  topic: string;
  generatedText: string;
  generatedAt: Date;
  wordCount: number;
}

export interface PresetSample {
  id: string;
  title: string;
  badge: string;
  text: string;
}

export interface PresetTopic {
  id: string;
  label: string;
  iconName: string;
}
