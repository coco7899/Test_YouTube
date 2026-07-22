import React from 'react';
import { Play, Search, BarChart2, Bell, Sparkles } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: () => void;
  visualStyle: 'Realistic Style' | '2D Animation' | '3D Character' | 'Minimalist';
  setVisualStyle: (style: 'Realistic Style' | '2D Animation' | '3D Character' | 'Minimalist') => void;
  isGenerating?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  visualStyle,
  setVisualStyle,
  isGenerating,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-40 shrink-0 px-6 flex justify-between items-center shadow-xs">
      {/* Left section: Logo & Search */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
            <Play className="w-5 h-5 text-red-600 fill-red-600" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-xl tracking-tight text-[#4800b2] font-['Montserrat']">
              Creator Hub AI
            </h1>
            <span className="text-[10px] text-gray-500 font-medium -mt-1">
              AI 크리에이터 기획 지원 플랫폼
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-100/80 rounded-full px-4 py-2 w-[420px] border border-gray-200/60 focus-within:border-[#6200ee] focus-within:bg-white transition-all shadow-inner">
          <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            className="bg-transparent border-none outline-hidden focus:outline-hidden text-sm text-gray-800 placeholder-gray-400 w-full"
            placeholder="트렌드 또는 주제 검색 (예: 1인 AI 대행사, 숏폼 알고리즘)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {searchQuery && (
            <button
              onClick={onSearchSubmit}
              disabled={isGenerating}
              className="text-xs font-bold text-[#6200ee] hover:bg-purple-50 px-2 py-1 rounded-full transition-colors shrink-0"
            >
              검색
            </button>
          )}
        </div>

        {/* Visual Style Selector */}
        <div className="flex items-center gap-2 bg-purple-50/80 px-3 py-1.5 rounded-xl border border-purple-200/60">
          <Sparkles className="w-4 h-4 text-[#6200ee]" />
          <select
            value={visualStyle}
            onChange={(e) => setVisualStyle(e.target.value as any)}
            className="bg-transparent border-none text-xs font-semibold text-[#4800b2] focus:outline-hidden cursor-pointer"
          >
            <option value="Realistic Style">Realistic Style</option>
            <option value="2D Animation">2D Animation</option>
            <option value="3D Character">3D Character</option>
            <option value="Minimalist">Minimalist</option>
          </select>
        </div>
      </div>

      {/* Right section: Live Trends, Notifications & Profile */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full border border-red-100 text-xs font-bold">
          <BarChart2 className="w-3.5 h-3.5 text-red-600" />
          <span>Live Trends</span>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative text-gray-600">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-gray-200 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-9 h-9 rounded-full bg-purple-100 text-[#4800b2] font-bold flex items-center justify-center overflow-hidden border border-purple-200">
            <span className="text-xs">김크</span>
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-gray-900 leading-tight">김크리에이터</p>
            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
              PRO PLAN
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
