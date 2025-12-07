import React from 'react';

interface RulesModalProps {
  onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wood-900/60 backdrop-blur-sm fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden p-6 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-wood-400 hover:text-wood-700 transition-colors p-2 rounded-full hover:bg-wood-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-wood-700 mb-2 font-bold text-center tracking-wider text-lg">
          腎為先天之本，腎氣充盈則穩如靜水。
        </p>
        <p className="text-base text-wood-600 mb-6 leading-relaxed text-center font-medium tracking-wide">
          水行對應臟腑為腎與膀胱，與骨骼、平衡與穩定有關。
        </p>
        
        <h3 className="text-2xl font-bold text-center text-wood-800 mb-4 border-b border-wood-100 pb-3 tracking-widest">
          📜 遊戲規則
        </h3>
        
        <ul class="space-y-4 text-wood-800 font-medium tracking-wide">
          <li className="flex gap-2 text-base">
            <span className="font-bold text-water-main">①</span>
            <span>點按左右側，保持水滴的重心</span>
          </li>
          <li className="flex gap-2 text-base">
            <span className="font-bold text-water-main">②</span>
            <span>根據維持平衡的秒數計分</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RulesModal;
