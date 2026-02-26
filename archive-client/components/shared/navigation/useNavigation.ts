"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { throttle } from "@/lib/performance";
import { DropdownPosition } from "./types";

export function useNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [exploreOpen, setExploreOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [exploreCollapsed, setExploreCollapsed] = useState(true);
    const [resourcesCollapsed, setResourcesCollapsed] = useState(true);

    const [dropdownPositions, setDropdownPositions] = useState<{
        explore: DropdownPosition;
        resources: DropdownPosition;
        profile: DropdownPosition;
    }>({
        explore: { top: 0, left: 0 },
        resources: { top: 0, right: 0 },
        profile: { top: 0, right: 0 }
    });

    const pathname = usePathname();

    const exploreRef = useRef<HTMLButtonElement>(null);
    const resourcesRef = useRef<HTMLButtonElement>(null);
    const profileRef = useRef<HTMLButtonElement>(null);
    const exploreDropdownRef = useRef<HTMLDivElement>(null);
    const resourcesDropdownRef = useRef<HTMLDivElement>(null);
    const profileDropdownRef = useRef<HTMLDivElement>(null);

    // Handle scroll effect with throttling
    useEffect(() => {
        const handleScroll = throttle(() => {
            setScrolled(window.scrollY > 20);
        }, 100);

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                exploreDropdownRef.current &&
                !exploreDropdownRef.current.contains(event.target as Node) &&
                exploreRef.current &&
                !exploreRef.current.contains(event.target as Node)
            ) {
                setExploreOpen(false);
            }
            if (
                resourcesDropdownRef.current &&
                !resourcesDropdownRef.current.contains(event.target as Node) &&
                resourcesRef.current &&
                !resourcesRef.current.contains(event.target as Node)
            ) {
                setResourcesOpen(false);
            }
            if (
                profileDropdownRef.current &&
                !profileDropdownRef.current.contains(event.target as Node) &&
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Update dropdown positions only when they open
    const updateDropdownPosition = useCallback((
        ref: React.RefObject<HTMLButtonElement | null>,
        type: 'explore' | 'resources' | 'profile'
    ) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        if (type === 'explore') {
            setDropdownPositions(prev => ({
                ...prev,
                explore: { top: rect.bottom + 8, left: rect.left }
            }));
        } else if (type === 'resources') {
            setDropdownPositions(prev => ({
                ...prev,
                resources: { top: rect.bottom + 8, right: window.innerWidth - rect.right }
            }));
        } else {
            setDropdownPositions(prev => ({
                ...prev,
                profile: { top: rect.bottom + 8, right: window.innerWidth - rect.right }
            }));
        }
    }, []);

    // Update positions only when dropdowns open
    useEffect(() => {
        if (exploreOpen) updateDropdownPosition(exploreRef, 'explore');
    }, [exploreOpen, updateDropdownPosition]);

    useEffect(() => {
        if (resourcesOpen) updateDropdownPosition(resourcesRef, 'resources');
    }, [resourcesOpen, updateDropdownPosition]);

    useEffect(() => {
        if (profileOpen) updateDropdownPosition(profileRef, 'profile');
    }, [profileOpen, updateDropdownPosition]);

    // Check if current path matches a route (exact match only, no nested routes)
    const isActiveRoute = (href: string) => pathname === href;

    // Check if we're in explore section
    const isInExploreSection = pathname.startsWith("/explore/");

    // Check if we're in resources section
    const isInResourcesSection = pathname.startsWith("/resources/");

    const closeAllDropdowns = () => {
        setExploreOpen(false);
        setResourcesOpen(false);
        setProfileOpen(false);
    };

    return {
        // State
        mobileMenuOpen,
        exploreOpen,
        resourcesOpen,
        profileOpen,
        scrolled,
        exploreCollapsed,
        resourcesCollapsed,
        dropdownPositions,

        // Refs
        exploreRef,
        resourcesRef,
        profileRef,
        exploreDropdownRef,
        resourcesDropdownRef,
        profileDropdownRef,

        // Helpers
        isActiveRoute,
        isInExploreSection,
        isInResourcesSection,

        // Actions
        setMobileMenuOpen,
        setExploreOpen,
        setResourcesOpen,
        setProfileOpen,
        setExploreCollapsed,
        setResourcesCollapsed,
        closeAllDropdowns,
    };
}
