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
  { id: 'overview', label: '학습 흐름', icon: Home },
  { id: 'ux', label: 'UX Layer', icon: MonitorSmartphone },
  { id: 'reverse', label: '역엔지니어링', icon: Layers3 },
  { id: 'boilerplate', label: '보일러플레이트', icon: FileCode2 },
  { id: 'customer', label: '소비자 함수', icon: ShoppingCart },
  { id: 'admin', label: '관리자 함수', icon: Cog },
  { id: 'oop', label: '파이썬 개념', icon: BookOpen },
  { id: 'export', label: 'Export', icon: Download },
]

const screens = {
  home: {
    title: 'Home',
    goal: '앱 시작과 관리자 진입점을 보여준다.',
    widgets: ['Label: 앱 제목', 'Image: 학교/프로젝트 로고', 'Button: 시작하기', 'Button: 설정'],
    learning: '페이지 전환, 버튼 이벤트, 관리자 로그인 진입을 이해한다.',
  },
  select: {
    title: 'Drink Select',
    goal: 'JSON에서 읽은 음료 목록을 사용자에게 보여준다.',
    widgets: ['Label: 음료명과 가격', 'Button: 선택하기', 'Button: 홈으로 가기'],
    learning: '반복문으로 UI 행을 만들고, lambda로 선택 index를 전달한다.',
  },
  payment: {
    title: 'Payment',
    goal: '선택 음료의 가격과 투입 금액을 비교해 결제 결과를 판단한다.',
    widgets: ['Entry: 투입 금액', 'Button: 1000/500/100/50/10원', 'Text: 거스름돈', 'Button: 결제하기'],
    learning: '입력 검증, 조건문, 거스름돈 계산, 재고 업데이트를 학습한다.',
  },
  complete: {
    title: 'Complete',
    goal: '정상 결제 후 완료 상태를 보여준다.',
    widgets: ['Label: 완료 메시지', 'Button: 홈으로 가기'],
    learning: '상태 변화 이후 화면 전환을 이해한다.',
  },
  admin: {
    title: 'Admin',
    goal: '재고, 가격, 거래 내역, 매출 현황을 관리한다.',
    widgets: ['Button: 재고 현황', 'Button: 가격 수정', 'Button: 거래 내역', 'Button: 매출 현황'],
    learning: '관리자 기능을 독립 함수로 분리하고 파일 입출력과 리스트 처리를 학습한다.',
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

const architecture = [
  {
    file: 'vendingmachineGUI.py',
    role: '앱 조립자 / Controller',
    points: ['VendingMachineApp 클래스', '페이지 생성과 전환', 'JSON 데이터 로드', '관리자 로그인', 'customer.py와 admin.py 연결'],
  },
  {
    file: 'customer.py',
    role: '소비자 모드 / User Flow',
    points: ['Home, Select, Payment, Complete 화면 생성', 'select_drink로 선택 상태 저장', 'handle_payment는 학생 실습용 빈 함수', '거래 내역 저장 함수'],
  },
  {
    file: 'admin.py',
    role: '관리자 모드 / Operation Logic',
    points: ['재고 현황 팝업', '가격 수정 및 beverage.json 저장', '거래 내역 조회', 'show_revenue_popup은 학생 실습용 빈 함수'],
  },
]

const boilerplates = {
  gui: String.raw`# vendingmachineGUI.py
# 앱 전체를 조립하는 Controller 파일

import tkinter as tk
import json, os, sys
from datetime import datetime

from admin import show_stock_popup, edit_prices_popup, show_transactions_popup, show_revenue_popup
from customer import build_home_page, build_select_page, build_payment_page, build_complete_page

class AdminPage(tk.Frame):
    def __init__(self, parent, app):
        super().__init__(parent, bg="white")
        self.app = app
        # TODO: 관리자 버튼 4개를 배치한다.

class VendingMachineApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Vending Machine")
        self.geometry("390x844")
        self.resizable(False, False)

        self.drinks = []
        self.stock = {}
        self.transactions = []
        self.selected_index = -1

        self.load_beverages_from_file()
        self.pages = {}
        self._create_pages()
        self._show_page("home")

    def load_beverages_from_file(self):
        # TODO: assets/data/beverage.json에서 음료 정보를 읽어온다.
        pass

    def _create_pages(self):
        # TODO: home, select, payment, complete, admin 페이지를 만든다.
        pass

    def _show_page(self, name):
        # TODO: 모든 페이지를 숨기고 선택한 페이지만 보여준다.
        pass

    def _admin_login(self):
        # TODO: 비밀번호가 1234이면 admin 페이지로 이동한다.
        pass

if __name__ == "__main__":
    app = VendingMachineApp()
    app.mainloop()`,
  customer: String.raw`# customer.py
# 소비자 모드: 화면 생성, 음료 선택, 결제 처리

import tkinter as tk
from tkinter import messagebox
from datetime import datetime
import json, os, sys

def save_transaction_to_file(app, transaction):
    # TODO: assets/data/log.json에 거래 내역을 저장한다.
    pass

def build_home_page(app):
    # TODO: 제목, 로고, 시작하기, 설정 버튼을 만든다.
    pass

def build_select_page(app):
    # TODO: app.drinks를 반복하면서 음료 선택 버튼을 만든다.
    pass

def select_drink(app, index):
    # TODO: 선택 음료 index를 저장하고 payment 화면으로 이동한다.
    pass

def build_payment_page(app):
    # TODO: 결제 금액, 투입 금액, 금액 버튼, 결제 버튼을 만든다.
    pass

def handle_payment(app):
    # TODO: 금액 확인, 거스름돈 계산, 재고 차감, 거래 저장, 완료 화면 이동
    pass

def build_complete_page(app):
    # TODO: 결제 완료 메시지와 홈 이동 버튼을 만든다.
    pass`,
  admin: String.raw`# admin.py
# 관리자 모드: 재고, 가격, 거래 내역, 매출 현황

import os, json, sys
from tkinter import messagebox

def show_stock_popup(root, drinks, stock):
    # TODO: 음료별 재고를 팝업으로 보여준다.
    pass

def edit_prices_popup(root, drinks, stock):
    # TODO: 음료 가격을 수정하고 beverage.json에 저장한다.
    pass

def show_transactions_popup(root):
    # TODO: log.json을 읽고 최근 거래 50개를 보여준다.
    pass

def show_revenue_popup(root):
    # TODO: 날짜별 총 매출을 계산해서 보여준다.
    pass`,
  data: String.raw`// assets/data/beverage.json
[
  { "name": "콜라", "price": 1200, "stock": 5 },
  { "name": "사이다", "price": 1100, "stock": 4 },
  { "name": "물", "price": 800, "stock": 8 },
  { "name": "커피", "price": 1500, "stock": 3 }
]

// assets/data/log.json
[
  { "time": "2026-05-10T09:10:00", "item": "콜라", "amount": 1200 }
]`,
}

function copyText(text) {
  if (navigator.clipboard) navigator.clipboard.writeText(text)
}

function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button type="button" onClick={onClick} className={`button ${variant}`}>
      {children}
    </button>
  )
}

function Section({ title, description, actions, children }) {
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

function Card({ title, icon: Icon, children }) {
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
              <p>학부 1학년 파이썬 미니 프로젝트</p>
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

        {screen === 'complete' && (
          <div className="phoneCenter">
            <div>
              <div className="emojiLogo success">✅</div>
              <h3>결제가 완료되었습니다</h3>
              <p>거래 내역 저장, 재고 차감, 완료 화면 전환</p>
            </div>
            <div className="phoneSecondary">홈으로 가기</div>
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

function App() {
  const [active, setActive] = useState('overview')
  const [screen, setScreen] = useState('home')
  const [selectedBoilerplate, setSelectedBoilerplate] = useState('customer')
  const [selectedDrinkName, setSelectedDrinkName] = useState('콜라')
  const [money, setMoney] = useState(1500)
  const [stockInput, setStockInput] = useState(5)
  const [priceEditName, setPriceEditName] = useState('콜라')
  const [newPrice, setNewPrice] = useState(1300)
  const [revenueDate, setRevenueDate] = useState('2026-05-10')

  const selectedDrink = initialDrinks.find((drink) => drink.name === selectedDrinkName) ?? initialDrinks[0]

  const paymentResult = useMemo(() => {
    if (stockInput <= 0) return { ok: false, message: '재고가 없습니다.', changeMap: [] }
    if (money < selectedDrink.price) return { ok: false, message: `금액이 부족합니다. ${selectedDrink.price - money}원이 더 필요합니다.`, changeMap: [] }
    const change = money - selectedDrink.price
    return { ok: true, message: `결제 완료. 거스름돈은 ${change.toLocaleString()}원입니다.`, changeMap: makeChange(change) }
  }, [money, selectedDrink, stockInput])

  const revenue = useMemo(() => {
    return initialTransactions.filter((tx) => tx.time.startsWith(revenueDate)).reduce((sum, tx) => sum + tx.amount, 0)
  }, [revenueDate])

  const adminResult = useMemo(() => {
    const target = initialDrinks.find((drink) => drink.name === priceEditName) ?? initialDrinks[0]
    const parsed = Number(newPrice)
    const valid = Number.isInteger(parsed) && parsed > 0
    return {
      target,
      valid,
      message: valid ? `${target.name} 가격을 ${parsed.toLocaleString()}원으로 수정할 수 있습니다.` : '가격은 0보다 큰 정수여야 합니다.',
    }
  }, [priceEditName, newPrice])

  const customerSolution = String.raw`def handle_payment(app):
    if app.selected_index < 0:
        messagebox.showerror("오류", "음료를 먼저 선택하세요.")
        return

    drink = app.drinks[app.selected_index]
    name = drink["name"]
    price = drink["price"]

    try:
        paid = int(app.money_entry.get())
    except ValueError:
        messagebox.showerror("오류", "투입 금액은 숫자여야 합니다.")
        return

    if app.stock.get(name, 0) <= 0:
        messagebox.showerror("오류", "재고가 없습니다.")
        return

    if paid < price:
        messagebox.showerror("오류", f"금액이 부족합니다. {price - paid}원이 더 필요합니다.")
        return

    change = paid - price
    app.stock[name] -= 1

    transaction = {
        "time": datetime.now().isoformat(),
        "item": name,
        "amount": price
    }
    save_transaction_to_file(app, transaction)

    app.change_text.delete("1.0", tk.END)
    app.change_text.insert(tk.END, f"거스름돈: {change}원\n")
    app._show_page("complete")`

  const adminSolution = String.raw`def calculate_revenue_by_date(transactions, target_date):
    total = 0
    for tx in transactions:
        if tx["time"].startswith(target_date):
            total += tx["amount"]
    return total

def update_price(drinks, name, new_price):
    if not isinstance(new_price, int) or new_price <= 0:
        raise ValueError("가격은 0보다 큰 정수여야 합니다.")

    for drink in drinks:
        if drink["name"] == name:
            drink["price"] = new_price
            return drink

    raise ValueError("해당 음료를 찾을 수 없습니다.")

def show_revenue_popup(root):
    from tkinter import Toplevel, Label
    base_path = getattr(sys, "_MEIPASS", os.path.abspath("."))
    path = os.path.join(base_path, "assets", "data", "log.json")

    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            transactions = json.load(f)
    else:
        transactions = []

    today = datetime.now().strftime("%Y-%m-%d")
    revenue = calculate_revenue_by_date(transactions, today)

    win = Toplevel(root)
    win.title("매출 현황")
    Label(win, text=f"{today} 매출: {revenue}원").pack(pady=20)`

  const exportGuide = String.raw`# 자판기 미니 프로젝트 실습 산출물

## 1. Presentation Layer
- Home: 시작하기 / 설정
- Select: 음료 목록 / 선택하기
- Payment: 투입 금액 / 결제하기 / 거스름돈
- Complete: 결제 완료
- Admin: 재고 / 가격 / 거래 / 매출

## 2. Reverse Engineering
- vendingmachineGUI.py: 전체 앱 조립, 페이지 전환, 데이터 로드
- customer.py: 소비자 화면과 결제 흐름
- admin.py: 관리자 기능과 파일 저장

## 3. Boilerplate
- GUI Controller
- Customer Mode
- Admin Mode
- JSON Data

## 4. Practice Functions
### Customer
- handle_payment(app)
- save_transaction_to_file(app, transaction)
- select_drink(app, index)

### Admin
- calculate_revenue_by_date(transactions, target_date)
- update_price(drinks, name, new_price)
- show_revenue_popup(root)

## 5. 핵심 파이썬 개념
- 함수 분리
- 조건문
- 반복문
- 리스트/딕셔너리
- JSON 파일 입출력
- Tkinter 이벤트 처리
- 클래스와 객체
- 모듈 분리
- 예외 처리`

  return (
    <div className="app">
      <div className="layout">
        <aside className="sidebar">
          <div className="brand">
            <div className="brandIcon"><Boxes size={28} /></div>
            <h1>Vending Machine Python Project Lab</h1>
            <p>학부 1학년용 자판기 앱 역엔지니어링 × 함수 실습 도구</p>
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
              <p className="eyebrow">Python Mini Project Builder</p>
              <h1>자판기 앱을 읽고, 쪼개고, 다시 만드는 실습 앱</h1>
              <p>Tkinter 기반 자판기 프로젝트를 UX 계층, 소비자 로직, 관리자 로직으로 분해하고 학습자가 빈 함수를 직접 완성하도록 설계했습니다.</p>
            </div>
            <div className="heroActions">
              <Button variant="ghost" onClick={() => setActive('ux')}><Play size={16} /> 시작</Button>
              <Button onClick={() => setActive('export')}><Download size={16} /> 산출물</Button>
            </div>
            <div className="mobileTabs">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActive(tab.id)} className={active === tab.id ? 'selected' : ''}>{tab.label}</button>
              ))}
            </div>
          </header>

          {active === 'overview' && (
            <Section title="학습 목표와 진행 흐름" description="이 앱의 목적은 완성 코드를 주는 것이 아니라, 학생이 자판기 프로젝트를 구조적으로 이해하고 단계별로 함수를 완성하게 하는 것입니다.">
              <div className="grid four">
                <Card title="1. UX 계층 보기" icon={MonitorSmartphone}>Tkinter 화면을 스마트폰 목업으로 다시 보며 Home, Select, Payment, Admin 화면의 역할을 이해합니다.</Card>
                <Card title="2. 역엔지니어링" icon={Layers3}>vendingmachineGUI.py, customer.py, admin.py의 역할을 나누고 함수 호출 흐름을 따라갑니다.</Card>
                <Card title="3. 보일러플레이트" icon={FileCode2}>학생에게 빈 함수가 포함된 시작 코드를 제공합니다. 바로 완성 코드부터 주지 않습니다.</Card>
                <Card title="4. 함수 실습" icon={Wrench}>소비자는 handle_payment, 관리자는 show_revenue_popup과 가격/재고 함수를 직접 구현합니다.</Card>
              </div>
              <div className="note"><h3>강의 메시지</h3><p>윈도우 프로그래밍은 버튼을 배치하는 일이 아니라, 이벤트가 상태를 어떻게 바꾸는지 이해하는 일입니다. 객체지향 프로그래밍은 클래스를 외우는 일이 아니라, 앱 전체 상태를 어디에 둘지 결정하는 일입니다.</p></div>
            </Section>
          )}

          {active === 'ux' && (
            <Section title="UX / Presentation Layer" description="학생은 먼저 사용자가 보는 화면을 이해합니다. 그런 다음 이 화면이 어떤 파이썬 함수로 만들어졌는지 연결합니다.">
              <div className="split">
                <div>
                  <div className="pillRow">{Object.keys(screens).map((key) => <Button key={key} variant={screen === key ? 'primary' : 'ghost'} onClick={() => setScreen(key)}>{screens[key].title}</Button>)}</div>
                  <PhoneMockup screen={screen} totalMoney={money} selectedDrink={selectedDrink} />
                </div>
                <div className="stack">
                  <Card title={`${screens[screen].title} 화면 정의`} icon={MonitorSmartphone}><strong>목적</strong><p>{screens[screen].goal}</p><strong>학습 포인트</strong><p>{screens[screen].learning}</p></Card>
                  <Card title="Widget Breakdown" icon={Clipboard}><ul className="cleanList">{screens[screen].widgets.map((item) => <li key={item}><Check size={16} /> <span>{item}</span></li>)}</ul></Card>
                  <Card title="Tkinter → 학습 개념" icon={Code2}><div className="conceptGrid">{['Frame = 화면 단위', 'Label = 정보 표시', 'Button = 이벤트 발생', 'Entry = 사용자 입력', 'Text/Listbox = 결과 출력', 'pack = 레이아웃 배치'].map((x) => <div key={x}>{x}</div>)}</div></Card>
                </div>
              </div>
            </Section>
          )}

          {active === 'reverse' && (
            <Section title="역엔지니어링: 기존 코드를 구조로 읽기" description="학생에게 '코드가 길다'가 아니라 '역할이 나뉘어 있다'는 것을 보여줍니다.">
              <div className="grid three">{architecture.map((item) => <Card key={item.file} title={item.file} icon={FileCode2}><p className="role">{item.role}</p><ul className="cleanList">{item.points.map((point) => <li key={point}><ChevronRight size={16} /> <span>{point}</span></li>)}</ul></Card>)}</div>
              <div className="flowBox"><h3>호출 흐름</h3><div className="flowGrid">{['VendingMachineApp', '_create_pages', 'build_*_page', 'Button command', '상태 변경 / 파일 저장'].map((step, i) => <div key={step}><small>STEP {i + 1}</small><strong>{step}</strong></div>)}</div></div>
            </Section>
          )}

          {active === 'boilerplate' && (
            <Section title="보일러플레이트 생성기" description="학생에게 완성 코드가 아니라 '빈칸이 있는 시작 코드'를 줍니다.">
              <div className="pillRow">{Object.keys(boilerplates).map((key) => <Button key={key} variant={selectedBoilerplate === key ? 'primary' : 'ghost'} onClick={() => setSelectedBoilerplate(key)}>{key}</Button>)}</div>
              <CodeBlock title={`${selectedBoilerplate} boilerplate`} code={boilerplates[selectedBoilerplate]} />
            </Section>
          )}

          {active === 'customer' && (
            <Section title="소비자 실습용 함수: handle_payment" description="결제 함수는 조건문, 예외 처리, 딕셔너리, 상태 변경, 파일 저장을 한 번에 연습할 수 있는 핵심 함수입니다.">
              <div className="split equal"><div className="stack"><Card title="실습 시뮬레이터" icon={ShoppingCart}><div className="formGrid"><label><span>음료</span><select value={selectedDrinkName} onChange={(e) => setSelectedDrinkName(e.target.value)}>{initialDrinks.map((drink) => <option key={drink.name}>{drink.name}</option>)}</select></label><label><span>투입 금액</span><input value={money} onChange={(e) => setMoney(Number(e.target.value))} type="number" /></label><label><span>재고</span><input value={stockInput} onChange={(e) => setStockInput(Number(e.target.value))} type="number" /></label></div><div className={paymentResult.ok ? 'result ok' : 'result bad'}><strong>{paymentResult.ok ? '통과' : '오류'}</strong><p>{paymentResult.message}</p><div className="coinResult">{paymentResult.changeMap.map((item) => <span key={item.coin}>{item.coin}원 × {item.count}</span>)}</div></div></Card><Card title="학생이 구현할 조건" icon={ShieldCheck}><ul className="cleanList">{['선택된 음료가 없으면 오류', '투입 금액이 숫자가 아니면 오류', '재고가 0이면 오류', '투입 금액이 가격보다 작으면 부족 금액 안내', '정상 결제면 재고 1 감소', '거래 내역을 log.json에 저장', '완료 화면으로 이동'].map((x) => <li key={x}><Check size={16} /> {x}</li>)}</ul></Card></div><CodeBlock title="handle_payment 예시 해답" code={customerSolution} /></div>
            </Section>
          )}

          {active === 'admin' && (
            <Section title="관리자 실습용 함수: 매출·가격·재고" description="관리자 기능은 리스트 순회, JSON 파일 입출력, 예외 처리, 데이터 집계를 연습하기 좋습니다.">
              <div className="split equal"><div className="stack"><Card title="매출 계산 실습" icon={ReceiptText}><label className="field"><span>날짜</span><input value={revenueDate} onChange={(e) => setRevenueDate(e.target.value)} /></label><div className="metric"><span>총 매출</span><strong>{revenue.toLocaleString()}원</strong></div></Card><Card title="가격 수정 검증" icon={Cog}><div className="formGrid two"><label><span>음료</span><select value={priceEditName} onChange={(e) => setPriceEditName(e.target.value)}>{initialDrinks.map((drink) => <option key={drink.name}>{drink.name}</option>)}</select></label><label><span>새 가격</span><input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} type="number" /></label></div><div className={adminResult.valid ? 'result ok' : 'result bad'}>{adminResult.message}</div></Card><Card title="학생이 구현할 조건" icon={ShieldCheck}><ul className="cleanList">{['거래 내역이 없으면 0원', '날짜가 같은 거래만 합산', '가격은 0보다 큰 정수', '없는 음료명은 오류', '수정 후 beverage.json에 저장', '최근 거래 50개만 표시'].map((x) => <li key={x}><Check size={16} /> {x}</li>)}</ul></Card></div><CodeBlock title="admin.py 예시 해답" code={adminSolution} /></div>
            </Section>
          )}

          {active === 'oop' && (
            <Section title="이 프로젝트로 가르칠 파이썬 개념" description="자판기 앱은 학부 1학년에게 파이썬 전반을 압축해서 보여줄 수 있는 프로젝트입니다.">
              <div className="grid three"><Card title="윈도우 프로그래밍" icon={MonitorSmartphone}>Tkinter의 Frame, Label, Button, Entry, Text, Listbox를 통해 화면 구성과 이벤트 처리를 학습합니다.</Card><Card title="객체지향 프로그래밍" icon={Boxes}>VendingMachineApp 객체가 drinks, stock, selected_index 같은 앱 상태를 소유한다는 점을 학습합니다.</Card><Card title="모듈 분리" icon={Layers3}>GUI 조립자, 소비자 로직, 관리자 로직을 다른 파일로 분리해 코드 구조를 이해합니다.</Card><Card title="자료구조" icon={Clipboard}>음료는 리스트 안의 딕셔너리, 재고는 딕셔너리, 거래는 리스트로 저장됩니다.</Card><Card title="파일 입출력" icon={ReceiptText}>beverage.json과 log.json을 읽고 쓰며 영속성의 개념을 배웁니다.</Card><Card title="예외 처리" icon={ShieldCheck}>숫자 입력 오류, 파일 없음, 잘못된 가격, 재고 부족을 try/except와 조건문으로 처리합니다.</Card></div>
            </Section>
          )}

          {active === 'export' && (
            <Section title="수업용 산출물 Export" description="이 내용을 Markdown으로 복사해 LMS, GitHub README, 실습지에 붙여넣을 수 있습니다." actions={<Button onClick={() => copyText(exportGuide)}><Clipboard size={16} /> 전체 복사</Button>}><CodeBlock title="vending_project_lab_guide.md" code={exportGuide} /></Section>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
