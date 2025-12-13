'use client';

/**
 * SafeRoute G - Route Finder Page
 *
 * Main page for route comparison and visualization
 */
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MetricsCard, { ImprovementCard } from '@/components/MetricsCard';
import { DemoRouteResponse } from '@/lib/types';
import { compareRoutes } from '@/lib/api';

// Dynamic import for Leaflet (SSR disabled)
const RouteMap = dynamic(() => import('@/components/RouteMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg">
      <div className="text-gray-500">지도 로딩 중...</div>
    </div>
  ),
});

// Predefined locations in Suwon area
const PRESET_LOCATIONS = [
  { name: '수원역', lat: 37.2657, lon: 127.0001 },
  { name: '영통구', lat: 37.2505, lon: 127.0736 },
  { name: '수원시청', lat: 37.2636, lon: 127.0286 },
  { name: '성균관대', lat: 37.2935, lon: 126.9768 },
  { name: '아주대', lat: 37.2814, lon: 127.0440 },
];

export default function RoutePage() {
  const [routeData, setRouteData] = useState<DemoRouteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFastRoute, setShowFastRoute] = useState(true);
  const [showSafeRoute, setShowSafeRoute] = useState(true);

  // Origin and destination coordinates
  const [origin, setOrigin] = useState({ lat: 37.2657, lon: 127.0001, name: '수원역' });
  const [destination, setDestination] = useState({ lat: 37.2505, lon: 127.0736, name: '영통구' });

  // Map click mode (which location to set on click)
  const [clickMode, setClickMode] = useState<'origin' | 'destination'>('origin');

  // Load initial demo route
  useEffect(() => {
    loadRoute();
  }, []);

  const loadRoute = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await compareRoutes(origin, destination);

      setRouteData({
        demo: false,
        origin: { name: origin.name, lat: origin.lat, lon: origin.lon },
        destination: { name: destination.name, lat: destination.lat, lon: destination.lon },
        ...data,
      });
    } catch (err) {
      console.error('Failed to load route:', err);
      setError('경로를 불러올 수 없습니다. 백엔드 서버를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handlePresetLocation = (preset: typeof PRESET_LOCATIONS[0]) => {
    if (clickMode === 'origin') {
      setOrigin(preset);
    } else {
      setDestination(preset);
    }
  };

  const handleMapClick = (lat: number, lon: number) => {
    const location = {
      lat,
      lon,
      name: `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
    };

    if (clickMode === 'origin') {
      setOrigin(location);
    } else {
      setDestination(location);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🛵</span>
            <div>
              <h1 className="text-2xl font-bold">SafeRoute G</h1>
              <p className="text-green-100">배달 라이더를 위한 열 스트레스 안전 경로</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Location Selection Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">📍 경로 설정</h2>

          {/* Click Mode Selector */}
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700 mb-3 font-medium">
              🖱️ 위치 선택 방법: <strong className="text-blue-700">프리셋 버튼 클릭</strong> 또는 <strong className="text-green-700">지도 클릭</strong>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setClickMode('origin')}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                  clickMode === 'origin'
                    ? 'bg-green-600 text-white shadow-md scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50'
                }`}
              >
                🟢 출발지 설정 중
              </button>
              <button
                onClick={() => setClickMode('destination')}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                  clickMode === 'destination'
                    ? 'bg-red-600 text-white shadow-md scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50'
                }`}
              >
                🔴 도착지 설정 중
              </button>
            </div>
          </div>

          {/* Current Selection Display */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-sm text-green-700 font-medium mb-1">🟢 출발지</div>
              <div className="text-lg font-bold text-green-900">{origin.name}</div>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-sm text-red-700 font-medium mb-1">🔴 도착지</div>
              <div className="text-lg font-bold text-red-900">{destination.name}</div>
            </div>
          </div>

          {/* Preset Location Buttons */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="text-sm text-gray-600 mb-3 font-medium">
              {clickMode === 'origin' ? '🟢 출발지' : '🔴 도착지'}를 선택하세요:
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_LOCATIONS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetLocation(preset)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    (clickMode === 'origin' && origin.name === preset.name) ||
                    (clickMode === 'destination' && destination.name === preset.name)
                      ? clickMode === 'origin'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-red-600 text-white shadow-md'
                      : 'bg-white border border-gray-300 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Find Route Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={loadRoute}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
            >
              {loading ? '경로 검색 중...' : '🔍 경로 찾기'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">❌ {error}</p>
          </div>
        )}

        {/* Route Info */}
        {routeData && (
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                  A
                </span>
                <span className="font-medium">{routeData.origin.name}</span>
              </div>
              <span className="text-gray-400">→</span>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                  B
                </span>
                <span className="font-medium">{routeData.destination.name}</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {routeData && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Map */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">🗺️ 경로 비교</h2>

              {/* Route Toggles */}
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFastRoute}
                    onChange={(e) => setShowFastRoute(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">
                    <span className="inline-block w-3 h-3 bg-red-500 rounded mr-1"></span>
                    빠른 경로
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSafeRoute}
                    onChange={(e) => setShowSafeRoute(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded mr-1"></span>
                    열안전 경로
                  </span>
                </label>
              </div>

              {/* Map */}
              <div className="h-96 lg:h-[500px]">
                {loading ? (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <div className="text-gray-500">로딩 중...</div>
                  </div>
                ) : routeData ? (
                  <RouteMap
                    fastRoute={routeData.fast_route.geometry.coordinates}
                    safeRoute={routeData.heat_safe_route.geometry.coordinates}
                    origin={routeData.origin}
                    destination={routeData.destination}
                    showFastRoute={showFastRoute}
                    showSafeRoute={showSafeRoute}
                    onMapClick={handleMapClick}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <div className="text-gray-500">경로를 검색해주세요</div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Metrics */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">📊 경로 분석</h2>

              {/* Fast Route Metrics */}
              <MetricsCard
                title="🚀 빠른 경로"
                metrics={routeData.fast_route.metrics}
                variant="fast"
              />

              {/* Heat-Safe Route Metrics */}
              <MetricsCard
                title="🌳 열안전 경로"
                metrics={routeData.heat_safe_route.metrics}
                variant="safe"
              />

              {/* Improvement Card */}
              <ImprovementCard improvement={routeData.improvement} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
