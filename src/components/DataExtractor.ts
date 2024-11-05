import { DataPoint } from '../types/selfMap';

export const extractDataPoints = (data: Record<string, any>): DataPoint[] => {
  const points: DataPoint[] = [];

  const processObject = (obj: Record<string, any>, category: string) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'number' && value >= 0 && value <= 10) {
        points.push({
          category,
          label: key,
          value,
          details: obj
        });
      } else if (typeof value === 'object' && value !== null) {
        processObject(value, key);
      }
    });
  };

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      processObject(value, key);
    }
  });

  return points;
};