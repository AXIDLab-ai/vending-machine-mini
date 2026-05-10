import React, { useMemo, useState } from 'react'
import {
  BookOpen,
  Boxes,
  Check,
  ChevronRight,
  Clipboard,
  Code2,
  Cog,
  Download,
  FileCode2,
  Home,
  Layers3,
  MonitorSmartphone,
  Play,
  ReceiptText,
  ShieldCheck,
  ShoppingCart,
  TerminalSquare,
  Wrench,
} from 'lucide-react'

const tabs = [
  { id: 'overview', label: '수업 안내', icon: Home },
  { id: 'method', label: '역엔지니어링 방법', icon: Layers3 },
  { id: 'week11', label: '11주차 GUI', icon: MonitorSmartphone },
  { id: 'week13', label: '13주차 소비자', icon: ShoppingCart },
  { id: 'week14', label: '14주차 관리자', icon: Cog },
  { id: 'boilerplate', label: '보일러플레이트', icon: FileCode2 },
  { id: 'practice', label: '함수 실습', icon: Wrench },
  { id: 'export', label: 'Export', icon: Download },
]

const weekPlan = [
  {
    week: '11주차',
    title: 'GUI 구조 이해와 화면 만들기',
    subtitle: 'Presentation Layer',
    goal: 'Tkinter 화면이 어떤 함수와 페이지 구조로 만들어지는지 이해한다.',
    output: 'home, select, payment, complete, admin 화면 구조 주석 달기',
    files: ['vendingmachineGUI.py', 'customer.py'],
    concepts: ['Tkinter', 'Frame', 'Label', 'Button', 'Entry', 'pack', '페이지 전환'],
  },
  {
    week: '13주차',
    title: '소비자 모드 구현하기',
    subtitle: 'Customer Logic',
    goal: '음료 선택, 금액 입력, 결제, 거스름돈, 거래 저장 흐름을 구현한다.',
    output: 'handle_payment(app) 완성',
    files: ['customer.py', 'assets/data/log.json'],
    concepts: ['조건문', '예외 처리', '딕셔너리', '리스트', 'JSON 저장', '함수 호출'],
  },
  {
    week: '14주차',
    title: '관리자 모드 구현하기',
    subtitle: 'Admin Logic',
    goal: '재고 확인, 가격 수정, 거래 내역 조회, 매출 계산을 구현한다.',
    output: 'show_revenue_popup(root), calculate_revenue_by_date 완성',
    files: ['admin.py', 'assets/data/beverage.json', 'assets/data/log.json'],
    concepts: ['반복문', '파일 읽기', '파일 쓰기', '집계', '함수 분리', '오류 처리'],
  },
]

const reverseSteps = [
  {
    title: '1. 구조 이해하기',
    desc: '먼저 코드를 고치지 않는다. 파일이 몇 개이고, 각 파일이 무슨 역할을 하는지 읽는다.',
    student: '파일 이름 옆에 “이 파일은 무엇을 담당하는가?”를 한 줄로 적는다.',
    example: 'vendingmachineGUI.py = 전체 앱을 조립하고 페이지를 바꾸는 파일',
  },
  {
    title: '2. 주석 달아보기',
    desc: '함수 위에 “입력, 처리, 출력”을 주석으로 단다. 모르는 코드는 지우지 않고 표시한다.',
    student: '각 함수에 # 입력, # 처리, # 결과 주석을 추가한다.',
    example: 'select_drink(app, index): 선택한 음료 번호를 저장하고 결제 화면으로 이동한다.',
  },
  {
    title: '3. 보일러플레이트에 흐름 주석 달기',
    desc: '완성 코드를 보기 전에 빈 함수가 있는 시작 코드에 실행 흐름을 먼저 적는다.',
    student: 'pass 위에 “여기서 무엇을 해야 하는가?”를 한국어 주석으로 쓴다.',
    example: '# 1) 투입 금액을 숫자로 바꾼다 → # 2) 가격과 비교한다 → # 3) 재고를 줄인다',
  },
  {
    title: '4. 작성하기',
    desc: '한 번에 전체 앱을 만들지 않는다. 한 함수씩 작성하고 바로 실행한다.',
    student: '오늘의 함수 하나만 완성한다. 안 되면 오류 메시지를 복사해 원인을 찾는다.',
    example: '11주차: 화면 전환 / 13주차: handle_payment / 14주차: show_revenue_popup',
  },
  {
    title: '5. 실행하고 디버깅하기',
    desc: '실행 결과가 예상과 다르면 print, messagebox, JSON 파일을 확인한다.',
    student: '오류 원인, 고친 내용, 배운 점을 실습 노트에 적는다.',
    example: 'ValueError: 숫자가 아닌 값을 int로 바꾸려 해서 발생',
  },
]

const screens = {
  home: {
    title: 'Home',
    goal: '앱 시작 화면. 시작하기 버튼은 음료 선택 화면으로, 설정 버튼은 관리자 로그인으로 이어진다.',
    widgets: ['Label: Vending Machine 제목', 'Image: 로고', 'Button: 시작하기', 'Button: 설정'],
    python: 'build_home_page(app)',
  },
  select: {
    title: 'Select',
    goal: '음료 목록을 보여주고 사용자가 하나를 선택하게 한다.',
    widgets: ['for 반복문', '음료명/가격 Label', '선택하기 Button', '홈으로 가기 Button'],
    python: 'build_select_page(app), select_drink(app, index)',
  },
  payment: {
    title: 'Payment',
    goal: '투입 금액을 입력하고 결제 여부를 판단한다.',
    widgets: ['Entry: 투입 금액', '1000/500/100/50/10원 Button', 'Text: 거스름돈', 'Button: 결제하기'],
    python: 'build_payment_page(app), handle_payment(app)',
  },
  admin: {
    title: 'Admin',
    goal: '관리자가 재고, 가격, 거래, 매출을 확인한다.',
    widgets: ['재고 현황 Button', '가격 수정 Button', '거래 내역 Button', '매출 현황 Button'],
    python: 'AdminPage, show_stock_popup, edit_prices_popup, show_transactions_popup, show_revenue_popup',
  },
}

const initialDrinks = [
  { name: '콜라', price: 1200, stock: 5 },
  { name: '사이다', price: 1100, stock: 4 },
  { name: '물', price: 800, stock: 8 },
  { name: '커피', price: 1500, stock: 3 },
]

const initialTransactions = [
  { time: '2026-05-10T09:10:00', item: '콜라', amount: 1200 },
  { time: '2026-05-10T09:18:00', item: '물', amount: 800 },
  { time: '2026-05-10T10:02:00', item: '커피', amount: 1500 },
  { time: '2026-05-09T16:22:00', item: '사이다', amount: 1100 },
]

const boilerplates = {
  week11: String.raw`# 11주차 GUI 보일러플레이트
# 목표: 화면을 만들고, 버튼을 눌렀을 때 페이지가 바뀌는 흐름을 이해한다.

import tkinter as tk

def build_home_page(app):
    frame = tk.Frame(app, bg="white")

    # TODO 1: 제목 Label 만들기
    # 힌트: tk.Label(frame, text="...", bg="white").pack()

    # TODO 2: 시작하기 Button 만들기
    # 힌트: command=lambda: app._show_page("select")

    # TODO 3: 설정 Button 만들기
    # 힌트: command=app._admin_login

    return frame

def build_select_page(app):
    frame = tk.Frame(app, bg="white")

    # TODO 1: "음료 선택하기" 제목 만들기

    # TODO 2: app.drinks를 반복문으로 돌며 음료 행 만들기
    # for idx, drink in enumerate(app.drinks):
    #     음료명과 가격을 Label로 표시
    #     선택하기 Button을 만들고 select_drink(app, idx) 연결

    # TODO 3: 홈으로 가기 Button 만들기

    return frame

def select_drink(app, index):
    # TODO 1: app.selected_index에 index 저장

    # TODO 2: 선택한 음료 가격을 payment_label에 표시

    # TODO 3: payment 화면으로 이동
    pass`,
  week13: String.raw`# 13주차 소비자 함수 보일러플레이트
# 목표: 결제 처리 흐름을 조건문과 예외 처리로 구현한다.

def handle_payment(app):
    # 1. 음료를 선택했는지 확인한다.
    # if app.selected_index < 0:
    #     오류 메시지
    #     return

    # 2. 선택한 음료 정보를 가져온다.
    # drink = app.drinks[app.selected_index]
    # name = drink["name"]
    # price = drink["price"]

    # 3. 투입 금액을 숫자로 바꾼다.
    # try:
    #     paid = int(app.money_entry.get())
    # except ValueError:
    #     오류 메시지
    #     return

    # 4. 재고가 있는지 확인한다.

    # 5. 금액이 충분한지 확인한다.

    # 6. 거스름돈을 계산한다.

    # 7. 재고를 1 줄인다.

    # 8. 거래 내역을 저장한다.

    # 9. 완료 화면으로 이동한다.
    pass`,
  week14: String.raw`# 14주차 관리자 함수 보일러플레이트
# 목표: 거래 내역을 읽고 날짜별 매출을 계산한다.

def calculate_revenue_by_date(transactions, target_date):
    # transactions는 거래 내역 리스트이다.
    # target_date는 "2026-05-10" 같은 문자열이다.

    total = 0

    # TODO 1: transactions를 반복한다.

    # TODO 2: 거래 시간의 앞 10글자가 target_date와 같으면 amount를 더한다.

    # TODO 3: total을 반환한다.
    return total

def show_revenue_popup(root):
    # TODO 1: log.json 파일 경로를 만든다.

    # TODO 2: 파일이 있으면 거래 내역을 읽는다.
    # 파일이 없으면 빈 리스트로 둔다.

    # TODO 3: 오늘 날짜의 매출을 계산한다.

    # TODO 4: Toplevel 팝업에 매출을 표시한다.
    pass`,
}

function cx(...items) {
  return items.filter(Boolean).join(' ')
}

function copyText(text) {
  if (navigator.clipboard) navigator.clipboard.writeText(text)
}

function makeChange(change) {
  const coins = [1000, 500, 100, 50, 10]
  let rest = Math.max(0, change)
  const result = []
  for (const coin of coins) {
    const count = Math.floor(rest / coin)
    if (count > 0) result.push({ coin, count })
    rest %= coin
  }
  return result
}

function Section({ title, description, children, actions }) {
  return (
    <section className="section">
      <div className="sectionHeader">
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {actions}
      </div>
      {children}
    </section>
  )
}

function Card({ title, children, icon: Icon }) {
  return (
    <div className="card">
      <div className="cardTitle">
        {Icon ? <span className="iconBox"><Icon size={18} /></span> : null}
        <h3>{title}</h3>
      </div>
      <div className="cardBody">{children}</div>
    </div>
  )
}

function Button({ children, onClick, variant = 'primary', disabled = false }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cx('button', variant)}>
      {children}
    </button>
  )
}

function CodeBlock({ title, code }) {
  return (
    <div className="codeBlock">
      <div className="codeHeader">
        <div><TerminalSquare size={16} /> {title}</div>
        <button type="button" onClick={() => copyText(code)}>복사</button>
      </div>
      <pre>{code}</pre>
    </div>
  )
}

function PhoneMockup({ screen, totalMoney, selectedDrink }) {
  const data = screens[screen]

  return (
    <div className="phone">
      <div className="phoneScreen">
        <div className="phoneTop">
          <span>VENDING</span>
          <strong>{data.title}</strong>
        </div>

        {screen === 'home' && (
          <div className="phoneCenter">
            <div>
              <div className="emojiLogo">🥤</div>
              <h3>Vending Machine<br />2025<br />TU Korea</h3>
              <p>경영학부 1학년 파이썬 미니 프로젝트</p>
            </div>
            <div className="phoneActions">
              <div className="phonePrimary">시작하기</div>
              <div className="phoneSecondary">설정</div>
            </div>
          </div>
        )}

        {screen === 'select' && (
          <div className="phoneContent">
            <h3>음료 선택하기</h3>
            <div className="drinkList">
              {initialDrinks.map((drink) => (
                <div key={drink.name} className="drinkRow">
                  <div>
                    <strong>{drink.name}</strong>
                    <span>{drink.price.toLocaleString()}원 · 재고 {drink.stock}</span>
                  </div>
                  <em>선택하기</em>
                </div>
              ))}
            </div>
            <div className="phoneSecondary">홈으로 가기</div>
          </div>
        )}

        {screen === 'payment' && (
          <div className="phoneContent">
            <h3>결제하기</h3>
            <p>선택 음료: {selectedDrink.name}</p>
            <div className="paymentPanel">
              <span>결제 금액</span>
              <strong>{selectedDrink.price.toLocaleString()}원</strong>
              <span>총 투입 금액</span>
              <b>{totalMoney.toLocaleString()}원</b>
            </div>
            <div className="coinGrid">
              {[1000, 500, 100, 50, 10].map((value) => <div key={value}>{value}원</div>)}
            </div>
            <div className="phoneSecondary">입력 초기화</div>
            <div className="changeBox">거스름돈 출력 영역</div>
            <div className="phonePrimary">결제하기</div>
          </div>
        )}

        {screen === 'admin' && (
          <div className="phoneContent">
            <h3>관리자 설정</h3>
            <p>비밀번호 1234 통과 후 진입</p>
            <div className="adminMenu">
              {['재고 현황', '가격 수정', '거래 내역', '매출 현황', '홈으로 가기'].map((label, index) => (
                <div key={label} className={index === 3 ? 'active' : ''}>{label}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function WeekCard({ item }) {
  return (
    <Card title={`${item.week} · ${item.title}`} icon={BookOpen}>
      <p className="role">{item.subtitle}</p>
      <p><strong>목표:</strong> {item.goal}</p>
      <p><strong>산출물:</strong> {item.output}</p>
      <p><strong>파일:</strong> {item.files.join(', ')}</p>
      <div className="conceptGrid">
        {item.concepts.map((concept) => <div key={concept}>{concept}</div>)}
      </div>
    </Card>
  )
}

function App() {
  const [active, setActive] = useState('overview')
  const [screen, setScreen] = useState('home')
  const [boilerplate, setBoilerplate] = useState('week11')
  const [selectedDrinkName, setSelectedDrinkName] = useState('콜라')
  const [money, setMoney] = useState(1500)
  const [stockInput, setStockInput] = useState(5)
  const [revenueDate, setRevenueDate] = useState('2026-05-10')

  const selectedDrink = initialDrinks.find((drink) => drink.name === selectedDrinkName) ?? initialDrinks[0]

  const paymentResult = useMemo(() => {
    if (stockInput <= 0) return { ok: false, message: '재고가 없습니다.', changeMap: [] }
    if (money < selectedDrink.price) return { ok: false, message: `금액이 부족합니다. ${selectedDrink.price - money}원이 더 필요합니다.`, changeMap: [] }

    const change = money - selectedDrink.price
    return { ok: true, message: `결제 완료. 거스름돈은 ${change.toLocaleString()}원입니다.`, changeMap: makeChange(change) }
  }, [money, selectedDrink, stockInput])

  const revenue = useMemo(() => {
    return initialTransactions
      .filter((tx) => tx.time.startsWith(revenueDate))
      .reduce((sum, tx) => sum + tx.amount, 0)
  }, [revenueDate])

  const week11Guide = String.raw`# 11주차 GUI 실습 순서

## 오늘의 목표
Tkinter 자판기 앱의 화면 구조를 이해하고, 화면 전환 흐름을 따라 만든다.

## 따라 하기
1. vendingmachineGUI.py를 열고 VendingMachineApp 클래스를 찾는다.
2. __init__에서 self.drinks, self.stock, self.pages가 무엇인지 주석을 단다.
3. _create_pages 함수가 어떤 화면을 만드는지 주석을 단다.
4. _show_page 함수가 왜 필요한지 주석을 단다.
5. customer.py에서 build_home_page, build_select_page, build_payment_page를 찾는다.
6. 각 함수 위에 “이 화면은 무엇을 보여주는가?”를 주석으로 쓴다.
7. 보일러플레이트에 주석으로 화면 흐름을 먼저 달고, 그 다음 코드를 작성한다.

## 제출
- 주석이 달린 vendingmachineGUI.py
- 주석이 달린 customer.py
- 실행 화면 캡처`

  const week13Guide = String.raw`# 13주차 소비자 모드 실습 순서

## 오늘의 목표
handle_payment(app)를 완성한다.

## 따라 하기
1. customer.py에서 handle_payment(app)를 찾는다.
2. 함수 안에 처리 순서를 한국어 주석으로 먼저 쓴다.
3. 선택 음료가 있는지 확인한다.
4. 투입 금액을 int로 바꾼다.
5. 재고가 있는지 확인한다.
6. 가격보다 금액이 충분한지 확인한다.
7. 거스름돈을 계산한다.
8. 재고를 1 줄인다.
9. save_transaction_to_file(app, transaction)을 호출한다.
10. complete 화면으로 이동한다.

## 테스트
- 음료 선택 없이 결제하면 오류가 나는가?
- 돈이 부족하면 부족 금액이 보이는가?
- 재고가 0이면 구매가 막히는가?
- 정상 결제하면 재고가 줄어드는가?
- log.json에 거래가 저장되는가?`

  const week14Guide = String.raw`# 14주차 관리자 모드 실습 순서

## 오늘의 목표
관리자 기능 중 매출 현황을 완성한다.

## 따라 하기
1. admin.py에서 show_revenue_popup(root)를 찾는다.
2. show_transactions_popup(root)가 log.json을 어떻게 읽는지 참고한다.
3. calculate_revenue_by_date(transactions, target_date) 함수를 새로 만든다.
4. 거래 시간의 앞 10글자와 target_date를 비교한다.
5. 날짜가 같으면 amount를 total에 더한다.
6. Toplevel 팝업에 오늘 매출을 표시한다.
7. 잘못된 파일 경로나 빈 거래 내역도 처리한다.

## 테스트
- 거래 내역이 없으면 0원이 나오는가?
- 2026-05-10 거래만 합산되는가?
- 다른 날짜 거래는 제외되는가?
- 팝업이 열리는가?`

  const exportGuide = String.raw`# 한국공학대학교 경영학부 1학년 파이썬 미니 프로젝트
## 자판기 앱 역엔지니어링 실습
### 강송희 교수 강의자료

## 수업 구성

### 11주차 GUI
- 목표: Presentation Layer 이해
- 파일: vendingmachineGUI.py, customer.py
- 산출물: 화면 구조 주석, 페이지 전환 흐름 설명, 기본 GUI 실행

### 13주차 소비자
- 목표: Customer Logic 구현
- 파일: customer.py
- 산출물: handle_payment(app) 완성
- 핵심 개념: 조건문, 예외 처리, 재고 차감, 거스름돈 계산, 거래 저장

### 14주차 관리자
- 목표: Admin Logic 구현
- 파일: admin.py
- 산출물: show_revenue_popup(root), calculate_revenue_by_date 완성
- 핵심 개념: JSON 읽기, 반복문, 날짜 필터링, 매출 집계

## 역엔지니어링 방법

1. 구조 이해하기
2. 주석 달아보기
3. 보일러플레이트에 흐름 주석 달기
4. 작성하기
5. 실행하고 디버깅하기`

  return (
    <div className="app">
      <div className="layout">
        <aside className="sidebar">
          <div className="brand">
            <div className="brandIcon"><Boxes size={28} /></div>
            <h1>Vending Machine Python Project Lab</h1>
            <p>한국공학대학교 경영학부 1학년 · 강송희 교수 강의자료</p>
          </div>

          <nav className="nav">
            {tabs.map((tab, index) => {
              const Icon = tab.icon
              return (
                <button key={tab.id} onClick={() => setActive(tab.id)} className={active === tab.id ? 'selected' : ''}>
                  <span><Icon size={16} /></span>
                  <b>{tab.label}</b>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                </button>
              )
            })}
          </nav>
        </aside>

        <main className="main">
          <header className="hero">
            <div>
              <p className="eyebrow">Korea Polytechnic University · Business Administration</p>
              <h1>자판기 앱을 3주에 걸쳐 그대로 따라 만드는 파이썬 미니 프로젝트</h1>
              <p>
                한국공학대학교 경영학부 1학년 대상 강의자료입니다. 기존 Tkinter 자판기 앱을 먼저 읽고,
                구조에 주석을 달고, 보일러플레이트에 흐름을 적은 뒤, GUI → 소비자 → 관리자 순서로 직접 구현합니다.
              </p>
            </div>
            <div className="heroActions">
              <Button variant="ghost" onClick={() => setActive('method')}><Play size={16} /> 학습법</Button>
              <Button onClick={() => setActive('week11')}><BookOpen size={16} /> 11주차 시작</Button>
            </div>

            <div className="mobileTabs">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActive(tab.id)} className={active === tab.id ? 'selected' : ''}>{tab.label}</button>
              ))}
            </div>
          </header>

          {active === 'overview' && (
            <Section title="수업 안내" description="이 앱은 완성 코드를 외우는 자료가 아니라, 기존 프로젝트를 읽고 단계별로 다시 만드는 학습 도구입니다.">
              <div className="grid three">
                {weekPlan.map((item) => <WeekCard key={item.week} item={item} />)}
              </div>
              <div className="note">
                <h3>경영학부 1학년에게 맞춘 운영 원칙</h3>
                <p>
                  처음부터 객체지향, 파일 입출력, 예외 처리를 이론으로 길게 설명하지 않습니다.
                  먼저 화면을 보고, 버튼을 눌러 보고, 그 버튼이 어떤 함수로 연결되는지 따라갑니다.
                  그 다음 한 함수씩 직접 완성합니다.
                </p>
              </div>
            </Section>
          )}

          {active === 'method' && (
            <Section title="역엔지니어링 방법" description="학생들이 코드를 무작정 따라 치지 않도록, 읽기 → 주석 → 흐름 정리 → 작성 → 디버깅 순서로 갑니다.">
              <div className="grid three">
                {reverseSteps.map((step) => (
                  <Card key={step.title} title={step.title} icon={Layers3}>
                    <p>{step.desc}</p>
                    <p><strong>학생 활동:</strong> {step.student}</p>
                    <p><strong>예시:</strong> {step.example}</p>
                  </Card>
                ))}
              </div>
            </Section>
          )}

          {active === 'week11' && (
            <Section title="11주차 GUI: 화면 구조와 페이지 전환" description="목표는 예쁜 화면을 만드는 것이 아니라, Tkinter 화면이 함수와 객체 상태로 어떻게 연결되는지 이해하는 것입니다.">
              <div className="split">
                <div>
                  <div className="pillRow">
                    {Object.keys(screens).map((key) => (
                      <Button key={key} variant={screen === key ? 'primary' : 'ghost'} onClick={() => setScreen(key)}>{screens[key].title}</Button>
                    ))}
                  </div>
                  <PhoneMockup screen={screen} totalMoney={money} selectedDrink={selectedDrink} />
                </div>
                <div className="stack">
                  <Card title={`${screens[screen].title} 화면 읽기`} icon={MonitorSmartphone}>
                    <p><strong>화면 목적:</strong> {screens[screen].goal}</p>
                    <p><strong>연결 함수:</strong> {screens[screen].python}</p>
                    <ul className="cleanList">
                      {screens[screen].widgets.map((item) => <li key={item}><Check size={16} /> <span>{item}</span></li>)}
                    </ul>
                  </Card>
                  <CodeBlock title="11주차 실습 안내" code={week11Guide} />
                </div>
              </div>
            </Section>
          )}

          {active === 'week13' && (
            <Section title="13주차 소비자: 결제 흐름 만들기" description="소비자 모드는 사용자가 돈을 넣고 음료를 사는 흐름입니다. 이 단계에서 조건문, 예외 처리, 재고 차감, 거래 저장을 배웁니다.">
              <div className="split equal">
                <div className="stack">
                  <Card title="결제 시뮬레이터" icon={ShoppingCart}>
                    <div className="formGrid">
                      <label>
                        <span>음료</span>
                        <select value={selectedDrinkName} onChange={(e) => setSelectedDrinkName(e.target.value)}>
                          {initialDrinks.map((drink) => <option key={drink.name}>{drink.name}</option>)}
                        </select>
                      </label>
                      <label>
                        <span>투입 금액</span>
                        <input value={money} onChange={(e) => setMoney(Number(e.target.value))} type="number" />
                      </label>
                      <label>
                        <span>재고</span>
                        <input value={stockInput} onChange={(e) => setStockInput(Number(e.target.value))} type="number" />
                      </label>
                    </div>
                    <div className={paymentResult.ok ? 'result ok' : 'result bad'}>
                      <strong>{paymentResult.ok ? '정상 결제 가능' : '결제 불가'}</strong>
                      <p>{paymentResult.message}</p>
                      <div className="coinResult">
                        {paymentResult.changeMap.map((item) => <span key={item.coin}>{item.coin}원 × {item.count}</span>)}
                      </div>
                    </div>
                  </Card>
                  <CodeBlock title="13주차 실습 안내" code={week13Guide} />
                </div>
                <CodeBlock title="13주차 보일러플레이트" code={boilerplates.week13} />
              </div>
            </Section>
          )}

          {active === 'week14' && (
            <Section title="14주차 관리자: 매출과 운영 관리" description="관리자 모드는 데이터를 읽고 집계하는 단계입니다. 학생은 거래 내역 JSON을 읽어 날짜별 매출을 계산합니다.">
              <div className="split equal">
                <div className="stack">
                  <Card title="매출 계산 시뮬레이터" icon={ReceiptText}>
                    <label className="field">
                      <span>날짜</span>
                      <input value={revenueDate} onChange={(e) => setRevenueDate(e.target.value)} />
                    </label>
                    <div className="metric">
                      <span>총 매출</span>
                      <strong>{revenue.toLocaleString()}원</strong>
                    </div>
                  </Card>
                  <CodeBlock title="14주차 실습 안내" code={week14Guide} />
                </div>
                <CodeBlock title="14주차 보일러플레이트" code={boilerplates.week14} />
              </div>
            </Section>
          )}

          {active === 'boilerplate' && (
            <Section title="보일러플레이트: 빈칸 코드부터 시작하기" description="완성 코드를 바로 주지 않습니다. 학생은 먼저 TODO 주석을 읽고, 흐름을 한국어로 더 적은 뒤, 코드를 작성합니다.">
              <div className="pillRow">
                <Button variant={boilerplate === 'week11' ? 'primary' : 'ghost'} onClick={() => setBoilerplate('week11')}>11주차 GUI</Button>
                <Button variant={boilerplate === 'week13' ? 'primary' : 'ghost'} onClick={() => setBoilerplate('week13')}>13주차 소비자</Button>
                <Button variant={boilerplate === 'week14' ? 'primary' : 'ghost'} onClick={() => setBoilerplate('week14')}>14주차 관리자</Button>
              </div>
              <CodeBlock title={`${boilerplate} boilerplate`} code={boilerplates[boilerplate]} />
            </Section>
          )}

          {active === 'practice' && (
            <Section title="함수 실습 체크리스트" description="각 주차마다 '읽기 → 주석 → 작성 → 실행 → 기록'을 반복합니다.">
              <div className="grid three">
                <Card title="11주차 GUI 체크" icon={MonitorSmartphone}>
                  <ul className="cleanList">
                    <li><Check size={16} /> VendingMachineApp 클래스에 주석을 달았다.</li>
                    <li><Check size={16} /> _create_pages 흐름을 설명할 수 있다.</li>
                    <li><Check size={16} /> _show_page가 왜 필요한지 말할 수 있다.</li>
                    <li><Check size={16} /> build_home_page를 따라 만들었다.</li>
                  </ul>
                </Card>
                <Card title="13주차 소비자 체크" icon={ShoppingCart}>
                  <ul className="cleanList">
                    <li><Check size={16} /> handle_payment 처리 순서를 주석으로 썼다.</li>
                    <li><Check size={16} /> 금액 부족을 처리했다.</li>
                    <li><Check size={16} /> 재고 부족을 처리했다.</li>
                    <li><Check size={16} /> 거래 내역 저장을 호출했다.</li>
                  </ul>
                </Card>
                <Card title="14주차 관리자 체크" icon={Cog}>
                  <ul className="cleanList">
                    <li><Check size={16} /> log.json 구조를 이해했다.</li>
                    <li><Check size={16} /> 날짜별 매출을 계산했다.</li>
                    <li><Check size={16} /> 빈 거래 내역을 처리했다.</li>
                    <li><Check size={16} /> 매출 팝업을 열었다.</li>
                  </ul>
                </Card>
              </div>
            </Section>
          )}

          {active === 'export' && (
            <Section
              title="수업용 산출물 Export"
              description="LMS, GitHub README, 실습 안내문에 붙여넣을 수 있는 요약입니다."
              actions={<Button onClick={() => copyText(exportGuide)}><Clipboard size={16} /> 전체 복사</Button>}
            >
              <CodeBlock title="vending_project_3week_plan.md" code={exportGuide} />
            </Section>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
