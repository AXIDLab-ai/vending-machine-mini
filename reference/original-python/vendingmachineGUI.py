#-*- coding: UTF-8 -*-
#   Author : Dr. Songhee Kang.
#   Email : dellabee@tukorea.ac.kr
#   Description : python vending machine GUI
#   Date : 2025. 05. 01.
#   Version : 1.0.1
#   History : 1.0.0 - 2025. 05. 01. 최초작성
#   History : 1.0.1 - 2025. 05. 11. GUI 개선 및 소비자, 관리자 모듈 분리

import tkinter as tk
from tkinter import messagebox, ttk
import json, os, sys
from datetime import datetime
import tkinter.font as tkFont
from admin import show_stock_popup, edit_prices_popup, show_transactions_popup, show_revenue_popup
from customer import (
    build_home_page,
    build_select_page,
    build_payment_page,
    build_complete_page,
    select_drink,
    handle_payment,
    save_transaction_to_file
)

class AdminPage(tk.Frame):
    def __init__(self, parent, app):
        super().__init__(parent, bg="white")
        self.app = app
        tk.Label(self, text="관리자 설정", bg="white").pack(pady=20)

        # 관리자 메뉴 버튼
        btn_frame = tk.Frame(self, bg="white")
        btn_frame.pack(pady=10)

        tk.Button(btn_frame, text="재고 현황", width=20, command=lambda: show_stock_popup(self, self.app.drinks, self.app.stock)).pack(pady=5)
        tk.Button(btn_frame, text="가격 수정", width=20, command=lambda: edit_prices_popup(self, self.app.drinks, self.app.stock)).pack(pady=5)
        tk.Button(btn_frame, text="거래 내역", width=20, command=lambda: show_transactions_popup(self)).pack(pady=5)
        tk.Button(btn_frame, text="매출 현황", width=20, command=lambda: show_revenue_popup(self)).pack(pady=5)
        tk.Button(btn_frame, text="홈으로 가기", command=lambda: self.app._show_page("home")).pack(pady=20)

class VendingMachineApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self._register_custom_font()
        self.title("Vending Machine")
        self.geometry("390x844")
        self.resizable(False, False)

        self.drinks = []
        self.stock = {}
        self.transactions = []
        self.selected_index = -1
        self.change_map = {}
        self.filter_date = datetime.now()
        self.load_beverages_from_file()

        self.pages = {}
        self._create_pages()
        self._show_page("home")

    def _register_custom_font(self):
        base_path = getattr(sys, '_MEIPASS', os.path.abspath("."))
        font_path = os.path.join(base_path, "assets", "fonts", "NanumGothic.ttf")
        try:
            if os.path.exists(font_path):
                # 폰트 파일 경로 출력 (디버깅용)
                print("폰트 파일 있음:", font_path)

                # 시스템 설치된 폰트처럼 이름만 지정 (OS에 설치되어 있어야 함)
                default_font = tkFont.nametofont("TkDefaultFont")
                default_font.config(family="NanumGothic", size=11)

                self.option_add("*Font", "NanumGothic 11")
            else:
                print("NanumGothic.ttf 파일이 존재하지 않습니다.")
        except Exception as e:
            print("폰트 등록 오류:", e)

    def load_beverages_from_file(self):
        #로컬 JSON 파일에서 음료 정보를 불러와 self.drinks에 추가
        try:
            base_path = getattr(sys, '_MEIPASS', os.path.abspath("."))
            path = os.path.join(base_path, "assets", "data", "beverage.json")
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
                for item in data:
                    name = item.get("name")
                    price = item.get("price")
                    stock = item.get("stock", 0)

                    if name and price:
                        self.drinks.append({"name": name, "price": price})
                        self.stock[name] = stock
        except Exception as e:
            print("음료 JSON 파일 로드 실패:", e)

    def _create_pages(self):
        self.pages["home"] = build_home_page(self)
        self.pages["select"] = build_select_page(self)
        self.pages["payment"] = build_payment_page(self)
        self.pages["admin"] = AdminPage(self, self)

    def _show_page(self, name):
        for page in self.pages.values():
            page.pack_forget()
        self.pages[name].pack(fill='both', expand=True)

    def _admin_login(self):
            def validate():
                if password_entry.get() == "1234":
                    login.destroy()
                    self._show_page("admin")
                else:
                    messagebox.showerror("오류", "비밀번호가 틀렸습니다.")

            login = tk.Toplevel(self)
            login.title("관리자 로그인")
            tk.Label(login, text="비밀번호 입력:").pack(pady=5)
            password_entry = tk.Entry(login, show="*")
            password_entry.pack(pady=5)
            tk.Button(login, text="확인", command=validate).pack(pady=5)

app = VendingMachineApp()
app.mainloop()
