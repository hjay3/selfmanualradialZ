export const formatJSON = (json: Record<string, any>): Record<string, any> => {
  // Sort object keys alphabetically
  const sortObject = (obj: Record<string, any>): Record<string, any> => {
    if (typeof obj !== 'object' || obj === null) return obj;
    
    if (Array.isArray(obj)) {
      return obj.map(sortObject);
    }
    
    return Object.keys(obj)
      .sort()
      .reduce((acc, key) => ({
        ...acc,
        [key]: sortObject(obj[key])
      }), {});
  };

  return sortObject(json);
};