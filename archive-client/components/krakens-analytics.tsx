'use client';

import Script from 'next/script';

export function KrakensAnalytics() {
    return (
        <Script
            src="https://krakens.nesohq.org/krakens.js"
            strategy="afterInteractive"
            onLoad={() => {
                // const projectId = process.env.NEXT_PUBLIC_KRAKENS_PROJECT_ID;
                const projectId = "hrd_c3a24d14aa184752400c472a145343928195b6b0300d28b48932e21233e845a0";
                if (typeof window !== 'undefined' && (window as any).Krakens && projectId) {
                    (window as any).Krakens.init(projectId);
                }
            }}
        />
    );
}
