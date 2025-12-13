/**
 * SafeRoute G - Backend API Client
 */
import axios from 'axios';
import {
  RouteRequest,
  RouteResponse,
  RouteComparisonResponse,
  DemoRouteResponse,
  RoutingModeOption,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Find a route between two points
 */
export async function findRoute(request: RouteRequest): Promise<RouteResponse> {
  const response = await api.post('/api/route/find', request);
  return response.data;
}

/**
 * Compare fast route vs heat-safe route
 */
export async function compareRoutes(
  origin: { lat: number; lon: number },
  destination: { lat: number; lon: number }
): Promise<RouteComparisonResponse> {
  const response = await api.post('/api/route/compare', {
    origin,
    destination,
    mode: 'balanced',
  });
  return response.data;
}

/**
 * Get demo route comparison (for hackathon presentation)
 */
export async function getDemoRoute(): Promise<DemoRouteResponse> {
  const response = await api.get('/api/route/demo');
  return response.data;
}

/**
 * Get available routing modes
 */
export async function getRoutingModes(): Promise<{ modes: RoutingModeOption[] }> {
  const response = await api.get('/api/route/modes');
  return response.data;
}

/**
 * Check API health
 */
export async function checkHealth(): Promise<{ status: string }> {
  const response = await api.get('/health');
  return response.data;
}

/**
 * Mock data for when backend is not available
 */
export const MOCK_DEMO_RESPONSE: DemoRouteResponse = {
  demo: true,
  mock: true,
  origin: { name: '수원역', lat: 37.2657, lon: 127.0001 },
  destination: { name: '영통구', lat: 37.2505, lon: 127.0736 },
  fast_route: {
    mode: 'fast',
    geometry: {
      type: 'LineString',
      coordinates: [
        [127.0001, 37.2657],
        [127.015, 37.260],
        [127.035, 37.255],
        [127.055, 37.252],
        [127.0736, 37.2505],
      ],
    },
    metrics: {
      distance_m: 4200,
      time_min: 12.0,
      avg_utci: 35.2,
      max_utci: 38.6,
      heat_exposure_index: 422.4,
      shade_coverage_pct: 18.0,
      green_proximity_m: 120.0,
      rest_stops_count: 0,
    },
    rest_stops: [],
  },
  heat_safe_route: {
    mode: 'heat_safe',
    geometry: {
      type: 'LineString',
      coordinates: [
        [127.0001, 37.2657],
        [127.010, 37.262],
        [127.025, 37.258],
        [127.040, 37.255],
        [127.055, 37.253],
        [127.0736, 37.2505],
      ],
    },
    metrics: {
      distance_m: 4800,
      time_min: 14.0,
      avg_utci: 31.4,
      max_utci: 33.2,
      heat_exposure_index: 289.3,
      shade_coverage_pct: 52.0,
      green_proximity_m: 45.0,
      rest_stops_count: 2,
    },
    rest_stops: [],
  },
  improvement: {
    time_change_pct: 16.7,
    distance_change_pct: 14.3,
    heat_exposure_reduction_pct: 31.5,
    utci_reduction: 3.8,
    shade_increase_pct: 34.0,
  },
};
