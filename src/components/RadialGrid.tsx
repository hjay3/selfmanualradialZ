import React from 'react';
import * as d3 from 'd3';

interface RadialGridProps {
  radius: number;
  radiusScale: d3.ScaleLinear<number, number>;
}

export const RadialGrid: React.FC<RadialGridProps> = ({ radius, radiusScale }) => {
  const gridCircles = [2, 4, 6, 8, 10];
  const gridLines = d3.range(0, 360, 30);

  return (
    <g className="radial-grid">
      {/* Background circle */}
      <circle
        r={radius}
        fill="white"
        stroke="#e2e8f0"
        strokeWidth={2}
      />
      
      {/* Concentric circles */}
      {gridCircles.map((value) => (
        <circle
          key={value}
          r={radiusScale(value)}
          fill="none"
          stroke="#94a3b8"
          strokeWidth={1.5}
          strokeDasharray="4,4"
          className="opacity-50"
        />
      ))}

      {/* Radial lines */}
      {gridLines.map((angle) => (
        <line
          key={angle}
          x1={0}
          y1={0}
          x2={radius * Math.cos((angle * Math.PI) / 180)}
          y2={radius * Math.sin((angle * Math.PI) / 180)}
          stroke="#94a3b8"
          strokeWidth={1}
          strokeDasharray="4,4"
          className="opacity-30"
        />
      ))}

      {/* Value labels */}
      {gridCircles.map((value) => (
        <text
          key={`label-${value}`}
          x={5}
          y={-radiusScale(value)}
          className="text-xs fill-gray-400"
          textAnchor="start"
          alignmentBaseline="middle"
        >
          {value}
        </text>
      ))}
    </g>
  );
};