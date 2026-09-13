import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import { colors } from '@/constants/colors';
import { ICON_ACCENT_CIRCLE, LOGO_DUMBBELL, LOGO_RING, LOGO_VIEWBOX, LOGO_VIEWBOX_SIZE } from '@/constants/brand';

import { logoColors, TILE } from './Logo.styles';
import type { LogoProps } from './Logo.types';

const HALF = LOGO_VIEWBOX_SIZE / 2;

export function Logo({ size, withBackground, monoColor }: LogoProps) {
  const ring = monoColor ? colors[monoColor] : logoColors.ring;
  const dumbbell = monoColor ? colors[monoColor] : logoColors.dumbbell;
  const scale = withBackground ? TILE.markScale : 1;

  return (
    <Svg width={size} height={size} viewBox={LOGO_VIEWBOX} accessibilityRole="image">
      {withBackground ? (
        <>
          <Defs>
            <ClipPath id="logo-tile">
              <Rect x={-HALF} y={-HALF} width={LOGO_VIEWBOX_SIZE} height={LOGO_VIEWBOX_SIZE} rx={TILE.radius} />
            </ClipPath>
          </Defs>
          <G clipPath="url(#logo-tile)">
            <Rect x={-HALF} y={-HALF} width={LOGO_VIEWBOX_SIZE} height={LOGO_VIEWBOX_SIZE} fill={logoColors.tile} />
            <Circle
              cx={-HALF + LOGO_VIEWBOX_SIZE * ICON_ACCENT_CIRCLE.cx}
              cy={-HALF + LOGO_VIEWBOX_SIZE * ICON_ACCENT_CIRCLE.cy}
              r={LOGO_VIEWBOX_SIZE * ICON_ACCENT_CIRCLE.r}
              fill={logoColors.tileAccent}
            />
          </G>
        </>
      ) : null}
      <G scale={scale}>
        {LOGO_DUMBBELL.map((r, i) => (
          <Rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} rx={r.rx} fill={dumbbell} />
        ))}
        <Path d={LOGO_RING.path} fill="none" stroke={ring} strokeWidth={LOGO_RING.stroke} strokeLinecap="round" />
      </G>
    </Svg>
  );
}
