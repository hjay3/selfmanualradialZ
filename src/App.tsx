import React, { useState } from 'react';
import SelfMapVisualization from './SelfMapVisualization';
import { formatJSON } from './utils/jsonFormatter';

export default function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [currentData, setCurrentData] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trim();
    setJsonInput(value);
    
    if (!value) {
      setCurrentData(null);
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(value);
      const formatted = formatJSON(parsed);
      setJsonInput(JSON.stringify(formatted, null, 2));
      setCurrentData(formatted);
      setError(null);
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Identity Map Visualizer</h1>
          <p className="text-gray-600">Visualize personal identity attributes in an interactive radial map</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-sm bg-white/90">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
            Input JSON Data
          </h2>
          <div className="space-y-4">
            <textarea
              value={jsonInput}
              onChange={handleJsonChange}
              className="w-full h-64 p-4 font-mono text-sm border rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                bg-gray-50 transition-all duration-200"
              placeholder="Paste your JSON here to visualize..."
            />
            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}
          </div>
        </div>
        
        {currentData && <SelfMapVisualization data={currentData} />}
      </div>
    </div>
  );
}