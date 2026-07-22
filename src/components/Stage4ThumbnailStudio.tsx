import React, { useState } from 'react';
import { Image, Sparkles, Download, Check, Edit3, Eye } from 'lucide-react';
import { CreatorPlan, ThumbnailVariation } from '../types';

interface Stage4Props {
  plan: CreatorPlan;
  onSelectThumbnailStyle: (variation: ThumbnailVariation) => void;
  onShowToast: (msg: string) => void;
}

export const Stage4ThumbnailStudio: React.FC<Stage4Props> = ({
  plan,
  onSelectThumbnailStyle,
  onShowToast,
}) => {
  const selectedVar = plan.thumbnailVariations.find(v => v.id === plan.selectedThumbnailId) || plan.thumbnailVariations[0];

  const [topText, setTopText] = useState(selectedVar.overlayTop);
  const [bottomText, setBottomText] = useState(selectedVar.overlayBottom);
  const [activeStyle, setActiveStyle] = useState<string>(selectedVar.style);
  const [customImageUrl, setCustomImageUrl] = useState<string>(selectedVar.url);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Switch style or variation
  const handleSelectVariation = (v: ThumbnailVariation) => {
    onSelectThumbnailStyle(v);
    setTopText(v.overlayTop);
    setBottomText(v.overlayBottom);
    setActiveStyle(v.style);
    setCustomImageUrl(v.url);
    onShowToast(`썸네일 디자인 '${v.name}' 스타일이 적용되었습니다.`);
  };

  const handleDownloadThumbnail = () => {
    onShowToast('최종 썸네일 및 대본 패키지 다운로드가 완료되었습니다!');
  };

  return (
    <section className="w-[340px] xl:w-[370px] flex flex-col gap-4 shrink-0">
      {/* Stage Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 font-['Montserrat']">
          <Image className="w-4 h-4 text-[#6200ee]" />
          Thumbnail Studio
        </h2>
        <span className="text-[10px] font-bold tracking-wider text-gray-500 bg-gray-200/60 px-2 py-0.5 rounded">
          STAGE 4
        </span>
      </div>

      {/* Container */}
      <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-200/80 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-[#4800b2] uppercase tracking-wide">
            One-Click Render (썸네일 초안)
          </h3>
          <span className="text-[10px] font-bold text-[#006f64] bg-[#4af8e3]/20 px-2 py-0.5 rounded-full">
            실시간 미리보기
          </span>
        </div>

        {/* Live Canvas Render Preview */}
        <div className="relative group rounded-xl overflow-hidden border-2 border-[#6200ee] shadow-md aspect-video bg-gray-900 mb-3">
          <img
            src={customImageUrl}
            alt="Thumbnail preview"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Dynamic Overlays on top of Image */}
          <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none">
            {/* Top Badge Overlay */}
            <div
              className={`font-black text-lg px-2.5 py-1 w-max shadow-lg transform -rotate-1 transition-all ${
                activeStyle === 'High Contrast'
                  ? 'bg-red-600 text-white'
                  : activeStyle === 'Dark Impact'
                  ? 'bg-black text-yellow-300 border border-yellow-400'
                  : 'bg-white text-gray-900'
              }`}
            >
              {topText}
            </div>

            {/* Bottom Hook Overlay */}
            <div
              className={`font-black text-xl px-3 py-1 w-max self-end shadow-2xl transition-all ${
                activeStyle === 'High Contrast'
                  ? 'bg-white text-black'
                  : activeStyle === 'Dark Impact'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-[#6200ee] text-white'
              }`}
            >
              {bottomText}
            </div>
          </div>

          {/* Hover Preview Button */}
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white font-bold text-xs gap-1.5"
          >
            <Eye className="w-5 h-5" />
            <span>고화질 크게 보기</span>
          </button>
        </div>

        {/* Text Customizer inputs */}
        <div className="space-y-2 mb-3 bg-gray-50 p-2.5 rounded-xl border border-gray-200/60">
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-700">
            <span className="flex items-center gap-1">
              <Edit3 className="w-3 h-3 text-[#6200ee]" />
              후킹 문구 직접 편집
            </span>
            <span className="text-[10px] text-purple-600">실시간 반영</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] text-gray-500 font-bold block mb-0.5">상단 오버레이</label>
              <input
                type="text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="w-full text-xs font-bold p-1.5 bg-white border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#6200ee]"
              />
            </div>
            <div>
              <label className="text-[9px] text-gray-500 font-bold block mb-0.5">하단 오버레이</label>
              <input
                type="text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                className="w-full text-xs font-bold p-1.5 bg-white border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#6200ee]"
              />
            </div>
          </div>
        </div>

        {/* Style Preset Switches */}
        <div className="mb-3">
          <p className="text-[11px] font-bold text-gray-600 mb-1.5 uppercase">
            디자인 스타일 선택
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setActiveStyle('High Contrast')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                activeStyle === 'High Contrast'
                  ? 'border-2 border-[#6200ee] bg-purple-50 text-[#6200ee]'
                  : 'border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              High Contrast
            </button>
            <button
              onClick={() => setActiveStyle('Soft Minimal')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                activeStyle === 'Soft Minimal'
                  ? 'border-2 border-[#6200ee] bg-purple-50 text-[#6200ee]'
                  : 'border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Soft Minimal
            </button>
          </div>
        </div>

        {/* Variations Thumbnails List */}
        <div className="flex-1 overflow-y-auto max-h-[160px] pr-1 custom-scrollbar mb-3">
          <p className="text-[11px] font-bold text-gray-600 mb-1.5 uppercase">
            AI 추천 시안 선택
          </p>
          <div className="space-y-2">
            {plan.thumbnailVariations.map((v) => {
              const isSelected = selectedVar.id === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => handleSelectVariation(v)}
                  className={`p-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-purple-50 border-[#6200ee] ring-1 ring-[#6200ee]'
                      : 'bg-gray-50 border-gray-200 hover:bg-purple-50/40'
                  }`}
                >
                  <div className="w-16 aspect-video rounded-lg overflow-hidden bg-gray-200 shrink-0 border border-gray-300">
                    <img src={v.url} alt={v.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">{v.name}</p>
                    <p className="text-[10px] text-gray-500 font-semibold">{v.style}</p>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-[#6200ee] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Download Final Assets Button */}
        <button
          onClick={handleDownloadThumbnail}
          className="w-full py-3.5 bg-gradient-to-r from-[#6200ee] to-[#4800b2] hover:from-[#5300cd] hover:to-[#38008c] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs"
        >
          <Download className="w-4 h-4" />
          <span>최종 에셋 패키지 다운로드 & 확정</span>
        </button>
      </div>

      {/* High Quality Modal */}
      {isPreviewOpen && (
        <div
          onClick={() => setIsPreviewOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden max-w-xl w-full shadow-2xl border border-gray-200 p-4"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900 mb-3">
              <img src={customImageUrl} alt="High resolution preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none">
                <div className={`font-black text-2xl px-4 py-2 w-max shadow-2xl transform -rotate-1 ${
                  activeStyle === 'High Contrast' ? 'bg-red-600 text-white' : 'bg-white text-gray-900'
                }`}>
                  {topText}
                </div>
                <div className={`font-black text-3xl px-4 py-2 w-max self-end shadow-2xl ${
                  activeStyle === 'High Contrast' ? 'bg-white text-black' : 'bg-[#6200ee] text-white'
                }`}>
                  {bottomText}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-gray-900">{plan.recommendedTitle}</p>
                <p className="text-xs text-gray-500">스타일: {activeStyle}</p>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 bg-[#6200ee] text-white text-xs font-bold rounded-xl"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
