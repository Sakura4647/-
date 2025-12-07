import React from 'react';
import { GameResult } from '../types';

interface ResultModalProps {
  result: GameResult;
  onRestart: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ result, onRestart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wood-900/60 backdrop-blur-sm fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden p-6 text-center relative">
        
        <div className="text-7xl mb-4 drop-shadow-md">💧</div>
        
        <div className="mb-4">
          <p className="text-wood-600 mb-1 font-bold tracking-wider text-lg">平衡結果</p>
          <p className="text-3xl font-black text-wood-900 tracking-wide">
            維持 <span className="text-water-main">{result.duration.toFixed(1)}</span> 秒
          </p>
        </div>

        <div className="bg-wood-50 p-4 rounded-xl border-2 border-wood-200 mb-4">
          <h3 className="text-2xl font-bold text-water-main mb-2 tracking-wider">
            {result.message}
          </h3>
          <p className="text-wood-700 text-base mb-3 font-medium tracking-wide">
            {result.subMessage}
          </p>
          <div className="flex justify-center items-center gap-1 text-wood-400 text-base font-bold bg-white py-2 rounded-lg border border-wood-100">
            <span>得分：</span>
            <span className="text-3xl text-wood-800">{result.score}</span>
            <span>分</span>
          </div>
        </div>
        
        <div className="text-left mb-6">
            <h4 className="text-base font-bold text-wood-500 mb-2 border-b border-wood-100 pb-1 tracking-wider">🏅 計分方式</h4>
            <div className="space-y-2 text-sm text-wood-700 tracking-wide">
                <div className="flex justify-between items-center whitespace-nowrap gap-2">
                    <span className="font-bold text-water-main">20秒以上</span>
                    <span className="font-bold">3分</span>
                    <span className="text-right flex-1 text-wood-500 overflow-hidden text-ellipsis">腎氣充盈，穩若靜水</span>
                </div>
                <div className="flex justify-between items-center whitespace-nowrap gap-2">
                    <span className="font-bold text-water-main">15–19 秒</span>
                    <span className="font-bold">2分</span>
                    <span className="text-right flex-1 text-wood-500 overflow-hidden text-ellipsis">腎氣不錯，靜中帶穩</span>
                </div>
                <div className="flex justify-between items-center whitespace-nowrap gap-2">
                    <span className="font-bold text-water-main">0–14 秒</span>
                    <span className="font-bold">1分</span>
                    <span className="text-right flex-1 text-wood-500 overflow-hidden text-ellipsis">腎氣偏弱，需多調養</span>
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={onRestart} 
            className="w-full font-bold rounded-lg transition-all duration-200 shadow-sm active:scale-95 flex items-center justify-center gap-2 bg-water-main hover:bg-water-dark text-white shadow-blue-200 px-6 py-2 text-lg tracking-widest"
          >
            再來一次
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
