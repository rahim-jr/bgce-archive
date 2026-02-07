'use client';

import Script from 'next/script';

export function KrakensAnalytics() {
    return (
        <Script
            src="https://krakens.nesohq.org/krakens.js"
            strategy="afterInteractive"
            onLoad={() => {
                if (typeof window !== 'undefined' && (window as any).Krakens) {
                    (window as any).Krakens.init('hrd_6f7e57b8d05b26e2f0801e0e0bd6437d5295eefbf93589defcb04df743f4a776');
                }
            }}
        />
    );
}
