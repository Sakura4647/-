export const GAME_DURATION_SEC = 20;

export const PHYSICS = {
  GRAVITY_FACTOR: 0.15, // How much it wants to fall when tilted
  NOISE_STRENGTH: 0.08, // Random jitter intensity
  PUSH_FORCE: 0.4,      // User correction strength
  FRICTION: 0.96,       // Damping
  MAX_ANGLE: 45,        // Failure threshold in degrees
};

export const MESSAGES = {
  HIGH_SCORE: {
    msg: '腎氣充盈，穩若靜水',
    sub: '你維持得非常出色。',
  },
  MID_SCORE: {
    msg: '腎氣不錯，靜中帶穩',
    sub: '再多一點耐心，平衡會越來越穩。',
  },
  LOW_SCORE: {
    msg: '腎氣偏弱，需多調養',
    sub: '調整呼吸與專注，下一次會更好。',
  },
};
