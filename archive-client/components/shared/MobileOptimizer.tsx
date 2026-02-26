"use client";

import { useEffect } from "react";

export function MobileOptimizer() {
    useEffect(() => {
        // Only run on mobile
        if (typeof window === 'undefined' || window.innerWidth > 768) return;

        // Selective optimization - keep UI elements working
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                /* Disable expensive backdrop blur */
                * {
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }
                
                /* Disable blur on backgrounds only */
                [class*="blur-"]:not(button):not(a):not([role="button"]) {
                    filter: none !important;
                }
                
                /* Remove shadows from large containers */
                div:not(button):not(a):not([role="button"]) {
                    box-shadow: none !important;
                }
                
                /* Remove text shadows */
                * {
                    text-shadow: none !important;
                }
                
                /* Disable decorative animations */
                [class*="animate-pulse"],
                [class*="animate-spin"]:not(svg) {
                    animation: none !important;
                }
                
                /* Only remove background gradients */
                .fixed[class*="bg-gradient"],
                .absolute[class*="bg-gradient"]:not(button):not(a) {
                    background-image: none !important;
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
