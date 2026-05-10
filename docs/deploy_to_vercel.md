# GitHub + Vercel 배포 방법

## 1. 로컬에서 실행

```bash
npm install
npm run dev
```

브라우저에서 확인:

```text
http://localhost:5173
```

## 2. 배포 빌드 확인

```bash
npm run build
npm run preview
```

## 3. GitHub에 올리기

```bash
git init -b main
git add .
git commit -m "Initial vending machine project lab"
git remote add origin https://github.com/YOUR_ID/vending-machine-python-project-lab.git
git push -u origin main
```

## 4. Vercel에서 Import

Vercel Dashboard에서:

```text
Add New
→ Project
→ Import Git Repository
→ vending-machine-python-project-lab 선택
```

설정값:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Deploy를 누르면 배포됩니다.
