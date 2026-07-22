import React from 'react';
import { X, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { CreatorPlan } from '../types';

interface StorylineModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: CreatorPlan;
  onSelectStoryline: (desc: string) => void;
}

export const StorylineModal: React.FC<StorylineModalProps> = ({
  isOpen,
  onClose,
  plan,
  onSelectStoryline,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-200"
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#6200ee] text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                스토리라인 (3가지 대안 시나리오)
              </h3>
              <p className="text-xs text-gray-500">
                원하는 전개 방식을 선택하면 대본에 바로 반영됩니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {plan.storylines.map((st, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelectStoryline(st.desc);
                onClose();
              }}
              className="p-4 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-xl cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#4800b2] group-hover:text-[#6200ee]">
                  {st.title}
                </span>
                <span className="text-[10px] text-purple-600 bg-purple-100 px-2 py-0.5 rounded font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  이 구성으로 적용
                </span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
