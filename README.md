# SafeRoute G 🛵

[![Next.js](https://img.shields.io/badge/Next.js-15.3.6-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green)](https://fastapi.tiangolo.com/)
[![Built with Claude](https://img.shields.io/badge/Built_with-Claude_Sonnet_4.5-8A2BE2?logo=anthropic)](https://claude.ai)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**배달 라이더를 위한 열 스트레스 안전 경로 시스템**

SafeRoute G는 폭염 환경에서 일하는 배달 라이더의 열 스트레스를 최소화하는 경로 추천 시스템입니다. 경기도 기후데이터 플랫폼의 데이터와 OpenStreetMap을 활용하여, 시간과 열 환경을 동시에 고려한 최적 경로를 제공합니다.

## 🌐 Live Demo

- **웹사이트**: https://vibe-orpin-psi.vercel.app
- **경로 비교**: https://vibe-orpin-psi.vercel.app/route
- **API 문서**: https://saferoute-g-backend.onrender.com/docs

## 📊 주요 기능

### 1. 실시간 경로 비교
- **빠른 경로** (빨간 점선): 최단 시간 우선
- **열안전 경로** (초록 실선): 열 스트레스 최소화
- 시각적 비교를 통한 직관적 이해

### 2. 다양한 위치 선택 방법
- 프리셋 위치 버튼 (수원역, 영통구, 수원시청, 성균관대, 아주대)
- 지도 클릭으로 자유롭게 위치 선택
- 출발지/도착지 모드 전환

### 3. 상세 메트릭 제공
- 시간 & 거리
- 평균/최대 UTCI (Universal Thermal Climate Index)
- 그늘 비율
- 열 노출 지수
- 개선 효과 (%)

## 🎯 실제 개선 효과

### 수원역 → 영통구 경로 비교

| 항목 | 빠른 경로 | 열안전 경로 | 개선 효과 |
|------|-----------|-------------|-----------|
| **시간** | 14.16분 | 16.86분 | +2.7분 (+19%) |
| **거리** | 8,754m | 9,839m | +1.1km |
| **평균 UTCI** | 32.17°C | 31.50°C | **-0.67°C** ❄️ |
| **그늘 비율** | 32.6% | 38.5% | **+6%** 🌳 |

> **핵심 메시지**: 단 2.7분의 추가 시간으로 더 시원하고 안전한 경로 이용 가능!

## 🛠️ 기술 스택

### Frontend
- **Next.js 15.3.6** - React 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **Leaflet** - 지도 시각화
- **Axios** - API 통신
- **Vercel** - 배포

### Backend
- **FastAPI** - Python 웹 프레임워크
- **OSMnx** - OpenStreetMap 도로 네트워크
- **NetworkX** - 그래프 알고리즘 (Modified A*)
- **GeoPandas** - 지리 데이터 처리
- **Shapely** - 기하학적 연산
- **Render** - 배포

### 데이터 소스
- **경기도 기후데이터 플랫폼 API** - WFS 서비스 (녹지, 쉼터)
- **OpenStreetMap** - 도로 네트워크 (수원시)

## 🔬 핵심 알고리즘

### Modified A* 다중목표 경로 최적화

**비용 함수**:
```
TotalCost = α·Time + β·HeatStress + γ·SolarExposure - δ·GreenBonus - ε·ShadeBonus
```

**모드별 가중치**:

| 모드 | Time (α) | Heat (β) | Solar (γ) | Green (δ) | Shade (ε) |
|------|----------|----------|-----------|-----------|-----------|
| 🚀 Fast | 10.0 | 0.1 | 0.1 | 0.0 | 0.0 |
| ⚖️ Balanced | 1.0 | 1.5 | 1.0 | 1.0 | 1.0 |
| 🌳 Heat-Safe | 0.1 | 5.0 | 4.0 | 3.0 | 3.0 |

### 도로 타입별 열 환경

| 도로 타입 | UTCI | 그늘 비율 | 특징 |
|----------|------|-----------|------|
| 고속도로/간선도로 | 36°C | 10% | 가장 뜨거움 🔥 |
| 주요 도로 | 34°C | 20% | 뜨거움 |
| 중간 도로 | 32°C | 30% | 보통 |
| 주거지역 도로 | 30°C | 50% | 시원함 |
| 이면도로 | 29°C | 60% | 가장 시원함 ❄️ |

## 🚀 시작하기

### Prerequisites

- **Node.js 20+** (프론트엔드)
- **Python 3.11+** (백엔드)
- **경기도 기후 API 키** (선택사항)

### Frontend 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/zerochani/vibe.git
cd vibe

# 2. 의존성 설치
npm install

# 3. 환경변수 설정
cp .env.local.example .env.local
# .env.local 파일에서 백엔드 URL 설정

# 4. 개발 서버 실행
npm run dev
```

프론트엔드가 http://localhost:3000 에서 실행됩니다.

### Backend 설치 및 실행

```bash
# 1. 백엔드 저장소 클론
git clone https://github.com/zerochani/saferoute-g-backend.git
cd saferoute-g-backend

# 2. 가상환경 생성 및 활성화
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. 의존성 설치
pip install -r requirements.txt

# 4. 환경변수 설정
cp .env.example .env
# .env 파일에서 API 키 설정 (선택사항)

# 5. 서버 실행
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

백엔드가 http://localhost:8000 에서 실행됩니다.

## 📁 프로젝트 구조

### Frontend
```
vibe/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 메인 페이지
│   │   └── route/
│   │       └── page.tsx      # 경로 비교 페이지
│   ├── components/
│   │   ├── RouteMap.tsx      # Leaflet 지도 컴포넌트
│   │   └── MetricsCard.tsx   # 메트릭 표시 컴포넌트
│   └── lib/
│       ├── api.ts            # API 클라이언트
│       └── types.ts          # TypeScript 타입 정의
├── public/                   # 정적 파일
├── package.json
└── next.config.ts
```

### Backend
```
backend/
├── app/
│   ├── main.py              # FastAPI 앱
│   ├── core/
│   │   ├── config.py        # 설정
│   │   └── constants.py     # 가중치 프리셋
│   ├── services/
│   │   ├── routing_engine.py      # Modified A* 알고리즘
│   │   ├── osm_network.py         # OSM 네트워크 로더
│   │   └── climate_enrichment.py  # 기후 데이터 통합
│   ├── routers/
│   │   └── route.py         # 라우팅 API 엔드포인트
│   └── models/
│       └── schemas.py       # Pydantic 스키마
├── data/
│   └── processed/           # 캐시된 그래프 데이터
├── requirements.txt
└── railway.json
```

## 🔧 환경변수

### Frontend (.env.local)
```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://saferoute-g-backend.onrender.com

# For local development:
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```env
# 경기도 기후 API 키 (선택사항)
CLIMATE_API_KEY=your_api_key_here

# 대상 도시
TARGET_CITY=Suwon, Gyeonggi-do, South Korea

# CORS 설정
CORS_ORIGINS=*
```

## 📖 API 문서

### 주요 엔드포인트

#### `POST /api/route/compare`
빠른 경로와 열안전 경로를 비교합니다.

**Request**:
```json
{
  "origin": {
    "lat": 37.2657,
    "lon": 127.0001
  },
  "destination": {
    "lat": 37.2505,
    "lon": 127.0736
  },
  "mode": "balanced"
}
```

**Response**:
```json
{
  "fast_route": {
    "geometry": { "type": "LineString", "coordinates": [...] },
    "metrics": {
      "time_min": 14.16,
      "distance_m": 8754,
      "avg_utci": 32.17,
      "shade_coverage_pct": 32.6
    }
  },
  "heat_safe_route": {
    "geometry": { "type": "LineString", "coordinates": [...] },
    "metrics": {
      "time_min": 16.86,
      "distance_m": 9839,
      "avg_utci": 31.50,
      "shade_coverage_pct": 38.5
    }
  },
  "improvement": {
    "utci_reduction": 0.67,
    "heat_exposure_reduction_pct": 31.5,
    "shade_increase_pct": 6.0
  }
}
```

전체 API 문서는 https://saferoute-g-backend.onrender.com/docs 에서 확인할 수 있습니다.

## 🎨 스크린샷

### 메인 페이지
<p align="center">
  <img src="./스크린샷 2025-12-13 오후 3.18.46.png" width="85%" alt="Main Page Screenshot" />
</p>

### 경로 비교
![Route Comparison](docs/screenshot-route.png)

## 🚧 알려진 제한사항

1. **Render 무료 플랜 Cold Start**
   - 15분 비활성 시 슬립 모드
   - 첫 요청 시 30-60초 소요
   - 이후 요청은 정상 속도

2. **지역 제한**
   - 현재 수원시만 지원
   - OSM 그래프 로드 시간 고려

3. **실시간 기상 데이터 미지원**
   - 현재는 도로 타입 기반 정적 UTCI 값 사용
   - 향후 실시간 기상 API 연동 예정

## 🔮 향후 계획

- [ ] 실시간 기상 데이터 연동
- [ ] 사용자 맞춤형 경로 (열 민감도 설정)
- [ ] 경로 상 쉼터 추천
- [ ] 다른 도시 지원 확대
- [ ] 모바일 앱 개발
- [ ] GPS 기반 실시간 네비게이션

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. 이 저장소를 Fork 합니다
2. Feature 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👥 팀

**경기도 기후데이터 플랫폼 해커톤 2024**

- 프로젝트명: SafeRoute G
- 목표: 배달 라이더를 위한 기후적응형 네비게이션

## 📚 참고 자료

- [경기도 기후데이터 플랫폼](https://climate.gg.go.kr)
- [OpenStreetMap](https://www.openstreetmap.org)
- [OSMnx Documentation](https://osmnx.readthedocs.io/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤖 Claude AI Collaboration

이 프로젝트는 **Anthropic의 Claude Code (Sonnet 4.5)**를 활용하여 개발되었습니다.

### 주요 기여
- Modified A* 경로 최적화 알고리즘 설계 및 구현
- 전체 프론트엔드 & 백엔드 아키텍처 구축
- 도로 타입별 열 환경 차별화 로직
- Render + Vercel 배포 자동화
- 25개 세션, 총 3.8MB의 개발 히스토리

자세한 내용은 [CLAUDE_COLLABORATION.md](CLAUDE_COLLABORATION.md)를 참조하세요.

## 📧 문의

프로젝트에 대한 질문이나 제안이 있으시면 GitHub Issues를 통해 연락주세요.

---

**Built with ❤️ for delivery riders facing extreme heat**

**Powered by Claude Sonnet 4.5 🤖**
