import confetti from 'canvas-confetti';

export const runConfetti = () => {
  confetti({
    particleCount: 700,
    spread: 100,
    origin: { y: 0.7 },
    zIndex: 9999,
  });
};
