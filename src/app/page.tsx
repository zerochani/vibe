import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="text-6xl mb-4">🛵</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SafeRoute G
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            배달 라이더를 위한 열 스트레스 안전 경로 시스템
          </p>
          <p className="text-lg text-green-600 font-medium mb-8">
            Climate-Adaptive Mobility Navigation
          </p>

          <Link
            href="/route"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-full hover:bg-green-700 transition shadow-lg hover:shadow-xl"
          >
            🗺️ 경로 비교 시작하기
          </Link>
        </div>
      </div>

      {/* Problem Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            🔥 문제: 배달 라이더의 열 스트레스
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold mb-2">장시간 야외 노출</h3>
              <p className="text-gray-600">
                하루 6-10시간 야외에서 배달 업무 수행
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">🌡️</div>
              <h3 className="text-xl font-bold mb-2">폭염 취약</h3>
              <p className="text-gray-600">
                오토바이/자전거로 에어컨 없이 이동
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-2">경로 선택권 없음</h3>
              <p className="text-gray-600">
                기존 네비게이션은 열 환경 고려 없이 최단 경로만 제공
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            💡 솔루션: 열 환경 기반 경로 최적화
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold">기존: 빠른 경로</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• 최단 시간/거리 기준</li>
                <li>• 넓은 도로 선호 (그늘 없음)</li>
                <li>• 열 환경 고려 없음</li>
                <li className="text-red-600 font-medium">→ 열 노출 극대화</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-500">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌳</span>
                </div>
                <h3 className="text-xl font-bold text-green-700">SafeRoute G: 열안전 경로</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• UTCI(체감온도) 기반 비용 함수</li>
                <li>• 그늘/녹지 구간 보너스</li>
                <li>• 휴식 거점 추천</li>
                <li className="text-green-600 font-medium">→ 열 노출 30% 이상 감소</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            🔧 기술 스택
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl mb-2">📊</div>
              <div className="font-medium">경기도 기후 API</div>
              <div className="text-sm text-gray-400">UTCI, 녹지, 쉼터</div>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🗺️</div>
              <div className="font-medium">OpenStreetMap</div>
              <div className="text-sm text-gray-400">도로 네트워크</div>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-medium">Modified A*</div>
              <div className="text-sm text-gray-400">다중목표 최적화</div>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🖥️</div>
              <div className="font-medium">Next.js + FastAPI</div>
              <div className="text-sm text-gray-400">풀스택 구현</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 경로를 비교해보세요
          </h2>
          <p className="text-lg text-green-100 mb-8">
            2분의 추가 시간으로 열 노출을 30% 줄일 수 있습니다
          </p>
          <Link
            href="/route"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 text-lg font-semibold rounded-full hover:bg-gray-100 transition shadow-lg"
          >
            🛵 데모 보기
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>경기도 기후데이터 플랫폼 해커톤 2024</p>
        <p className="mt-1">SafeRoute G - 배달 라이더를 위한 기후적응형 내비게이션</p>
      </footer>
    </div>
  );
}
