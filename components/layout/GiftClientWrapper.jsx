'use client';

import dynamic from 'next/dynamic';

const GiftIcon = dynamic(() => import('../GiftIcon'), { ssr: false });

const GiftClientWrapper = () => {
  return <GiftIcon />;
};

export default GiftClientWrapper;
