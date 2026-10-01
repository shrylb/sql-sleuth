import React from 'react';

interface AltoHeroIllustrationProps {
  className?: string;
}

export const AltoHeroIllustration: React.FC<AltoHeroIllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-[220px] sm:h-[260px] md:h-[300px] overflow-hidden rounded-2xl select-none ${className}`}>
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 800 320"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky Gradient: Sage dawn to pale cream sand */}
          <linearGradient id="altoSky" x1="400" y1="0" x2="400" y2="320" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#739281" />
            <stop offset="45%" stopColor="#8BA898" />
            <stop offset="80%" stopColor="#C4BDB0" />
            <stop offset="100%" stopColor="#D9D2C5" />
          </linearGradient>

          {/* Sun Glow */}
          <linearGradient id="sunGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E88255" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D97043" stopOpacity="0.6" />
          </linearGradient>

          {/* Database Cube Gradients */}
          <linearGradient id="cubeTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5EFE6" />
            <stop offset="100%" stopColor="#D9D2C5" />
          </linearGradient>
          <linearGradient id="cubeLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7F9F8E" />
            <stop offset="100%" stopColor="#4F6D61" />
          </linearGradient>
          <linearGradient id="cubeRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5F8073" />
            <stop offset="100%" stopColor="#3D564C" />
          </linearGradient>

          <linearGradient id="copperCubeTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FAD7C0" />
            <stop offset="100%" stopColor="#E88255" />
          </linearGradient>
          <linearGradient id="copperCubeLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D97043" />
            <stop offset="100%" stopColor="#B34B26" />
          </linearGradient>
          <linearGradient id="copperCubeRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C85A32" />
            <stop offset="100%" stopColor="#8C3516" />
          </linearGradient>

          {/* Soft Shadow Filter */}
          <filter id="cubeDropShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#1A2B23" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* 1. Sky Canvas */}
        <rect width="800" height="320" fill="url(#altoSky)" />

        {/* 2. Terracotta Alto Sun & Concentric Atmosphere Rings */}
        <circle cx="560" cy="110" r="110" fill="#E88255" opacity="0.08" />
        <circle cx="560" cy="110" r="75" fill="#E88255" opacity="0.15" />
        <circle cx="560" cy="110" r="46" fill="url(#sunGlow)" />
        <circle cx="560" cy="110" r="42" fill="#F4E8D3" opacity="0.3" />

        {/* 3. Distant Low-Poly Mountain Peaks (Back Layer) */}
        <g opacity="0.55">
          <polygon points="120,40 20,240 220,240" fill="#425E52" />
          <polygon points="120,40 220,240 180,240" fill="#364E43" />
          <polygon points="280,70 160,250 400,250" fill="#4F6D61" />
          <polygon points="280,70 400,250 340,250" fill="#3D564C" />
          <polygon points="460,90 360,260 560,260" fill="#5F8073" />
          <polygon points="460,90 560,260 510,260" fill="#425E52" />
          <polygon points="680,50 560,250 800,250" fill="#4F6D61" />
          <polygon points="680,50 800,250 740,250" fill="#384F45" />
        </g>

        {/* 4. Mid-Ground Faceted Mountain Ridges */}
        <g opacity="0.8">
          {/* Ridge Left */}
          <polygon points="0,170 110,130 220,200 130,280 0,260" fill="#3D564C" />
          <polygon points="110,130 250,90 340,190 220,200" fill="#4F6D61" />
          <polygon points="250,90 320,180 340,190" fill="#2E433A" />
          {/* Ridge Right */}
          <polygon points="500,210 610,120 720,180 640,280 470,270" fill="#4A685B" />
          <polygon points="610,120 720,180 800,140 800,270 700,280" fill="#385246" />
        </g>

        {/* 5. Floating Isometric Database Relational Cubes */}
        {/* Cube 1: Primary Table (Left - Emerald) */}
        <g filter="url(#cubeDropShadow)" transform="translate(180, 75)">
          {/* Top Face */}
          <polygon points="0,-16 28,0 0,16 -28,0" fill="url(#cubeTop)" />
          {/* Left Face */}
          <polygon points="-28,0 0,16 0,44 -28,28" fill="url(#cubeLeft)" />
          {/* Right Face */}
          <polygon points="0,16 28,0 28,28 0,44" fill="url(#cubeRight)" />
          {/* Engraved Schema Line details */}
          <line x1="-20" y1="9" x2="-8" y2="16" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
          <line x1="-20" y1="18" x2="-8" y2="25" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
          <line x1="8" y1="16" x2="20" y2="9" stroke="#A7C4B5" strokeWidth="1" opacity="0.7" />
          <line x1="8" y1="25" x2="20" y2="18" stroke="#A7C4B5" strokeWidth="1" opacity="0.7" />
          {/* PK Tag */}
          <text x="-16" y="3" fill="#D97043" fontSize="7" fontWeight="bold" fontFamily="monospace">PK</text>
        </g>

        {/* Relational Link dashed line between tables */}
        <path
          d="M 215,95 C 260,85 280,105 320,110"
          stroke="#E88255"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.8"
        />

        {/* Cube 2: Relational Foreign Key Table (Center - Terracotta Accent) */}
        <g filter="url(#cubeDropShadow)" transform="translate(340, 110)">
          {/* Top Face */}
          <polygon points="0,-20 34,0 0,20 -34,0" fill="url(#copperCubeTop)" />
          {/* Left Face */}
          <polygon points="-34,0 0,20 0,52 -34,32" fill="url(#copperCubeLeft)" />
          {/* Right Face */}
          <polygon points="0,20 34,0 34,32 0,52" fill="url(#copperCubeRight)" />
          {/* Engraved Database Schema lines */}
          <line x1="-24" y1="11" x2="-8" y2="21" stroke="#FCE8DC" strokeWidth="1.2" opacity="0.8" />
          <line x1="-24" y1="22" x2="-8" y2="32" stroke="#FCE8DC" strokeWidth="1.2" opacity="0.8" />
          <line x1="8" y1="21" x2="24" y2="11" stroke="#FCE8DC" strokeWidth="1.2" opacity="0.8" />
          <line x1="8" y1="32" x2="24" y2="22" stroke="#FCE8DC" strokeWidth="1.2" opacity="0.8" />
          {/* FK Tag */}
          <text x="-18" y="4" fill="#3D564C" fontSize="8" fontWeight="bold" fontFamily="monospace">FK</text>
        </g>

        {/* Cube 3: Small Query Aggregation Satellite Cube */}
        <g filter="url(#cubeDropShadow)" transform="translate(430, 75)">
          <polygon points="0,-12 20,0 0,12 -20,0" fill="url(#cubeTop)" />
          <polygon points="-20,0 0,12 0,32 -20,20" fill="url(#cubeLeft)" />
          <polygon points="0,12 20,0 20,20 0,32" fill="url(#cubeRight)" />
          <text x="-9" y="3" fill="#D97043" fontSize="6" fontWeight="bold" fontFamily="monospace">Σ</text>
        </g>

        {/* 6. Foreground Sand Dunes & Promontory Ridge */}
        <polygon points="0,220 180,180 380,240 520,200 680,250 800,210 800,320 0,320" fill="#AFA18B" />
        <polygon points="0,250 140,220 320,270 480,230 640,280 800,240 800,320 0,320" fill="#C2B6A2" />
        <polygon points="0,280 200,250 420,300 600,260 760,290 800,270 800,320 0,320" fill="#D9D2C5" />

        {/* 7. Detective Silhouette atop Dune Edge with Alto-Style Flowing Scarf */}
        <g transform="translate(485, 178)">
          {/* Soft Shadow */}
          <ellipse cx="6" cy="24" rx="14" ry="4" fill="#2E433A" opacity="0.4" />
          {/* Legs & Torso */}
          <polygon points="4,10 8,10 9,24 6,24" fill="#2C3E35" />
          <polygon points="1,10 5,10 3,24 0,24" fill="#1E2B25" />
          <polygon points="1,2 9,2 8,14 2,14" fill="#2C3E35" />
          {/* Head & Detective Hat Brim */}
          <polygon points="0,0 10,-2 12,0 8,3 0,2" fill="#1E2B25" />
          <circle cx="5" cy="0" r="3" fill="#2C3E35" />
          {/* Flowing Terracotta Scarf (Alto's Adventure Signature) */}
          <path
            d="M 2,4 Q -10,6 -18,2 T -32,5"
            stroke="#D97043"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 2,5 Q -8,9 -15,7 T -26,11"
            stroke="#E88255"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* 8. Subtle Geometric Birds / Data Packets Gliding in the Desert Wind */}
        <g stroke="#3D564C" strokeWidth="1.5" fill="none" opacity="0.6">
          <path d="M 290,50 L 296,53 L 302,50" />
          <path d="M 315,62 L 320,65 L 325,62" />
          <path d="M 640,70 L 646,73 L 652,70" />
        </g>
      </svg>
    </div>
  );
};
