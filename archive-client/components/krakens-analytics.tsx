'use client';

import Script from 'next/script';

export function KrakensAnalytics() {
    return (
        <Script
            src="https://krakens.nesohq.org/krakens.js"
            strategy="afterInteractive"
            onLoad={() => {
                if (typeof window !== 'undefined' && (window as any).Krakens) {
                    (window as any).Krakens.init('hrd_c3a24d14aa184752400c472a145343928195b6b0300d28b48932e21233e845a0');
                }
            }}
        />
    );
}
