import { useMemo, useState } from 'react';
import { Text, View, type LayoutChangeEvent } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText } from 'react-native-svg';

import { chart } from '@/constants/charts';
import { metrics } from '@/constants/metrics';
import { fontFamily } from '@/constants/typography';
import { linear, nearestIndex, niceTicks } from '@/helpers/charts/scale';

import { ChartTooltip } from '../ChartTooltip';
import { styles } from './LineChart.styles';
import type { LineChartProps } from './LineChart.types';

const AXIS_FONT = 9;
const END_LABEL_FONT = 11;

export function LineChart({ points, height = metrics.chartHeight, formatY, formatX, emptyLabel, accessibilityLabel, zeroBased }: LineChartProps) {
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState<number | null>(null);

  const geometry = useMemo(() => {
    if (width === 0 || points.length === 0) return null;
    const ticks = niceTicks(points.map((p) => p.y), chart.yTicks, zeroBased);
    const plot = { left: chart.yAxisWidth, right: width - chart.rightPadding, top: chart.topPadding, bottom: height - chart.xAxisHeight };
    const xs = points.map((p) => p.x);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const sx = minX === maxX ? () => (plot.left + plot.right) / 2 : linear({ min: minX, max: maxX }, { min: plot.left, max: plot.right });
    const sy = linear({ min: ticks[0], max: ticks[ticks.length - 1] }, { min: plot.bottom, max: plot.top });
    const coords = points.map((p) => ({ x: sx(p.x), y: sy(p.y) }));
    const line = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x},${c.y}`).join(' ');
    const area = `${line} L${coords[coords.length - 1].x},${plot.bottom} L${coords[0].x},${plot.bottom} Z`;
    return { ticks, plot, sy, coords, line, area };
  }, [width, height, points, zeroBased]);

  if (points.length < 2) {
    return (
      <View style={[styles.wrap, styles.empty, { height }]} accessibilityLabel={accessibilityLabel}>
        <Text style={styles.emptyText}>{emptyLabel}</Text>
      </View>
    );
  }

  const handleTouch = (x: number) => {
    if (geometry) setActive(nearestIndex(geometry.coords.map((c) => c.x), x));
  };

  const last = geometry?.coords[geometry.coords.length - 1];
  const activeCoord = active !== null ? geometry?.coords[active] : undefined;
  const showMarkers = points.length <= chart.maxMarkers;

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
          <Svg width={width} height={height} style={styles.layer}>
            {geometry.ticks.map((tick) => (
              <Line key={`g${tick}`} x1={geometry.plot.left} x2={geometry.plot.right} y1={geometry.sy(tick)} y2={geometry.sy(tick)} stroke={chart.colors.grid} strokeWidth={chart.gridStroke} />
            ))}
            {geometry.ticks.map((tick) => (
              <SvgText key={`t${tick}`} x={geometry.plot.left - 6} y={geometry.sy(tick) + 3} fontSize={AXIS_FONT} fontFamily={fontFamily.monoBold} fill={chart.colors.axisText} textAnchor="end">
                {formatY(tick)}
              </SvgText>
            ))}
            <SvgText x={geometry.plot.left} y={height - 6} fontSize={AXIS_FONT} fontFamily={fontFamily.monoBold} fill={chart.colors.axisText}>
              {formatX(points[0].x)}
            </SvgText>
            <SvgText x={geometry.plot.right} y={height - 6} fontSize={AXIS_FONT} fontFamily={fontFamily.monoBold} fill={chart.colors.axisText} textAnchor="end">
              {formatX(points[points.length - 1].x)}
            </SvgText>
            <Path d={geometry.area} fill={chart.colors.area} fillOpacity={chart.areaOpacity} />
            <Path d={geometry.line} fill="none" stroke={chart.colors.line} strokeWidth={chart.lineStroke} strokeLinecap="round" strokeLinejoin="round" />
            {showMarkers &&
              geometry.coords.slice(0, -1).map((c, i) => (
                <Circle key={i} cx={c.x} cy={c.y} r={chart.markerRadius} fill={chart.colors.marker} stroke={chart.colors.ring} strokeWidth={chart.ringWidth} />
              ))}
            {last ? (
              <>
                <Circle cx={last.x} cy={last.y} r={chart.highlightRadius} fill={chart.colors.highlight} stroke={chart.colors.ring} strokeWidth={chart.ringWidth} />
                <SvgText x={last.x} y={Math.max(10, last.y - 11)} fontSize={END_LABEL_FONT} fontFamily={fontFamily.monoBold} fill={chart.colors.line} textAnchor="end">
                  {formatY(points[points.length - 1].y)}
                </SvgText>
              </>
            ) : null}
            {activeCoord ? (
              <>
                <Line x1={activeCoord.x} x2={activeCoord.x} y1={geometry.plot.top} y2={geometry.plot.bottom} stroke={chart.colors.crosshair} strokeWidth={chart.gridStroke} />
                <Circle cx={activeCoord.x} cy={activeCoord.y} r={chart.highlightRadius} fill={chart.colors.line} stroke={chart.colors.ring} strokeWidth={chart.ringWidth} />
              </>
            ) : null}
          </Svg>
          {activeCoord && active !== null ? (
            <ChartTooltip value={formatY(points[active].y)} label={formatX(points[active].x)} x={activeCoord.x} containerWidth={width} />
          ) : null}
        </>
      ) : null}
    </View>
  );
}
