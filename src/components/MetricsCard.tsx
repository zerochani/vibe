'use client';

/**
 * SafeRoute G - Route Metrics Card Component
 *
 * Displays route metrics with visual indicators
 */
import { RouteMetrics } from '@/lib/types';

interface MetricsCardProps {
  title: string;
  metrics: RouteMetrics;
  variant: 'fast' | 'safe';
  className?: string;
}

export default function MetricsCard({ title, metrics, variant, className = '' }: MetricsCardProps) {
  const borderColor = variant === 'fast' ? 'border-red-500' : 'border-green-500';
  const headerBg = variant === 'fast' ? 'bg-red-500' : 'bg-green-500';
  const icon = variant === 'fast' ? '🚀' : '🌳';

  const formatTime = (min: number) => {
    if (min < 60) return `${min.toFixed(1)}분`;
    const hours = Math.floor(min / 60);
    const mins = Math.round(min % 60);
    return `${hours}시간 ${mins}분`;
  };

  const formatDistance = (m: number) => {
    if (m < 1000) return `${Math.round(m)}m`;
    return `${(m / 1000).toFixed(1)}km`;
  };

  const getUtciColor = (utci: number) => {
    if (utci < 26) return 'text-green-600';
    if (utci < 32) return 'text-yellow-600';
    if (utci < 38) return 'text-orange-600';
    return 'text-red-600';
  };

  const getUtciLabel = (utci: number) => {
    if (utci < 26) return '쾌적';
    if (utci < 32) return '약간 더움';
    if (utci < 38) return '더움';
    return '매우 더움';
  };

  return (
    <div className={`rounded-lg border-2 ${borderColor} overflow-hidden ${className}`}>
      {/* Header */}
      <div className={`${headerBg} text-white px-4 py-2 flex items-center gap-2`}>
        <span className="text-xl">{icon}</span>
        <span className="font-bold">{title}</span>
      </div>

      {/* Metrics */}
      <div className="p-4 space-y-3 bg-white">
        {/* Time & Distance */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">소요 시간</span>
          <span className="font-bold text-lg">{formatTime(metrics.time_min)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">거리</span>
          <span className="font-semibold">{formatDistance(metrics.distance_m)}</span>
        </div>

        <hr className="border-gray-200" />

        {/* Heat Metrics */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">평균 체감온도</span>
          <div className="text-right">
            <span className={`font-bold text-lg ${getUtciColor(metrics.avg_utci)}`}>
              {metrics.avg_utci.toFixed(1)}°C
            </span>
            <span className={`ml-2 text-sm ${getUtciColor(metrics.avg_utci)}`}>
              ({getUtciLabel(metrics.avg_utci)})
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">최고 체감온도</span>
          <span className={`font-semibold ${getUtciColor(metrics.max_utci)}`}>
            {metrics.max_utci.toFixed(1)}°C
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">열 노출 지수</span>
          <span className="font-semibold">{metrics.heat_exposure_index.toFixed(1)}</span>
        </div>

        <hr className="border-gray-200" />

        {/* Shade & Green */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">그늘 구간</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${metrics.shade_coverage_pct}%` }}
              />
            </div>
            <span className="font-semibold">{metrics.shade_coverage_pct.toFixed(0)}%</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">휴식 거점</span>
          <span className="font-semibold">{metrics.rest_stops_count}개소</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Improvement Card - Shows difference between routes
 */
interface ImprovementCardProps {
  improvement: {
    time_change_pct: number;
    heat_exposure_reduction_pct: number;
    utci_reduction: number;
    shade_increase_pct: number;
  };
}

export function ImprovementCard({ improvement }: ImprovementCardProps) {
  const formatChange = (value: number, inverse = false) => {
    const isPositive = inverse ? value < 0 : value > 0;
    const color = isPositive ? 'text-green-600' : 'text-red-600';
    const prefix = value > 0 ? '+' : '';
    return <span className={`font-bold ${color}`}>{prefix}{value.toFixed(1)}%</span>;
  };

  return (
    <div className="rounded-lg border-2 border-blue-500 overflow-hidden">
      <div className="bg-blue-500 text-white px-4 py-2 flex items-center gap-2">
        <span className="text-xl">📊</span>
        <span className="font-bold">개선 효과</span>
      </div>

      <div className="p-4 space-y-3 bg-white">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">시간 변화</span>
          {formatChange(improvement.time_change_pct, true)}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">열 노출 감소</span>
          <span className="font-bold text-green-600">
            -{improvement.heat_exposure_reduction_pct.toFixed(1)}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">체감온도 감소</span>
          <span className="font-bold text-green-600">
            -{improvement.utci_reduction.toFixed(1)}°C
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">그늘 구간 증가</span>
          <span className="font-bold text-green-600">
            +{improvement.shade_increase_pct.toFixed(1)}%
          </span>
        </div>

        {/* Summary */}
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            <strong>💡 요약:</strong> {improvement.time_change_pct.toFixed(0)}% 더 걸리지만,
            열 노출은 {improvement.heat_exposure_reduction_pct.toFixed(0)}% 감소합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
