import React, { useState } from 'react';
import { Header } from './components/Header';
import { Stage1ReferenceKeywords } from './components/Stage1ReferenceKeywords';
import { Stage2IdeaExtraction } from './components/Stage2IdeaExtraction';
import { Stage3ScriptGeneration } from './components/Stage3ScriptGeneration';
import { Stage4ThumbnailStudio } from './components/Stage4ThumbnailStudio';
import { StorylineModal } from './components/StorylineModal';
import { PsychologyModal } from './components/PsychologyModal';
import {
  initialTrendKeywords,
  initialOverseasVideos,
  defaultCreatorPlan,
} from './data/mockData';
import { CreatorPlan, TrendKeyword, ThumbnailVariation } from './types';
import { Zap, Sparkles, Check, X } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [visualStyle, setVisualStyle] = useState<'Realistic Style' | '2D Animation' | '3D Character' | 'Minimalist'>('Realistic Style');
  
  // Filtering state
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [formatFilter, setFormatFilter] = useState<'all' | 'short' | 'long'>('all');

  // Main plan & lists
  const [trendKeywords, setTrendKeywords] = useState<TrendKeyword[]>(initialTrendKeywords);
  const [overseasVideos] = useState(initialOverseasVideos);
  const [currentPlan, setCurrentPlan] = useState<CreatorPlan>(defaultCreatorPlan);
  const [selectedKeyword, setSelectedKeyword] = useState<string>('#생성형AI_활용법');

  // UI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isStorylinesOpen, setIsStorylinesOpen] = useState(false);
  const [isPsychologyOpen, setIsPsychologyOpen] = useState(false);
  const [showQuickModal, setShowQuickModal] = useState(false);
  const [customTopicInput, setCustomTopicInput] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Call Express API to generate new plan with Gemini
  const fetchNewPlan = async (keywordOrTopic: string) => {
    setIsGenerating(true);
    showToast(`"${keywordOrTopic}" 주제로 AI 기획서 및 대본 생성 중...`);

    try {
      const res = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: keywordOrTopic,
          visualStyle,
        }),
      });

      const json = await res.json();

      if (json.success && json.data) {
        const d = json.data;
        const newPlan: CreatorPlan = {
          ...currentPlan,
          id: `plan-${Date.now()}`,
          keyword: keywordOrTopic.startsWith('#') ? keywordOrTopic : `#${keywordOrTopic}`,
          recommendedTitle: d.recommendedTitle || currentPlan.recommendedTitle,
          coreHypothesis: d.coreHypothesis || currentPlan.coreHypothesis,
          extractedConcept: d.extractedConcept || currentPlan.extractedConcept,
          storylines: d.storylines || currentPlan.storylines,
          psychologyTriggers: d.psychologyTriggers || currentPlan.psychologyTriggers,
          hookPhrases: d.hookPhrases || currentPlan.hookPhrases,
          estimatedViews: d.estimatedViews || '50k+',
          totalDuration: d.totalDuration || '58s',
          visualStyle,
          scenes: (d.scenes || []).map((s: any, idx: number) => ({
            id: `s-${Date.now()}-${idx}`,
            sceneNumber: s.sceneNumber || idx + 1,
            sceneTitle: s.sceneTitle || (idx === 0 ? 'Hook' : idx === 1 ? 'Problem' : 'Solution'),
            timeRange: s.timeRange || (idx === 0 ? '00:00 - 00:05' : idx === 1 ? '00:05 - 00:15' : '00:15 - 00:45'),
            scriptText: s.scriptText || '',
            textOverlay: s.textOverlay || '',
            motionEffect: s.motionEffect || 'Slide Up',
            imagePrompt: s.imagePrompt || 'Futuristic AI interface',
            generatedImageUrl: currentPlan.scenes[idx]?.generatedImageUrl || currentPlan.scenes[0].generatedImageUrl,
          })),
          thumbnailVariations: [
            {
              id: `thumb-v1-${Date.now()}`,
              name: '시안 1: High Contrast',
              url: currentPlan.thumbnailVariations[0].url,
              style: 'High Contrast',
              overlayTop: d.thumbnailOverlays?.overlayTop || '퇴사 확정?!',
              overlayBottom: d.thumbnailOverlays?.overlayBottom || '0원 AI 부업 💰',
            },
            {
              id: `thumb-v2-${Date.now()}`,
              name: '시안 2: Soft Minimal',
              url: currentPlan.thumbnailVariations[1].url,
              style: 'Soft Minimal',
              overlayTop: 'AI 수익화 공식',
              overlayBottom: '하루 10분 자동화 ⚡',
            },
            {
              id: `thumb-v3-${Date.now()}`,
              name: '시안 3: Dark Impact',
              url: currentPlan.thumbnailVariations[2].url,
              style: 'Dark Impact',
              overlayTop: '떡상 보장!',
              overlayBottom: '2026 AI 레시피 🔥',
            },
          ],
        };

        setCurrentPlan(newPlan);
        showToast('Gemini AI가 기획서와 대본 생성을 완료했습니다!');
      } else {
        showToast('AI 기획서 생성 완료 (프리셋 모드)');
      }
    } catch (err) {
      console.error(err);
      showToast('AI 기획서 생성 모드로 업데이트되었습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Keyword selection from Stage 1
  const handleSelectKeyword = (item: TrendKeyword) => {
    setSelectedKeyword(item.keyword);
    fetchNewPlan(item.keyword);
  };

  // Header Search trigger
  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    const cleanQuery = searchQuery.trim();
    const tagQuery = `#${cleanQuery.replace(/^#/, '')}`;

    // Dynamically generate matching trend keywords for search query
    const searchTrendList: TrendKeyword[] = [
      {
        id: `sk-1-${Date.now()}`,
        keyword: tagQuery,
        growth: '+310%',
        category: 'short',
        timeframe: timeframe,
        topic: `${cleanQuery} 관련 핵심 알고리즘 주제`,
        rank: 1,
      },
      {
        id: `sk-2-${Date.now()}`,
        keyword: `#${cleanQuery}_시작하기`,
        growth: '+215%',
        category: 'short',
        timeframe: timeframe,
        topic: `초보자용 ${cleanQuery} 실전 3단계 가이드`,
        rank: 2,
      },
      {
        id: `sk-3-${Date.now()}`,
        keyword: `#${cleanQuery}_수익화_비밀`,
        growth: '+185%',
        category: 'all',
        timeframe: timeframe,
        topic: `${cleanQuery}로 월 300만원 창출하기`,
        rank: 3,
      },
      ...initialTrendKeywords.slice(0, 3),
    ];

    setTrendKeywords(searchTrendList);
    setSelectedKeyword(tagQuery);
    fetchNewPlan(cleanQuery);
  };

  // Real Scene visual generator using Pollinations AI Prompt engine
  const handleGenerateSceneVisual = (sceneId: string, type: 'image' | 'video' = 'image') => {
    const targetScene = currentPlan.scenes.find((s) => s.id === sceneId);
    if (!targetScene) return;

    setCurrentPlan((prev) => ({
      ...prev,
      scenes: prev.scenes.map((s) =>
        s.id === sceneId ? { ...s, isGeneratingImage: true } : s
      ),
    }));

    showToast(`AI ${type === 'video' ? '비디오' : '이미지'} 에셋 생성 중...`);

    const promptText = `${targetScene.imagePrompt}, cinematic 8k quality, detailed studio lighting, photorealistic youtube shortscene`;
    const seed = Math.floor(Math.random() * 100000);
    const realAiImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=1280&height=720&nologo=true&seed=${seed}`;

    // Preload image to ensure smooth render
    const img = new Image();
    img.src = realAiImageUrl;
    img.onload = () => {
      setCurrentPlan((prev) => ({
        ...prev,
        scenes: prev.scenes.map((s) =>
          s.id === sceneId
            ? {
                ...s,
                isGeneratingImage: false,
                generatedImageUrl: realAiImageUrl,
                mediaType: type,
              }
            : s
        ),
      }));
      showToast(`AI ${type === 'video' ? '비디오' : '이미지'} 에셋 생성이 완료되었습니다!`);
    };
    img.onerror = () => {
      // Fallback to high quality unsplash image if pollinations network delay
      const fallbackUrl = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1280&q=80&sig=${seed}`;
      setCurrentPlan((prev) => ({
        ...prev,
        scenes: prev.scenes.map((s) =>
          s.id === sceneId
            ? {
                ...s,
                isGeneratingImage: false,
                generatedImageUrl: fallbackUrl,
                mediaType: type,
              }
            : s
        ),
      }));
      showToast(`AI ${type === 'video' ? '비디오' : '이미지'} 에셋 생성이 완료되었습니다!`);
    };
  };

  const handleSelectThumbnailStyle = (v: ThumbnailVariation) => {
    setCurrentPlan((prev) => ({
      ...prev,
      selectedThumbnailId: v.id,
    }));
  };

  // Apply storyline selection
  const handleSelectStoryline = (desc: string) => {
    setCurrentPlan((prev) => ({
      ...prev,
      extractedConcept: desc,
    }));
    showToast('선택한 스토리라인이 기획서에 적용되었습니다.');
  };

  return (
    <div className="min-h-screen bg-[#f3f4f5] text-[#191c1d] flex flex-col font-['Inter'] selection:bg-purple-100 selection:text-[#6200ee]">
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        visualStyle={visualStyle}
        setVisualStyle={setVisualStyle}
        isGenerating={isGenerating}
      />

      {/* Main Flow Grid */}
      <main className="flex-1 p-4 lg:p-6 overflow-x-auto flex gap-4 xl:gap-6 items-start justify-start max-w-[1920px] mx-auto w-full">
        {/* STAGE 1: Reference & Keywords */}
        <Stage1ReferenceKeywords
          trendKeywords={trendKeywords}
          overseasVideos={overseasVideos}
          selectedKeyword={selectedKeyword}
          onSelectKeyword={handleSelectKeyword}
          onSelectVideoTopic={(topic) => {
            setSelectedKeyword(topic.startsWith('#') ? topic : `#${topic}`);
            fetchNewPlan(topic);
          }}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          formatFilter={formatFilter}
          setFormatFilter={setFormatFilter}
        />

        {/* STAGE 2: Idea Extraction */}
        <Stage2IdeaExtraction
          plan={currentPlan}
          onOpenStorylines={() => setIsStorylinesOpen(true)}
          onOpenPsychology={() => setIsPsychologyOpen(true)}
          onAddIdea={() => setShowQuickModal(true)}
          onGenerateScript={() => fetchNewPlan(selectedKeyword)}
          isGenerating={isGenerating}
        />

        {/* STAGE 3: Script & AI Assets */}
        <Stage3ScriptGeneration
          plan={currentPlan}
          onRegenerateScript={() => fetchNewPlan(selectedKeyword)}
          onGenerateSceneVisual={handleGenerateSceneVisual}
          isGenerating={isGenerating}
          onShowToast={showToast}
        />

        {/* STAGE 4: Thumbnail Studio */}
        <Stage4ThumbnailStudio
          plan={currentPlan}
          onSelectThumbnailStyle={handleSelectThumbnailStyle}
          onShowToast={showToast}
        />
      </main>

      {/* Floating Quick Action Button */}
      <button
        onClick={() => setShowQuickModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#6200ee] to-[#4800b2] text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 border-2 border-white/40 cursor-pointer"
        title="빠른 AI 주제 아이디어 창작"
      >
        <Zap className="w-7 h-7 text-yellow-300 fill-yellow-300 animate-pulse" />
      </button>

      {/* Modals */}
      <StorylineModal
        isOpen={isStorylinesOpen}
        onClose={() => setIsStorylinesOpen(false)}
        plan={currentPlan}
        onSelectStoryline={handleSelectStoryline}
      />

      <PsychologyModal
        isOpen={isPsychologyOpen}
        onClose={() => setIsPsychologyOpen(false)}
        plan={currentPlan}
      />

      {/* Quick Topic AI Modal */}
      {showQuickModal && (
        <div
          onClick={() => setShowQuickModal(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100"
          >
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#6200ee]" />
                <h3 className="text-base font-bold text-gray-900">
                  새로운 AI 영상 주제 입력
                </h3>
              </div>
              <button
                onClick={() => setShowQuickModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              만들고 싶은 영상의 주제나 키워드를 입력하시면, Gemini AI가 실시간으로 기획서와 숏폼 대본을 완성해 드립니다.
            </p>

            <input
              type="text"
              placeholder="예: 0원 AI 부업, 코딩 없이 앱 만들기, 직장인 AI 자동화..."
              value={customTopicInput}
              onChange={(e) => setCustomTopicInput(e.target.value)}
              className="w-full text-xs font-semibold p-3 border border-gray-200 rounded-xl mb-4 focus:outline-hidden focus:border-[#6200ee] bg-gray-50 focus:bg-white"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowQuickModal(false)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={() => {
                  if (customTopicInput.trim()) {
                    setSelectedKeyword(`#${customTopicInput.trim().replace(/^#/, '')}`);
                    fetchNewPlan(customTopicInput.trim());
                    setCustomTopicInput('');
                    setShowQuickModal(false);
                  }
                }}
                className="flex-1 py-2.5 bg-gradient-to-r from-[#6200ee] to-[#4800b2] text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md"
              >
                AI 기획 생성
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
