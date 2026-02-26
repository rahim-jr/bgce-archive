"use client";

import { useEffect } from "react";

export function MobileOptimizer() {
    useEffect(() => {
        // Only run on mobile
        if (typeof window === 'undefined' || window.innerWidth > 768) return;

        // Force disable expensive CSS but keep scrolling working
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                * {
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                    filter: none !important;
                    box-shadow: none !important;
                    text-shadow: none !important;
                }
                *:hover {
                    transform: none !important;
                }
                [class*="bg-gradient"] {
                    background-image: none !important;
                }
                [class*="animate"] {
                    animation: none !important;
                }
            }
        `;
        document.head.appendChild(style);

        // Optimize scroll
        document.documentElement.style.scrollBehavior = 'auto';

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return null;
}
