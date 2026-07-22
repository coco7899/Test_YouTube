import React from 'react';
import { X, Brain, Zap, Target } from 'lucide-react';
import { CreatorPlan } from '../types';

interface PsychologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: CreatorPlan;
}

export const PsychologyModal: React.FC<PsychologyModalProps> = ({
  isOpen,
  onClose,
  plan,
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
            <div className="w-8 h-8 rounded-lg bg-[#006a60] text-white flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                시청자 심리 분석 (클릭 유발 트리거)
              </h3>
              <p className="text-xs text-gray-500">
                조회수가 폭발하는 심리적 기전을 분석한 결과입니다.
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
          {plan.psychologyTriggers.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-teal-50/60 border border-teal-100 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Target className="w-4 h-4 text-[#006a60]" />
                <span className="text-xs font-bold text-[#006f64]">
                  트리거 #{idx + 1}: {item.trigger}
                </span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                {item.reason}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
