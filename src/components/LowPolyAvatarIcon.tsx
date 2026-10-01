import React from 'react';

interface LowPolyAvatarIconProps {
  avatarId: string;
  className?: string;
  size?: number;
}

export const LowPolyAvatarIcon: React.FC<LowPolyAvatarIconProps> = ({
  avatarId,
  className = '',
  size = 40,
}) => {
  // Geometric low-poly styled SVG vector paths inspired by Alto's Adventure
  switch (avatarId) {
    case 'fox':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Base Head */}
          <polygon points="32,6 10,22 18,52 32,60 46,52 54,22" fill="#D97043" />
          {/* Ears */}
          <polygon points="10,22 18,2 26,18" fill="#C85A32" />
          <polygon points="18,6 18,18 12,20" fill="#F4E8D3" />
          <polygon points="54,22 46,2 38,18" fill="#B34B26" />
          <polygon points="46,6 46,18 52,20" fill="#F4E8D3" />
          {/* Facial Facets */}
          <polygon points="32,6 18,52 32,46" fill="#E88255" />
          <polygon points="32,6 46,52 32,46" fill="#C85A32" />
          <polygon points="32,46 18,52 32,60" fill="#F4E8D3" />
          <polygon points="32,46 46,52 32,60" fill="#E5D6BF" />
          {/* Eyes & Snout */}
          <polygon points="20,28 26,26 24,32" fill="#2C3E35" />
          <polygon points="44,28 38,26 40,32" fill="#1E2B25" />
          <polygon points="29,56 35,56 32,60" fill="#2C3E35" />
        </svg>
      );

    case 'owl':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Owl Body */}
          <polygon points="32,8 14,20 18,54 32,60 46,54 50,20" fill="#4F6D61" />
          <polygon points="32,8 14,20 32,32" fill="#5F8073" />
          <polygon points="32,8 50,20 32,32" fill="#3D564C" />
          {/* Eye Crests */}
          <polygon points="14,20 28,18 24,36 16,34" fill="#8BA898" />
          <polygon points="50,20 36,18 40,36 48,34" fill="#6B8A7A" />
          {/* Glowing Eyes */}
          <polygon points="20,26 26,24 24,30" fill="#D97043" />
          <polygon points="44,26 38,24 40,30" fill="#C85A32" />
          {/* Beak */}
          <polygon points="32,30 28,38 36,38" fill="#F2C94C" />
          <polygon points="32,44 28,38 36,38" fill="#E0B028" />
          {/* Breast Feathers */}
          <polygon points="32,44 24,54 32,58 40,54" fill="#D9D2C5" />
        </svg>
      );

    case 'wolf':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Wolf Head */}
          <polygon points="32,10 12,24 16,50 32,60 48,50 52,24" fill="#607274" />
          {/* Ears */}
          <polygon points="12,24 16,4 28,18" fill="#4A585A" />
          <polygon points="52,24 48,4 36,18" fill="#3B4648" />
          {/* Muzzle */}
          <polygon points="32,10 24,36 32,56" fill="#75888A" />
          <polygon points="32,10 40,36 32,56" fill="#4A585A" />
          {/* Cheeks */}
          <polygon points="12,24 24,36 16,50" fill="#B4B8B9" />
          <polygon points="52,24 40,36 48,50" fill="#9CA1A3" />
          {/* Eyes & Nose */}
          <polygon points="22,28 26,26 24,30" fill="#E8C547" />
          <polygon points="42,28 38,26 40,30" fill="#D4AF37" />
          <polygon points="30,54 34,54 32,58" fill="#1E2324" />
        </svg>
      );

    case 'falcon':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Falcon Crest */}
          <polygon points="32,6 16,18 20,48 32,58 44,48 48,18" fill="#38BDF8" />
          <polygon points="32,6 16,18 32,30" fill="#0284C7" />
          <polygon points="32,6 48,18 32,30" fill="#0369A1" />
          {/* Cheeks & Mask */}
          <polygon points="16,18 28,32 18,44" fill="#E0F2FE" />
          <polygon points="48,18 36,32 46,44" fill="#BAE6FD" />
          {/* Beak */}
          <polygon points="32,30 26,38 38,38" fill="#F59E0B" />
          <polygon points="32,46 28,38 36,38" fill="#D97706" />
        </svg>
      );

    case 'stag':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Antlers */}
          <polygon points="24,14 14,4 18,18" fill="#D9D2C5" />
          <polygon points="14,4 8,8 14,12" fill="#E8E2D7" />
          <polygon points="40,14 50,4 46,18" fill="#BDB5A6" />
          <polygon points="50,4 56,8 50,12" fill="#D9D2C5" />
          {/* Head */}
          <polygon points="32,16 18,26 22,50 32,58 42,50 46,26" fill="#8C7A6B" />
          <polygon points="32,16 22,50 32,54" fill="#A49283" />
          <polygon points="32,16 42,50 32,54" fill="#756557" />
          {/* Eyes */}
          <polygon points="24,32 28,30 26,34" fill="#2C241D" />
          <polygon points="40,32 36,30 38,34" fill="#1C1611" />
        </svg>
      );

    case 'lynx':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Tufted Ears */}
          <polygon points="14,18 10,2 24,16" fill="#A78BFA" />
          <polygon points="10,2 8,0 12,4" fill="#1E1B4B" />
          <polygon points="50,18 54,2 40,16" fill="#8B5CF6" />
          <polygon points="54,2 56,0 52,4" fill="#1E1B4B" />
          {/* Head */}
          <polygon points="32,12 14,24 18,52 32,58 46,52 50,24" fill="#7C3AED" />
          <polygon points="32,12 24,46 32,54" fill="#9333EA" />
          <polygon points="32,12 40,46 32,54" fill="#6B21A8" />
          {/* Tufted Cheeks */}
          <polygon points="14,24 24,36 10,40" fill="#DDD6FE" />
          <polygon points="50,24 40,36 54,40" fill="#C4B5FD" />
        </svg>
      );

    case 'bear':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Round Ears */}
          <polygon points="12,18 8,8 20,12" fill="#583E32" />
          <polygon points="52,18 56,8 44,12" fill="#442F26" />
          {/* Massive Skull */}
          <polygon points="32,10 14,22 16,52 32,60 48,52 50,22" fill="#583E32" />
          <polygon points="32,10 24,40 32,54" fill="#6E4E3F" />
          <polygon points="32,10 40,40 32,54" fill="#442F26" />
          {/* Muzzle */}
          <polygon points="26,38 38,38 32,56" fill="#C9A384" />
          <polygon points="30,42 34,42 32,46" fill="#1A120E" />
        </svg>
      );

    case 'detective':
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Low-Poly Fedora Hat */}
          <polygon points="10,22 54,22 46,12 18,12" fill="#3D564C" />
          <polygon points="18,12 46,12 40,4 24,4" fill="#2C3E37" />
          <polygon points="16,20 48,20 46,16 18,16" fill="#D97043" />
          {/* Face Facets */}
          <polygon points="18,22 46,22 40,54 32,60 24,54" fill="#E8DCC8" />
          <polygon points="32,22 24,54 32,60" fill="#F4EBD9" />
          <polygon points="32,22 40,54 32,60" fill="#D5C5AC" />
          {/* Cyber Optical Shades */}
          <polygon points="20,28 30,30 28,38 18,36" fill="#D97043" />
          <polygon points="44,28 34,30 36,38 46,36" fill="#C85A32" />
          <polygon points="28,30 36,30 34,32 30,32" fill="#8BA898" />
          {/* Collar */}
          <polygon points="20,54 32,60 28,64" fill="#3D564C" />
          <polygon points="44,54 32,60 36,64" fill="#2C3E37" />
        </svg>
      );
  }
};
