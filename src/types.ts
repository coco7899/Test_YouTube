export interface TrendKeyword {
  id: string;
  keyword: string;
  growth: string;
  category: 'short' | 'long' | 'all';
  timeframe: 'daily' | 'weekly' | 'monthly';
  topic: string;
  rank: number;
}

export interface OverseasVideo {
  id: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  summary: string;
}

export interface AIRecipe {
  id: string;
  toolName: string;
  role: string;
  badgeColor?: string;
  guide: string;
}

export interface ScriptScene {
  id: string;
  sceneNumber: number;
  sceneTitle: string;
  timeRange: string;
  scriptText: string;
  textOverlay: string;
  motionEffect: string;
  imagePrompt: string;
  generatedImageUrl?: string;
  isGeneratingImage?: boolean;
  mediaType?: 'image' | 'video';
}

export interface ThumbnailVariation {
  id: string;
  name: string;
  url: string;
  style: 'High Contrast' | 'Soft Minimal' | 'Dark Impact' | 'Neon Glow';
  overlayTop: string;
  overlayBottom: string;
}

export interface CreatorPlan {
  id: string;
  keyword: string;
  recommendedTitle: string;
  coreHypothesis: string;
  extractedConcept: string;
  storylines: { title: string; desc: string }[];
  psychologyTriggers: { trigger: string; reason: string }[];
  aiRecipes: AIRecipe[];
  hookPhrases: string[];
  estimatedViews: string;
  totalDuration: string;
  scenes: ScriptScene[];
  selectedThumbnailId: string;
  thumbnailVariations: ThumbnailVariation[];
  visualStyle: 'Realistic Style' | '2D Animation' | '3D Character' | 'Minimalist';
}
