export interface Point {
  x: number;
  y: number;
  angle: number;
  value: number;
}

export interface DataPoint {
  category: string;
  label: string;
  value: number;
  details?: Record<string, any>;
}

export interface VisualizationProps {
  data: Record<string, any>;
  width?: number;
  height?: number;
}