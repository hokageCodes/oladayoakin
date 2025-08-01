'use client';

import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc, setDoc, increment } from 'firebase/firestore';
import { FaGift } from 'react-icons/fa';
import { runConfetti } from '../utils/confetti';

const GiftIcon = () => {
  const [hasTapped, setHasTapped] = useState(false);
  const [total, setTotal] = useState(0);
  const [attention, setAttention] = useState(true);

  useEffect(() => {
    const tapped = localStorage.getItem('hasSentGift') === 'true';
    setHasTapped(tapped);

    const fetchCount = async () => {
      const docRef = doc(db, 'celebration', 'giftTaps');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setTotal(snap.data().count || 0);
      }
    };

    fetchCount();

    // Animate bounce once on load
    const timeout = setTimeout(() => setAttention(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  const handleTap = async () => {
    const docRef = doc(db, 'celebration', 'giftTaps');

    try {
      const snap = await getDoc(docRef);

      if (!snap.exists()) {
        const initialCount = hasTapped ? 0 : 1;
        await setDoc(docRef, { count: initialCount });
        setTotal(initialCount);
        setHasTapped(!hasTapped);
        localStorage.setItem('hasSentGift', !hasTapped ? 'true' : 'false');

        if (!hasTapped) runConfetti();
        return;
      }

      if (hasTapped) {
        await updateDoc(docRef, { count: increment(-1) });
        setTotal((prev) => prev - 1);
        setHasTapped(false);
        localStorage.removeItem('hasSentGift');
      } else {
        await updateDoc(docRef, { count: increment(1) });
        setTotal((prev) => prev + 1);
        setHasTapped(true);
        localStorage.setItem('hasSentGift', 'true');
        runConfetti();
      }
    } catch (error) {
      console.error('🔥 Firestore Gift Tap Error:', error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-center space-y-2">
      <button
        onClick={handleTap}
        className={`p-4 rounded-full shadow-lg transition ${
          hasTapped ? 'bg-pink-600' : 'bg-yellow-500'
        } ${attention ? 'animate-bounce' : ''}`}
        aria-label="Send a gift"
      >
        <FaGift className="text-white text-2xl" />
      </button>
      <span className="text-sm text-white">{total} Happy Days 🎉</span>
    </div>
  );
};

export default GiftIcon;
