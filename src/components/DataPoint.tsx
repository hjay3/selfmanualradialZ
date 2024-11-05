import React from 'react';
import { Point, DataPoint } from '../types/selfMap';

interface DataPointProps {
  point: DataPoint;
  position: Point;
  color: string;
}

export const DataPointComponent: React.FC<DataPointProps> = ({ point, position, color }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  
  // Calculate size based on proximity to center (value)
  // Values closer to 10 (center) will be larger
  const baseSize = 6;
  const sizeMultiplier = 1 + ((point.value / 10) * 1); // Scale from 1x to 2x
  const radius = baseSize * sizeMultiplier;

  return (
    <g transform={`translate(${position.x},${position.y})`}>
      <circle
        r={radius}
        fill={color}
        stroke="white"
        strokeWidth={2}
        className="transition-all duration-200 cursor-pointer hover:filter hover:brightness-110"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      {showTooltip && (
        <g transform="translate(10,-10)" className="tooltip">
          <rect
            x={0}
            y={0}
            width={160}
            height={80}
            rx={4}
            fill="white"
            stroke="#e2e8f0"
            className="shadow-lg"
          />
          <text x={8} y={20} className="text-sm font-semibold fill-gray-800">{point.label}</text>
          <text x={8} y={40} className="text-sm fill-gray-600">Category: {point.category}</text>
          <text x={8} y={60} className="text-sm fill-gray-600">Value: {point.value}/10</text>
        </g>
      )}
    </g>
  );
};