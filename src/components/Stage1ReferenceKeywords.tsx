import React, { useState } from 'react';
import { Compass, Globe, TrendingUp, ExternalLink, Play, ChevronRight, Filter } from 'lucide-react';
import { TrendKeyword, OverseasVideo } from '../types';

interface Stage1Props {
  trendKeywords: TrendKeyword[];
  overseasVideos: OverseasVideo[];
  selectedKeyword: string;
  onSelectKeyword: (keyword: TrendKeyword) => void;
  onSelectVideoTopic?: (topic: string) => void;
  timeframe: 'daily' | 'weekly' | 'monthly';
  setTimeframe: (tf: 'daily' | 'weekly' | 'monthly') => void;
  formatFilter: 'all' | 'short' | 'long';
  setFormatFilter: (ff: 'all' | 'short' | 'long') => void;
}

export const Stage1ReferenceKeywords: React.FC<Stage1Props> = ({
  trendKeywords,
  overseasVideos,
  selectedKeyword,
  onSelectKeyword,
  onSelectVideoTopic,
  timeframe,
  setTimeframe,
  formatFilter,
  setFormatFilter,
}) => {
  const [showMoreVideos, setShowMoreVideos] = useState(false);

  // Filter trend keywords
  const filteredKeywords = trendKeywords.filter((item) => {
    const matchesTimeframe = item.timeframe === timeframe;
    const matchesFormat = formatFilter === 'all' || item.category === formatFilter || item.category === 'all';
    return matchesTimeframe || matchesFormat;
  });

  const displayedVideos = showMoreVideos ? overseasVideos : overseasVideos.slice(0, 2);

  return (
    <section className="w-[360px] xl:w-[380px] flex flex-col gap-4 shrink-0">
      {/* Stage Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 font-['Montserrat']">
          <Compass className="w-4 h-4 text-[#6200ee]" />
          Reference & Keywords
        </h2>
        <span className="text-[10px] font-bold tracking-wider text-gray-500 bg-gray-200/60 px-2 py-0.5 rounded">
          STAGE 1
        </span>
      </div>

      {/* 해외 급상승 영상 Card */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-200/80 flex-1 flex flex-col min-h-[320px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-[#4800b2] uppercase tracking-wide flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            해외 급상승 영상 큐레이션
          </h3>
          <span className="text-[10px] text-[#006f64] bg-[#4af8e3]/20 px-2 py-0.5 rounded-full font-bold">
            벤치마킹
          </span>
        </div>

        <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1 custom-scrollbar flex-1">
          {displayedVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => window.open(video.youtubeUrl, '_blank')}
              className="group cursor-pointer p-2 rounded-xl hover:bg-purple-50/50 border border-transparent hover:border-purple-100 transition-all"
            >
              <div className="relative rounded-lg overflow-hidden aspect-video mb-1.5 bg-gray-100 shadow-xs">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                    <Play className="w-5 h-5 text-red-600 fill-red-600 ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
                <div className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                  {video.views} Views
                </div>
              </div>
              <p className="text-xs font-bold text-gray-900 line-clamp-1 group-hover:text-[#6200ee] transition-colors">
                {video.title}
              </p>
              <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                {video.summary}
              </p>
              <div className="flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-gray-100">
                <div className="flex items-center gap-1 text-[10px] text-purple-600 font-semibold">
                  <span>유튜브 사례 열기</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectVideoTopic) {
                      onSelectVideoTopic(video.title);
                    }
                  }}
                  className="px-2.5 py-1 bg-gradient-to-r from-[#6200ee] to-[#4800b2] hover:from-[#5300cd] hover:to-[#38008c] text-white text-[10px] font-bold rounded-lg shadow-xs transition-all hover:scale-105 active:scale-95 flex items-center gap-1 shrink-0"
                >
                  <span>조회할 키워드로 기획</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowMoreVideos(!showMoreVideos)}
          className="w-full mt-3 py-2 text-xs font-bold text-[#4800b2] border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors flex items-center justify-center gap-1"
        >
          <span>{showMoreVideos ? '접기' : '더 많은 해외 레퍼런스 보기'}</span>
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showMoreVideos ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* 실시간 트렌드 키워드 Card */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-200/80 flex-[1.2] flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-[#4800b2] uppercase tracking-wide flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-red-500" />
            실시간 트렌드 키워드
          </h3>

          {/* Timeframe selector */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-[10px] font-bold">
            <button
              onClick={() => setTimeframe('daily')}
              className={`px-2 py-0.5 rounded-md transition-all ${
                timeframe === 'daily'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              일간
            </button>
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-2 py-0.5 rounded-md transition-all ${
                timeframe === 'weekly'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              주간
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-2 py-0.5 rounded-md transition-all ${
                timeframe === 'monthly'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              월간
            </button>
          </div>
        </div>

        {/* Format Filter Chips */}
        <div className="flex items-center gap-1.5 mb-3 text-[11px]">
          <Filter className="w-3 h-3 text-gray-400" />
          <button
            onClick={() => setFormatFilter('all')}
            className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
              formatFilter === 'all'
                ? 'bg-[#6200ee] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setFormatFilter('short')}
            className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
              formatFilter === 'short'
                ? 'bg-[#6200ee] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            숏폼 특화
          </button>
          <button
            onClick={() => setFormatFilter('long')}
            className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
              formatFilter === 'long'
                ? 'bg-[#6200ee] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            롱폼
          </button>
        </div>

        {/* Keyword list */}
        <ul className="space-y-2 overflow-y-auto max-h-[220px] pr-1 custom-scrollbar">
          {filteredKeywords.map((item, idx) => {
            const isSelected = selectedKeyword === item.keyword;
            return (
              <li
                key={item.id}
                onClick={() => onSelectKeyword(item)}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-red-50/80 border-red-300 shadow-xs ring-1 ring-red-400'
                    : idx === 0
                    ? 'bg-red-50/30 border-red-200/60 hover:bg-red-50/60'
                    : 'bg-gray-50 border-gray-200/60 hover:bg-purple-50/50 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${
                      idx === 0
                        ? 'bg-red-500 text-white'
                        : idx === 1
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900">
                      {item.keyword}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">
                      {item.topic}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-xs font-black font-['Inter'] ${
                    idx === 0 ? 'text-red-600' : 'text-[#006f64]'
                  }`}
                >
                  {item.growth}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
