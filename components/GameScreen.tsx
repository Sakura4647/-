import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameStatus, TouchState } from '../types';
import { PHYSICS, GAME_DURATION_SEC } from '../constants';

interface GameScreenProps {
  onFinish: (duration: number) => void;
  onRestart: () => void;
  onShowRules: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onFinish, onRestart, onShowRules }) => {
  const [timeLeft, setTimeLeft] = useState(0); // Counting UP logic based on prompt requirement "Stand seconds"
  const [angle, setAngle] = useState(0);
  
  // Refs for physics loop to avoid re-renders
  const gameState = useRef<{
    angle: number;
    velocity: number;
    touch: TouchState;
    startTime: number;
    isRunning: boolean;
  }>({
    angle: 0,
    velocity: 0,
    touch: { left: false, right: false },
    startTime: Date.now(),
    isRunning: true,
  });

  const requestRef = useRef<number>(0);

  // Physics Loop
  const animate = useCallback(() => {
    if (!gameState.current.isRunning) return;

    const state = gameState.current;
    
    // 1. Time Update
    const now = Date.now();
    const elapsed = (now - state.startTime) / 1000;
    
    // Check Win Condition (Time limit)
    if (elapsed >= GAME_DURATION_SEC) {
      state.isRunning = false;
      onFinish(GAME_DURATION_SEC); // Win with max time
      return;
    }

    // 2. Physics Calculation
    // Add random noise (Instability)
    const noise = (Math.random() - 0.5) * PHYSICS.NOISE_STRENGTH;
    state.velocity += noise;

    // Add Gravity (Inverted Pendulum effect: falls faster as it tilts)
    // If angle is positive (right), gravity pulls more positive.
    state.velocity += state.angle * PHYSICS.GRAVITY_FACTOR;

    // User Input
    if (state.touch.left) {
      state.velocity -= PHYSICS.PUSH_FORCE;
    }
    if (state.touch.right) {
      state.velocity += PHYSICS.PUSH_FORCE;
    }

    // Apply Velocity
    state.angle += state.velocity;

    // Friction/Damping
    state.velocity *= PHYSICS.FRICTION;

    // 3. Check Fail Condition (Fall over)
    if (Math.abs(state.angle) > PHYSICS.MAX_ANGLE) {
      state.isRunning = false;
      onFinish(elapsed);
      return;
    }

    // Update React State for rendering (every frame might be too much, but for simple DOM it's fine)
    setAngle(state.angle);
    setTimeLeft(elapsed);

    requestRef.current = requestAnimationFrame(animate);
  }, [onFinish]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  // Touch Handlers
  const handleStart = (side: 'left' | 'right') => {
    if (!gameState.current.isRunning) return;
    if (side === 'left') gameState.current.touch.left = true;
    if (side === 'right') gameState.current.touch.right = true;
  };

  const handleEnd = (side: 'left' | 'right') => {
    if (side === 'left') gameState.current.touch.left = false;
    if (side === 'right') gameState.current.touch.right = false;
  };

  // Prevent default context menu on long press
  const preventContextMenu = (e: React.MouseEvent | React.TouchEvent) => {
    // e.preventDefault(); // Sometimes blocks click, handled via css touch-action: none
  };

  return (
    <div className="h-screen w-full relative overflow-hidden flex flex-col fade-in bg-white/30">
      
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur shadow-md border-b border-wood-200 h-16 px-4">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-between">
          {/* Timer */}
          <div className="flex items-center gap-2 w-1/3">
            <div className={`font-mono text-3xl font-bold flex items-center gap-2 ${timeLeft >= 15 ? 'text-water-dark' : 'text-wood-900'}`}>
              <span>⏳</span>
              <span>{timeLeft.toFixed(1)}</span>s
            </div>
          </div>
          {/* Title */}
          <div className="hidden md:block w-1/3 text-center text-wood-700 font-bold opacity-50 text-xl tracking-widest">
            水之定立
          </div>
          {/* Controls */}
          <div className="flex items-center justify-end gap-2 w-2/3 md:w-1/3">
            <button onClick={onShowRules} className="font-bold rounded-lg transition-all duration-200 shadow-sm active:scale-95 flex items-center justify-center border-2 border-wood-600 text-wood-800 hover:bg-wood-100 px-3 py-1 text-base tracking-wide">
              規則
            </button>
            <button onClick={onRestart} className="font-bold rounded-lg transition-all duration-200 shadow-sm active:scale-95 flex items-center justify-center bg-wood-600 hover:bg-wood-700 text-white px-3 py-1 text-base tracking-wide">
              重來
            </button>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 relative flex items-center justify-center">
        
        {/* Background Hint Lines (Optional) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <div className="w-0.5 h-full bg-wood-400"></div>
        </div>

        {/* The Water Drop */}
        <div 
          className="relative z-10 origin-bottom transition-transform duration-75 ease-linear will-change-transform"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          {/* Drop Shape */}
          <div className="w-32 h-44 water-drop rounded-[100%] rounded-tl-[5%] rounded-tr-[5%] rounded-bl-[40%] rounded-br-[40%] transform -translate-y-1/2 relative">
             {/* Glossy Highlight */}
             <div className="absolute top-4 left-4 w-8 h-12 bg-white rounded-full opacity-60 rotate-[20deg] blur-[2px]"></div>
             <div className="absolute top-8 left-3 w-4 h-6 bg-white rounded-full opacity-80 rotate-[15deg]"></div>
          </div>
        </div>

        {/* Baseline */}
        <div className="absolute bottom-1/4 left-0 right-0 h-1 bg-wood-300/50 w-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 right-0 flex justify-center pointer-events-none">
           <div className="w-32 h-2 bg-wood-400/30 rounded-full mt-2 filter blur-sm"></div>
        </div>

        {/* Instructions Hint */}
        <div className="absolute bottom-10 inset-x-0 text-center text-wood-400 text-sm font-bold opacity-50 pointer-events-none animate-pulse">
           &lt; 按壓左側 · 平衡 · 按壓右側 &gt;
        </div>

        {/* Touch Zones (Invisible Overlay) */}
        <div className="absolute inset-0 flex z-20">
          <div 
            className="flex-1 active:bg-black/5 transition-colors cursor-pointer"
            onMouseDown={() => handleStart('left')}
            onMouseUp={() => handleEnd('left')}
            onMouseLeave={() => handleEnd('left')}
            onTouchStart={(e) => { e.preventDefault(); handleStart('left'); }}
            onTouchEnd={(e) => { e.preventDefault(); handleEnd('left'); }}
            onContextMenu={preventContextMenu}
          ></div>
          <div 
            className="flex-1 active:bg-black/5 transition-colors cursor-pointer"
            onMouseDown={() => handleStart('right')}
            onMouseUp={() => handleEnd('right')}
            onMouseLeave={() => handleEnd('right')}
            onTouchStart={(e) => { e.preventDefault(); handleStart('right'); }}
            onTouchEnd={(e) => { e.preventDefault(); handleEnd('right'); }}
            onContextMenu={preventContextMenu}
          ></div>
        </div>

      </div>
    </div>
  );
};

export default GameScreen;
