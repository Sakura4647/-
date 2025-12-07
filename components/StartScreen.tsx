import React from 'react';

interface StartScreenProps {
  onStart: () => void;
  onShowRules: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 fade-in">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-2 border-wood-300 text-center">
        <div className="mb-6 animate-pulse">
          <span className="text-6xl drop-shadow-md">💧</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-black text-wood-900 mb-8 tracking-widest">
          水之定立，指尖穩勢
        </h1>

        <div className="bg-wood-50 p-6 rounded-xl border border-wood-200 text-left mb-8">
          <p className="text-wood-700 mb-4 font-bold tracking-wider text-lg">
            腎為先天之本，腎氣充盈則穩如靜水。
          </p>
          <p className="text-base text-wood-600 mb-6 leading-relaxed font-medium tracking-wide">
            水行對應臟腑為腎與膀胱，與骨骼、平衡與穩定有關。
          </p>
          
          <h2 className="text-xl font-bold text-wood-800 mb-3 border-b border-wood-300 pb-2 flex items-center gap-2 tracking-wider">
            <span>📜</span> 遊戲規則
          </h2>
          <ul class="space-y-3 text-wood-800 leading-relaxed text-base font-medium tracking-wide">
            <li className="flex items-start gap-2">
              <span className="font-bold text-water-main">①</span>
              <span>點按左右側，保持水滴的重心</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-water-main">②</span>
              <span>根據維持平衡的秒數計分</span>
            </li>
          </ul>
        </div>

        <button 
          onClick={onStart} 
          className="w-full font-bold rounded-lg transition-all duration-200 shadow-sm active:scale-95 flex items-center justify-center gap-2 bg-water-main hover:bg-water-dark text-white shadow-blue-200 px-8 py-3 text-2xl tracking-widest"
        >
          開始遊戲
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
