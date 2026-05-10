#-*- coding: UTF-8 -*-
#   Author : Dr. Songhee Kang.
#   Email : dellabee@tukorea.ac.kr
#   Description : python vending machine admin logic
#   Date : 2025. 05. 01.
#   Version : 1.0.0
#   History : 1.0.0 - 2025. 05. 11. 최초작성

import os
import json
from tkinter import messagebox
import sys

def show_stock_popup(root, drinks, stock):
    from tkinter import Toplevel, Label
    win = Toplevel(root)
    win.title("재고 현황")
    Label(win, text="현재 재고", font=("Arial", 14)).pack(pady=10)
    for drink in drinks:
        name = drink["name"]
        count = stock.get(name, 0)
        Label(win, text=f"{name}: {count}개").pack()

def edit_prices_popup(root, drinks, stock):
    from tkinter import Toplevel, Label, Entry, Frame, Button

    def save_and_close():
        for name, entry in entries.items():
            try:
                new_price = int(entry.get())
                for drink in drinks:
                    if drink["name"] == name:
                        drink["price"] = new_price
            except:
                pass

        # 파일 저장
        base_path = getattr(sys, '_MEIPASS', os.path.abspath("."))
        path = os.path.join(base_path, "assets", "data", "beverage.json")
        updated = []
        for drink in drinks:
            updated.append({
                "name": drink["name"],
                "price": drink["price"],
                "stock": stock.get(drink["name"], 0)
            })

        with open(path, "w", encoding="utf-8") as f:
            json.dump(updated, f, ensure_ascii=False, indent=2)

        messagebox.showinfo("저장 완료", "가격이 수정되어 저장되었습니다.")
        price_win.destroy()

    price_win = Toplevel(root)
    price_win.title("가격 수정")
    Label(price_win, text="음료 가격 수정", font=("Arial", 14)).pack(pady=10)

    entries = {}
    for drink in drinks:
        row = Frame(price_win)
        row.pack(pady=2)
        Label(row, text=drink["name"], width=10).pack(side="left")
        e = Entry(row)
        e.insert(0, str(drink["price"]))
        e.pack(side="left")
        entries[drink["name"]] = e

    Button(price_win, text="저장", command=save_and_close).pack(pady=10)

def show_transactions_popup(root):
    from tkinter import Toplevel, Label, Listbox, Frame, END

    base_path = getattr(sys, '_MEIPASS', os.path.abspath("."))
    path = os.path.join(base_path, "assets", "data", "log.json")
    win = Toplevel(root)
    win.title("거래 내역")
    Label(win, text="거래 내역", font=("Arial", 14)).pack(pady=10)

    frame = Frame(win)
    frame.pack(fill="both", expand=True)

    listbox = Listbox(frame, width=50)
    listbox.pack(padx=10, pady=10, fill="both", expand=True)

    try:
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
        else:
            data = []

        if not data:
            listbox.insert(END, "거래 내역이 없습니다.")
        else:
            for tx in reversed(data[-50:]):
                listbox.insert(END, f"{tx['time'][:19]} | {tx['item']} {tx['amount']}원")
    except Exception as e:
        listbox.insert(END, f"오류: {e}")

def show_revenue_popup(root):
    pass
    # 매출 현황을 보여주는 기능은 나중에 구현할 예정입니다. # 관리자 모드 백엔드 설계
