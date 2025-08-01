import confetti from 'canvas-confetti';

export const runConfetti = () => {
  confetti({
    particleCount: 180,
    spread: 90,
    origin: { y: 0.7 },
    zIndex: 9999,
  });
};
