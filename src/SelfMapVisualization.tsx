import React, { useMemo } from 'react';
import * as d3 from 'd3';
import { RadialGrid } from './components/RadialGrid';
import { DataPointComponent } from './components/DataPoint';
import { extractDataPoints } from './components/DataExtractor';
import { VisualizationProps, Point } from './types/selfMap';

const SelfMapVisualization: React.FC<VisualizationProps> = ({ 
  data,
  width = 800,
  height = 800
}) => {
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const radius = Math.min(width, height) / 2 - margin.top;

  const dataPoints = useMemo(() => extractDataPoints(data), [data]);

  const scales = useMemo(() => {
    const angleScale = d3.scaleLinear()
      .domain([0, dataPoints.length])
      .range([0, 2 * Math.PI]);

    const radiusScale = d3.scaleLinear()
      .domain([0, 10])
      .range([radius, 0]);

    const colorScale = d3.scaleOrdinal<string>()
      .domain(dataPoints.map(d => d.category))
      .range(d3.schemePaired);

    return { angleScale, radiusScale, colorScale };
  }, [dataPoints, radius]);

  const calculatePosition = (value: number, index: number): Point => {
    const angle = scales.angleScale(index);
    const distance = scales.radiusScale(value);
    return {
      x: distance * Math.cos(angle - Math.PI/2),
      y: distance * Math.sin(angle - Math.PI/2),
      angle,
      value
    };
  };

  if (!data || dataPoints.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Personal Identity Map</h2>
        <div className="text-sm text-gray-500">
          {dataPoints.length} attributes visualized
        </div>
      </div>
      
      <svg 
        width={width} 
        height={height}
        className="w-full h-full"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <g transform={`translate(${width/2},${height/2})`}>
          <RadialGrid radius={radius} radiusScale={scales.radiusScale} />
          
          {/* Connection lines */}
          {dataPoints.map((point, i) => {
            const pos = calculatePosition(point.value, i);
            return (
              <line
                key={`line-${point.category}-${point.label}`}
                x1={0}
                y1={0}
                x2={pos.x}
                y2={pos.y}
                stroke={scales.colorScale(point.category)}
                strokeWidth={1}
                opacity={0.2}
              />
            );
          })}
          
          {/* Data points */}
          {dataPoints.map((point, i) => (
            <DataPointComponent
              key={`${point.category}-${point.label}`}
              point={point}
              position={calculatePosition(point.value, i)}
              color={scales.colorScale(point.category)}
            />
          ))}

          {/* Labels */}
          {dataPoints.map((point, i) => {
            const angle = scales.angleScale(i);
            const labelRadius = radius + 20;
            const x = labelRadius * Math.cos(angle - Math.PI/2);
            const y = labelRadius * Math.sin(angle - Math.PI/2);
            const rotate = (angle * 180 / Math.PI) + (angle > Math.PI ? 180 : 0);

            return (
              <g key={`label-${point.category}-${point.label}`}>
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  transform={`rotate(${rotate},${x},${y})`}
                  className="text-sm fill-gray-600 font-medium"
                >
                  {point.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4">
        {Array.from(new Set(dataPoints.map(d => d.category))).map((category) => (
          <div key={category} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: scales.colorScale(category) }}
            />
            <span className="text-sm text-gray-600">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelfMapVisualization;