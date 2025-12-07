import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultModal from './components/ResultModal';
import RulesModal from './components/RulesModal';
import { GameStatus, GameResult } from './types';
import { MESSAGES } from './constants';

const App: React.FC = () => {
  const [status, setStatus] = useState<GameStatus>(GameStatus.START);
  const [showRules, setShowRules] = useState(false);
  const [result, setResult] = useState<GameResult | null>(null);

  const startGame = () => {
    setStatus(GameStatus.PLAYING);
    setResult(null);
  };

  const finishGame = (duration: number) => {
    // Score Logic
    let score = 0;
    let message = '';
    let subMessage = '';

    if (duration >= 20) {
      score = 3;
      message = MESSAGES.HIGH_SCORE.msg;
      subMessage = MESSAGES.HIGH_SCORE.sub;
    } else if (duration >= 15) {
      score = 2;
      message = MESSAGES.MID_SCORE.msg;
      subMessage = MESSAGES.MID_SCORE.sub;
    } else {
      score = 1;
      message = MESSAGES.LOW_SCORE.msg;
      subMessage = MESSAGES.LOW_SCORE.sub;
    }

    setResult({
      score,
      duration,
      message,
      subMessage,
    });
    setStatus(GameStatus.FINISHED);
  };

  const restartGame = () => {
    setStatus(GameStatus.START);
    setResult(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {status === GameStatus.START && (
        <StartScreen 
          onStart={startGame} 
          onShowRules={() => setShowRules(true)} 
        />
      )}

      {status === GameStatus.PLAYING && (
        <GameScreen 
          onFinish={finishGame} 
          onRestart={restartGame}
          onShowRules={() => setShowRules(true)}
        />
      )}

      {/* Result Modal is an overlay on top of GameScreen (or empty background if needed) */}
      {status === GameStatus.FINISHED && result && (
        <>
          {/* Keeping GameScreen in background (frozen) or just static bg? 
              Prompt says "Auto jump Result Modal", structure usually implies overlay.
              But if we unmount GameScreen, the visual is lost. 
              Let's re-render a static GameScreen or just overlay. 
              Since GameScreen has internal loop, unmounting is safer to stop loop.
          */}
           <div className="absolute inset-0 bg-wood-50 blur-sm"></div>
           <ResultModal result={result} onRestart={restartGame} />
        </>
      )}

      {showRules && (
        <RulesModal onClose={() => setShowRules(false)} />
      )}
    </div>
  );
};

export default App;
