'use client';

import Script from 'next/script';

export function KrakensAnalytics() {
    return (
        <>
            {/* Krakens Analytics */}
            <Script
                src="https://krakens.nesohq.org/krakens.js"
                strategy="afterInteractive"
            />
            <Script id="krakens-init" strategy="afterInteractive">
                {`Krakens.init('hrd_6f7e57b8d05b26e2f0801e0e0bd6437d5295eefbf93589defcb04df743f4a776');`}
            </Script>
        </>
    );
}
