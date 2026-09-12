import { useEffect, useMemo, useState } from 'react';
import { Text, View, type LayoutChangeEvent } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Line, Path, Rect, Text as SvgText } from 'react-native-svg';

import { animation } from '@/constants/animation';
import { chart } from '@/constants/charts';
import { metrics } from '@/constants/metrics';
import { fontFamily } from '@/constants/typography';
import { linear, nearestIndex, niceTicks, roundedTopBarPath } from '@/helpers/charts/scale';

import { ChartTooltip } from '../ChartTooltip';
import { styles } from './BarChart.styles';
import type { BarChartProps } from './BarChart.types';

export function BarChart({ bars, height = metrics.chartHeight, formatValue, accessibilityLabel, emptyLabel, highlightLast = true, target }: BarChartProps) {
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const grow = useSharedValue(0);

  const geometry = useMemo(() => {
    if (width === 0 || bars.length === 0) return null;
    const values = bars.map((b) => b.value).concat(target ? [target.max] : []);
    const ticks = niceTicks(values, chart.yTicks, true);
    const plot = { left: chart.yAxisWidth, right: width - chart.rightPadding, top: chart.topPadding, bottom: height - chart.xAxisHeight };
    const sy = linear({ min: 0, max: ticks[ticks.length - 1] }, { min: plot.bottom, max: plot.top });
    const slot = (plot.right - plot.left) / bars.length;
    const barWidth = Math.max(chart.barMinWidth, Math.min(chart.barMaxWidth, slot - chart.barGap * 4));
    const items = bars.map((bar, i) => {
      const cx = plot.left + slot * i + slot / 2;
      const top = sy(bar.value);
      return { cx, x: cx - barWidth / 2, top, heightPx: plot.bottom - top };
    });
    return { ticks, plot, sy, items, barWidth };
  }, [width, height, bars, target]);

  useEffect(() => {
    grow.value = 0;
    grow.value = withTiming(1, { duration: animation.chartReveal, easing: Easing.out(Easing.back(1.2)) });
  }, [bars, grow]);

  const growStyle = useAnimatedStyle(() => ({ transform: [{ scaleY: grow.value }] }));

  if (bars.length === 0 || bars.every((b) => b.value === 0)) {
    return (
      <View style={[styles.wrap, styles.empty, { height }]}>
        <Text style={styles.emptyText}>{emptyLabel}</Text>
      </View>
    );
  }

  const handleTouch = (x: number) => {
    if (geometry) setActive(nearestIndex(geometry.items.map((it) => it.cx), x));
  };

  const lastIndex = bars.length - 1;

  return (
    <View
      style={[styles.wrap, { height }]}
      onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderTerminationRequest={() => false}
      onResponderGrant={(e) => handleTouch(e.nativeEvent.locationX)}
      onResponderMove={(e) => handleTouch(e.nativeEvent.locationX)}
      onResponderRelease={() => setActive(null)}>
      {geometry ? (
        <>
          <Svg width={width} height={height} style={{ position: 'absolute' }}>
            {target ? (
              <Rect
                x={geometry.plot.left}
                width={geometry.plot.right - geometry.plot.left}
                y={geometry.sy(target.max)}
                height={geometry.sy(target.min) - geometry.sy(target.max)}
                fill={chart.colors.target}
                fillOpacity={chart.targetOpacity}
              />
            ) : null}
            {geometry.ticks.map((tick) => (
              <Line key={`g${tick}`} x1={geometry.plot.left} x2={geometry.plot.right} y1={geometry.sy(tick)} y2={geometry.sy(tick)} stroke={chart.colors.grid} strokeWidth={chart.gridStroke} />
            ))}
            {geometry.ticks.map((tick) => (
              <SvgText key={`t${tick}`} x={geometry.plot.left - 6} y={geometry.sy(tick) + 3} fontSize={9} fontFamily={fontFamily.monoBold} fill={chart.colors.axisText} textAnchor="end">
                {formatValue(tick)}
              </SvgText>
            ))}
            {geometry.items.map((item, i) => (
              <SvgText key={`l${bars[i].key}`} x={item.cx} y={height - 6} fontSize={9} fontFamily={fontFamily.monoBold} fill={chart.colors.axisText} textAnchor="middle">
                {bars[i].label}
              </SvgText>
            ))}
          </Svg>
          <Animated.View style={[styles.grow, growStyle]} pointerEvents="none">
            <Svg width={width} height={height}>
              {geometry.items.map((item, i) => {
                const strong = active === i || (active === null && highlightLast && i === lastIndex);
                return (
                  <Path
                    key={bars[i].key}
                    d={roundedTopBarPath(item.x, item.top, geometry.barWidth, item.heightPx, chart.barRadius)}
                    fill={strong ? chart.colors.barStrong : chart.colors.barMuted}
                  />
                );
              })}
              {highlightLast && active === null ? (
                <SvgText
                  x={geometry.items[lastIndex].cx}
                  y={Math.max(10, geometry.items[lastIndex].top - 6)}
                  fontSize={10}
                  fontFamily={fontFamily.monoBold}
                  fill={chart.colors.line}
                  textAnchor="middle">
                  {formatValue(bars[lastIndex].value)}
                </SvgText>
              ) : null}
            </Svg>
          </Animated.View>
          {active !== null ? (
            <ChartTooltip
              value={formatValue(bars[active].value)}
              label={bars[active].tooltipLabel ?? bars[active].label}
              x={geometry.items[active].cx}
              containerWidth={width}
            />
          ) : null}
        </>
      ) : null}
    </View>
  );
}
