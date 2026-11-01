import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Circle,
  Path,
  Rect,
  G,
  Defs,
  LinearGradient,
  Stop,
  Ellipse,
  Text as SvgText,
} from 'react-native-svg';

/**
 * TaskMindMascot with context-based emotional expressions.
 * Variants:
 *   studying, waving, happy, excited, encouraging, concerned,
 *   sleepy, proud, angry, celebrating
 */
export const TaskMindMascot = ({
  size = 180,
  showBackground = true,
  variant = 'studying',
  style,
}) => {
  const scale = size / 200;

  // Expression config per variant
  const expressions = {
    studying: { smile: 'smile', eyeStyle: 'normal', cheekOpacity: 0.3, extraElement: 'laptop' },
    waving: { smile: 'smile', eyeStyle: 'normal', cheekOpacity: 0.3, extraElement: 'wave' },
    happy: { smile: 'bigSmile', eyeStyle: 'happy', cheekOpacity: 0.4, extraElement: null },
    excited: { smile: 'bigSmile', eyeStyle: 'sparkle', cheekOpacity: 0.5, extraElement: 'stars' },
    encouraging: { smile: 'smile', eyeStyle: 'wink', cheekOpacity: 0.3, extraElement: 'thumbsup' },
    concerned: { smile: 'worried', eyeStyle: 'worried', cheekOpacity: 0.2, extraElement: null },
    sleepy: { smile: 'sleepy', eyeStyle: 'sleepy', cheekOpacity: 0.2, extraElement: 'zzz' },
    proud: { smile: 'bigSmile', eyeStyle: 'closed', cheekOpacity: 0.5, extraElement: 'sparkle' },
    angry: { smile: 'pout', eyeStyle: 'angry', cheekOpacity: 0.5, extraElement: 'steam' },
    celebrating: { smile: 'bigSmile', eyeStyle: 'sparkle', cheekOpacity: 0.5, extraElement: 'confetti' },
  };

  const expr = expressions[variant] || expressions.studying;

  const renderEyes = () => {
    switch (expr.eyeStyle) {
      case 'happy':
        return (
          <G>
            <Path d="M 78 94 Q 84 88 90 94" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" fill="none" />
            <Path d="M 110 94 Q 116 88 122 94" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" fill="none" />
          </G>
        );
      case 'sparkle':
        return (
          <G>
            <Circle cx="84" cy="94" r="6.5" fill="#1E1B4B" />
            <Circle cx="86" cy="91" r="2.8" fill="#FFFFFF" />
            <Circle cx="82" cy="96" r="1.5" fill="#FFFFFF" />
            <Circle cx="116" cy="94" r="6.5" fill="#1E1B4B" />
            <Circle cx="118" cy="91" r="2.8" fill="#FFFFFF" />
            <Circle cx="114" cy="96" r="1.5" fill="#FFFFFF" />
          </G>
        );
      case 'wink':
        return (
          <G>
            <Circle cx="84" cy="94" r="6" fill="#1E1B4B" />
            <Circle cx="86" cy="92" r="2.2" fill="#FFFFFF" />
            <Path d="M 110 94 Q 116 88 122 94" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" fill="none" />
          </G>
        );
      case 'worried':
        return (
          <G>
            <Circle cx="84" cy="96" r="6" fill="#1E1B4B" />
            <Circle cx="85" cy="94" r="2" fill="#FFFFFF" />
            <Circle cx="116" cy="96" r="6" fill="#1E1B4B" />
            <Circle cx="117" cy="94" r="2" fill="#FFFFFF" />
            {/* Worried / concerned eyebrows — tilted up towards center */}
            <Path d="M 76 90 Q 83 83 90 85" stroke="#7C1A04" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <Path d="M 124 90 Q 117 83 110 85" stroke="#7C1A04" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </G>
        );
      case 'sleepy':
        return (
          <G>
            <Path d="M 78 95 Q 84 98 90 95" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" fill="none" />
            <Path d="M 110 95 Q 116 98 122 95" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" fill="none" />
          </G>
        );
      case 'angry':
        return (
          <G>
            <Circle cx="84" cy="96" r="5.5" fill="#1E1B4B" />
            <Circle cx="86" cy="94" r="1.8" fill="#FFFFFF" />
            <Circle cx="116" cy="96" r="5.5" fill="#1E1B4B" />
            <Circle cx="118" cy="94" r="1.8" fill="#FFFFFF" />
            {/* Angry eyebrows - V shape */}
            <Path d="M 74 86 L 92 90" stroke="#7C1A04" strokeWidth="3" strokeLinecap="round" fill="none" />
            <Path d="M 126 86 L 108 90" stroke="#7C1A04" strokeWidth="3" strokeLinecap="round" fill="none" />
          </G>
        );
      case 'closed':
        return (
          <G>
            <Path d="M 78 94 Q 84 98 90 94" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" fill="none" />
            <Path d="M 110 94 Q 116 98 122 94" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" fill="none" />
          </G>
        );
      default:
        return (
          <G>
            <Circle cx="84" cy="94" r="6" fill="#1E1B4B" />
            <Circle cx="86" cy="92" r="2.2" fill="#FFFFFF" />
            <Circle cx="82.5" cy="95.5" r="1" fill="#FFFFFF" />
            <Circle cx="116" cy="94" r="6" fill="#1E1B4B" />
            <Circle cx="118" cy="92" r="2.2" fill="#FFFFFF" />
            <Circle cx="114.5" cy="95.5" r="1" fill="#FFFFFF" />
          </G>
        );
    }
  };

  const renderMouth = () => {
    switch (expr.smile) {
      case 'bigSmile':
        return (
          <Path
            d="M 90 103 Q 100 116 110 103"
            stroke="#7C1A04"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        );
      case 'worried':
        return (
          <Path
            d="M 92 110 Q 100 104 108 110"
            stroke="#7C1A04"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        );
      case 'sleepy':
        return (
          <Ellipse cx="100" cy="108" rx="5" ry="4" fill="#7C1A04" opacity="0.6" />
        );
      case 'pout':
        return (
          <G>
            <Path
              d="M 92 108 Q 100 104 108 108"
              stroke="#7C1A04"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </G>
        );
      default:
        return (
          <Path
            d="M 94 104 Q 100 112 106 104"
            stroke="#7C1A04"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        );
    }
  };

  const renderExtraElements = () => {
    switch (expr.extraElement) {
      case 'laptop':
        return (
          <G>
            <Rect x="70" y="150" width="60" height="24" rx="4" fill="url(#laptopGrad)" stroke="#C2410C" strokeWidth="1.5" />
            <Rect x="74" y="153" width="52" height="16" rx="2" fill="#FED7AA" />
            <Rect x="78" y="157" width="12" height="2.5" rx="1" fill="#EA580C" />
            <Rect x="78" y="162" width="18" height="2.5" rx="1" fill="#F97316" />
            <Circle cx="118" cy="161" r="3" fill="#3B82F6" />
            <Circle cx="68" cy="156" r="8" fill="#3B82F6" />
            <Circle cx="132" cy="156" r="8" fill="#3B82F6" />
          </G>
        );
      case 'wave':
        return (
          <G>
            <Circle cx="68" cy="150" r="8" fill="#3B82F6" />
            <Circle cx="140" cy="130" r="8" fill="#3B82F6" />
          </G>
        );
      case 'stars':
        return (
          <G>
            <Path d="M 38 70 L 40 65 L 42 70 L 47 70 L 43 73 L 44 78 L 40 75 L 36 78 L 37 73 L 33 70 Z" fill="#F59E0B" />
            <Path d="M 155 130 L 157 126 L 159 130 L 163 130 L 160 133 L 161 137 L 157 134 L 153 137 L 154 133 L 150 130 Z" fill="#F59E0B" />
            <Circle cx="68" cy="150" r="8" fill="#3B82F6" />
            <Circle cx="132" cy="150" r="8" fill="#3B82F6" />
          </G>
        );
      case 'thumbsup':
        return (
          <G>
            <Circle cx="68" cy="150" r="8" fill="#3B82F6" />
            <Circle cx="138" cy="135" r="9" fill="#3B82F6" />
            {/* Thumb */}
            <Path d="M 135 128 L 141 122" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" />
          </G>
        );
      case 'zzz':
        return (
          <G>
            <SvgText x="145" y="68" fontSize="14" fontWeight="900" fill="#8B5CF6" opacity="0.6">z</SvgText>
            <SvgText x="155" y="55" fontSize="11" fontWeight="900" fill="#8B5CF6" opacity="0.4">z</SvgText>
            <SvgText x="162" y="45" fontSize="8" fontWeight="900" fill="#8B5CF6" opacity="0.3">z</SvgText>
            <Circle cx="68" cy="155" r="8" fill="#3B82F6" />
            <Circle cx="132" cy="155" r="8" fill="#3B82F6" />
          </G>
        );
      case 'sparkle':
        return (
          <G>
            <Circle cx="38" cy="68" r="4" fill="#F59E0B" opacity="0.8" />
            <Circle cx="162" cy="72" r="3" fill="#F59E0B" opacity="0.6" />
            <Circle cx="155" cy="55" r="2.5" fill="#8B5CF6" opacity="0.5" />
            <Circle cx="68" cy="150" r="8" fill="#3B82F6" />
            <Circle cx="132" cy="150" r="8" fill="#3B82F6" />
          </G>
        );
      case 'steam':
        return (
          <G>
            {/* Steam puffs */}
            <Circle cx="55" cy="65" r="5" fill="#EF4444" opacity="0.3" />
            <Circle cx="48" cy="58" r="4" fill="#EF4444" opacity="0.25" />
            <Circle cx="145" cy="65" r="5" fill="#EF4444" opacity="0.3" />
            <Circle cx="152" cy="58" r="4" fill="#EF4444" opacity="0.25" />
            {/* Arms crossed */}
            <Circle cx="75" cy="150" r="8" fill="#3B82F6" />
            <Circle cx="125" cy="150" r="8" fill="#3B82F6" />
          </G>
        );
      case 'confetti':
        return (
          <G>
            {/* Confetti pieces */}
            <Rect x="30" y="50" width="6" height="3" rx="1.5" fill="#FF5B37" transform="rotate(30 33 51.5)" />
            <Rect x="160" y="60" width="6" height="3" rx="1.5" fill="#3B82F6" transform="rotate(-20 163 61.5)" />
            <Rect x="45" y="40" width="5" height="3" rx="1.5" fill="#F59E0B" transform="rotate(45 47.5 41.5)" />
            <Rect x="150" y="45" width="5" height="3" rx="1.5" fill="#10B981" transform="rotate(-40 152.5 46.5)" />
            <Circle cx="40" cy="75" r="2.5" fill="#8B5CF6" />
            <Circle cx="160" cy="80" r="2" fill="#FF5B37" />
            <Circle cx="55" cy="45" r="2" fill="#10B981" />
            <Circle cx="145" cy="40" r="2.5" fill="#F59E0B" />
            {/* Raised arms */}
            <Circle cx="60" cy="135" r="8" fill="#3B82F6" />
            <Circle cx="140" cy="135" r="8" fill="#3B82F6" />
          </G>
        );
      default:
        return (
          <G>
            <Circle cx="68" cy="150" r="8" fill="#3B82F6" />
            <Circle cx="132" cy="150" r="8" fill="#3B82F6" />
          </G>
        );
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="coralHeadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FF7A59" />
            <Stop offset="100%" stopColor="#FF522B" />
          </LinearGradient>
          <LinearGradient id="blueHoodieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#3B82F6" />
            <Stop offset="100%" stopColor="#1D4ED8" />
          </LinearGradient>
          <LinearGradient id="headphoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#60A5FA" />
            <Stop offset="100%" stopColor="#1E40AF" />
          </LinearGradient>
          <LinearGradient id="sandGroundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FDE68A" />
            <Stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
          </LinearGradient>
          <LinearGradient id="laptopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FB923C" />
            <Stop offset="100%" stopColor="#EA580C" />
          </LinearGradient>
        </Defs>

        {/* Background & Ground */}
        {showBackground && (
          <G>
            <Circle cx="160" cy="45" r="14" fill="#6EE7B7" opacity="0.3" />
            <Circle cx="35" cy="60" r="10" fill="#FDE047" opacity="0.4" />
            <Circle cx="175" cy="110" r="8" fill="#93C5FD" opacity="0.4" />
            <Ellipse cx="100" cy="182" rx="85" ry="16" fill="url(#sandGroundGrad)" />
            <Path d="M 28 175 C 25 155, 38 148, 42 165 C 44 175, 34 180, 28 175 Z" fill="#10B981" />
            <Path d="M 20 178 C 15 162, 26 158, 30 170 C 32 178, 25 182, 20 178 Z" fill="#34D399" />
            <Path d="M 172 175 C 175 155, 162 148, 158 165 C 156 175, 166 180, 172 175 Z" fill="#10B981" />
            <Path d="M 180 178 C 185 162, 174 158, 170 170 C 168 178, 175 182, 180 178 Z" fill="#34D399" />
          </G>
        )}

        {/* Character Group */}
        <G>
          {/* Blue Hoodie / Body */}
          <Path
            d="M 62 145 C 60 120, 140 120, 138 145 L 146 178 C 146 184, 54 184, 54 178 Z"
            fill="url(#blueHoodieGrad)"
          />
          <Path
            d="M 92 135 L 100 148 L 108 135"
            stroke="#93C5FD"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Headphone Band */}
          <Path
            d="M 52 92 C 50 48, 150 48, 148 92"
            stroke="#1E3A8A"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Sprout */}
          <G>
            <Path d="M 100 60 Q 100 48 98 42" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <Path d="M 98 42 C 84 38, 86 52, 98 46 Z" fill="#10B981" />
            <Path d="M 98 42 C 112 36, 114 50, 98 46 Z" fill="#34D399" />
          </G>

          {/* Head */}
          <Circle cx="100" cy="95" r="44" fill="url(#coralHeadGrad)" />

          {/* Earcups */}
          <Rect x="48" y="78" width="14" height="32" rx="7" fill="url(#headphoneGrad)" />
          <Rect x="52" y="82" width="6" height="24" rx="3" fill="#93C5FD" opacity="0.8" />
          <Rect x="138" y="78" width="14" height="32" rx="7" fill="url(#headphoneGrad)" />
          <Rect x="142" y="82" width="6" height="24" rx="3" fill="#93C5FD" opacity="0.8" />

          {/* Cheeks */}
          <Ellipse cx="78" cy="106" rx="7" ry="4" fill="#FF3B14" opacity={expr.cheekOpacity} />
          <Ellipse cx="122" cy="106" rx="7" ry="4" fill="#FF3B14" opacity={expr.cheekOpacity} />

          {/* Eyes (variant-based) */}
          {renderEyes()}

          {/* Mouth (variant-based) */}
          {renderMouth()}

          {/* Extra elements (variant-based) */}
          {renderExtraElements()}

          {/* Heart decoration */}
          {variant !== 'angry' && (
            <Path
              d="M 148 55 C 148 50, 155 50, 155 55 C 155 60, 148 64, 148 64 C 148 64, 141 60, 141 55 C 141 50, 148 50, 148 55 Z"
              fill="#F59E0B"
            />
          )}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TaskMindMascot;
