# Vending Machine Python Project Lab

학부 1학년 파이썬 미니 프로젝트인 **자판기 앱**을 학습하기 위한 React/Vite 앱입니다.

이 앱은 기존 Tkinter 자판기 코드를 다음 네 단계로 학습하게 합니다.

1. UX / Presentation Layer 이해
2. 기존 코드 역엔지니어링
3. 보일러플레이트 만들기
4. 소비자/관리자 실습용 함수 구현

## 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

## Vercel 배포

Vercel에서 이 GitHub 저장소를 Import하면 됩니다.

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## 폴더 구조

```text
vending-machine-python-project-lab/
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ styles.css
├─ docs/
│  ├─ vending_project_lab_guide.md
│  └─ deploy_to_vercel.md
├─ reference/
│  └─ original-python/
├─ assets/
│  └─ data/
├─ package.json
├─ vite.config.js
└─ index.html
```

## 수업 활용

- `UX Layer`: 학생이 먼저 화면을 이해합니다.
- `역엔지니어링`: 파일별 역할과 함수 호출 흐름을 봅니다.
- `보일러플레이트`: 빈 함수가 포함된 시작 코드를 복사합니다.
- `소비자 함수`: `handle_payment(app)`를 구현합니다.
- `관리자 함수`: `show_revenue_popup(root)`와 매출 계산 함수를 구현합니다.

## 원본 Python 코드

원본 참고 파일은 `reference/original-python/`에 포함되어 있습니다.
