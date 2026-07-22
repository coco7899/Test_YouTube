import React from 'react';
import { Lightbulb, BookOpen, Brain, Sparkles, Plus, Bolt, RefreshCw } from 'lucide-react';
import { CreatorPlan } from '../types';

interface Stage2Props {
  plan: CreatorPlan;
  onOpenStorylines: () => void;
  onOpenPsychology: () => void;
  onAddIdea: () => void;
  onGenerateScript: () => void;
  isGenerating?: boolean;
}

export const Stage2IdeaExtraction: React.FC<Stage2Props> = ({
  plan,
  onOpenStorylines,
  onOpenPsychology,
  onAddIdea,
  onGenerateScript,
  isGenerating,
}) => {
  return (
    <section className="flex-1 flex flex-col gap-4 min-w-[440px] max-w-[600px]">
      {/* Stage Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 font-['Montserrat']">
          <Lightbulb className="w-4 h-4 text-[#6200ee]" />
          Idea Extraction
        </h2>
        <span className="text-[10px] font-bold tracking-wider text-gray-500 bg-gray-200/60 px-2 py-0.5 rounded">
          STAGE 2
        </span>
      </div>

      {/* Main Canvas Container */}
      <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-200/80 flex-1 flex flex-col">
        {/* Title area */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#4800b2] font-['Montserrat']">
              브레인스토밍 캔버스
            </h3>
            <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full">
              키워드: {plan.keyword}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            핵심 컨셉과 시청자 심리를 분석합니다.
          </p>
        </div>

        {/* 2 Scenario Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div
            onClick={onOpenStorylines}
            className="p-3.5 bg-purple-50/60 border border-purple-100 hover:border-purple-300 rounded-xl cursor-pointer transition-all hover:shadow-xs group flex items-start gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-[#6200ee] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 mb-0.5 group-hover:text-[#6200ee]">
                스토리라인
              </h4>
              <p className="text-[11px] text-gray-500 leading-tight">
                3가지 대안 시나리오 제안
              </p>
            </div>
          </div>

          <div
            onClick={onOpenPsychology}
            className="p-3.5 bg-teal-50/60 border border-teal-100 hover:border-teal-300 rounded-xl cursor-pointer transition-all hover:shadow-xs group flex items-start gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-[#006a60] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 mb-0.5 group-hover:text-[#006a60]">
                심리 분석
              </h4>
              <p className="text-[11px] text-gray-500 leading-tight">
                클릭 유발 트리거 분석
              </p>
            </div>
          </div>
        </div>


        {/* Workspace Area */}
        <div className="flex-1 bg-gray-100/80 rounded-xl p-4 flex flex-col overflow-hidden border border-gray-200/60">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            <span className="ml-auto text-[10px] font-extrabold text-gray-400 uppercase tracking-widest font-['Montserrat']">
              WORKSPACE
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto min-h-[280px] max-h-[460px] pr-1 custom-scrollbar flex-1">
            {/* Core Hypothesis */}
            <div className="p-4 bg-white rounded-2xl border-2 border-purple-200/90 shadow-2xs min-h-[130px] flex flex-col justify-start">
              <p className="text-xs text-gray-700 leading-relaxed">
                <span className="font-extrabold text-[#4800b2] text-xs block mb-1">
                  💡 핵심 가설:
                </span>
                {plan.coreHypothesis}
              </p>
            </div>

            {/* Extracted Concept */}
            <div className="p-4 bg-white rounded-2xl border-2 border-purple-200/90 shadow-2xs min-h-[130px] flex flex-col justify-start">
              <p className="text-xs text-gray-700 leading-relaxed">
                <span className="font-extrabold text-[#4800b2] text-xs block mb-1">
                  🚀 추출 컨셉:
                </span>
                {plan.extractedConcept}
              </p>
            </div>
          </div>

          {/* Add new idea button */}
          <button
            onClick={onAddIdea}
            disabled={isGenerating}
            className="mt-3 w-full py-2.5 bg-white border-2 border-dashed border-purple-300 rounded-xl text-[#4800b2] text-xs font-bold hover:bg-purple-50 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#6200ee]" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            <span>{isGenerating ? 'AI가 변형 아이디어 생성 중...' : '새로운 아이디어 추가 및 변형'}</span>
          </button>
        </div>

        {/* Primary Action Execute Button (PRD: 화면 하단 눈에 띄는 색상의 실행 버튼) */}
        <div className="mt-4">
          <button
            onClick={onGenerateScript}
            disabled={isGenerating}
            className="w-full h-[68px] bg-gradient-to-r from-[#6200ee] via-[#5200db] to-[#4800b2] hover:from-[#5300cd] hover:to-[#38008c] text-white text-base font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 group cursor-pointer border border-purple-400/30"
          >
            {isGenerating ? (
              <RefreshCw className="w-6 h-6 animate-spin" />
            ) : (
              <Bolt className="w-6 h-6 text-yellow-300 fill-yellow-300 group-hover:scale-110 transition-transform" />
            )}
            <span>[ 이 주제로 AI 대본 생성하기 ]</span>
          </button>
        </div>
      </div>
    </section>
  );
};
