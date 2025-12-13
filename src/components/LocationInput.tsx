'use client';

import { useState } from 'react';

interface LocationInputProps {
  label: string;
  defaultLat?: number;
  defaultLon?: number;
  onChange: (lat: number, lon: number) => void;
  placeholder?: string;
}

export default function LocationInput({
  label,
  defaultLat,
  defaultLon,
  onChange,
  placeholder = '위도, 경도 입력',
}: LocationInputProps) {
  const [lat, setLat] = useState(defaultLat?.toString() || '');
  const [lon, setLon] = useState(defaultLon?.toString() || '');

  const handleSubmit = () => {
    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);

    if (!isNaN(latNum) && !isNaN(lonNum)) {
      onChange(latNum, lonNum);
    } else {
      alert('올바른 좌표를 입력해주세요');
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        <input
          type="number"
          step="0.0001"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="위도 (예: 37.2657)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          step="0.0001"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          placeholder="경도 (예: 127.0001)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          설정
        </button>
      </div>
    </div>
  );
}
