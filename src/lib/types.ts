/**
 * SafeRoute G - TypeScript Type Definitions
 */

export type RoutingMode = 'fast' | 'balanced' | 'heat_safe';

export interface Coordinate {
  lat: number;
  lon: number;
}

export interface RouteMetrics {
  distance_m: number;
  time_min: number;
  avg_utci: number;
  max_utci: number;
  heat_exposure_index: number;
  shade_coverage_pct: number;
  green_proximity_m: number;
  rest_stops_count: number;
}

export interface RouteGeometry {
  type: 'LineString';
  coordinates: [number, number][];
}

export interface RestStop {
  name: string;
  type: 'park' | 'shelter' | 'cooling_center';
  coordinate: Coordinate;
  distance_from_route_m: number;
}

export interface RouteResponse {
  mode: RoutingMode;
  geometry: RouteGeometry;
  metrics: RouteMetrics;
  rest_stops: RestStop[];
}

export interface RouteComparisonResponse {
  fast_route: RouteResponse;
  heat_safe_route: RouteResponse;
  improvement: {
    time_change_pct: number;
    distance_change_pct: number;
    heat_exposure_reduction_pct: number;
    utci_reduction: number;
    shade_increase_pct: number;
  };
}

export interface DemoRouteResponse extends RouteComparisonResponse {
  demo: boolean;
  mock?: boolean;
  origin: { name: string; lat: number; lon: number };
  destination: { name: string; lat: number; lon: number };
}

export interface RoutingModeOption {
  id: RoutingMode;
  name: string;
  name_en: string;
  description: string;
  icon: string;
}

export interface RouteRequest {
  origin: Coordinate;
  destination: Coordinate;
  mode: RoutingMode;
  vehicle?: 'motorcycle' | 'bicycle';
  include_rest_stops?: boolean;
}
