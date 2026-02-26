// Performance utilities for optimizing React components

/**
 * Throttle function to limit how often a function can be called
 * @param func Function to throttle
 * @param delay Delay in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastRan: number = 0;

    return function (this: any, ...args: Parameters<T>) {
        const now = Date.now();

        if (now - lastRan >= delay) {
            func.apply(this, args);
            lastRan = now;
        } else {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastRan = Date.now();
            }, delay - (now - lastRan));
        }
    };
}

/**
 * Debounce function to delay execution until after a period of inactivity
 * @param func Function to debounce
 * @param delay Delay in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null = null;

    return function (this: any, ...args: Parameters<T>) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * Request idle callback polyfill for better performance
 */
export const requestIdleCallback =
    typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? window.requestIdleCallback
        : (cb: IdleRequestCallback) => setTimeout(cb, 1);

export const cancelIdleCallback =
    typeof window !== 'undefined' && 'cancelIdleCallback' in window
        ? window.cancelIdleCallback
        : (id: number) => clearTimeout(id);
