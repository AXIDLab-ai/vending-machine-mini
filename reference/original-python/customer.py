#-*- coding: UTF-8 -*-
#   Author : Dr. Songhee Kang.
#   Email : dellabee@tukorea.ac.kr
#   Description : python vending machine customer logic
#   Date : 2025. 05. 01.
#   Version : 1.0.0
#   History : 1.0.0 - 2025. 05. 11. 최초작성

import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk
from datetime import datetime
import json
import os
import sys

def save_transaction_to_file(app, transaction):
    try:
        base_path = getattr(sys, '_MEIPASS', os.path.abspath("."))
        path = os.path.join(base_path, "assets", "data", "log.json")
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
        else:
            data = []

        data.append(transaction)

        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    except Exception as e:
        print("거래 내역 저장 실패:", e)

def handle_payment(app):
    pass
    # 결제 처리 로직은 여기에 구현합니다.
    # 예시: 결제 금액 확인, 거스름돈 계산, 재고 업데이트 등

def build_home_page(app):
    frame = tk.Frame(app, bg="white")

    title_font = tk.font.Font(size=16, weight="bold")
    tk.Label(frame, text="Vending Machine\n2025\nTU Korea", font=title_font, bg="white").pack(pady=20)

    try:
        base_path = getattr(sys, '_MEIPASS', os.path.abspath("."))
        image_path = os.path.join(base_path, "assets", "images", "symbol1.png")
        img = Image.open(image_path)
        img = img.resize((120, 120), Image.LANCZOS)
        app.logo_image = ImageTk.PhotoImage(img)
        tk.Label(frame, image=app.logo_image, bg="white").pack(pady=10)
    except Exception as e:
        print("이미지 로딩 실패:", e)

    tk.Button(frame, text="시작하기", width=20, height=2, command=lambda: app._show_page("select")).pack(pady=20)
    tk.Button(frame, text="설정", command=app._admin_login).pack(side="bottom", pady=20)

    return frame

def build_select_page(app):
    frame = tk.Frame(app, bg="white")
    tk.Label(frame, text="음료 선택하기", font=("", 14, "bold"), bg="white").pack(pady=10)

    for idx, drink in enumerate(app.drinks):
        row = tk.Frame(frame, bg="white")
        row.pack(pady=5, padx=10, fill="x")
        tk.Label(row, text=f"{drink['name']} ({drink['price']}원)", font=("", 12), bg="white").pack(side="left", expand=True, anchor="w")
        tk.Button(row, text="선택하기", font=("", 10), command=lambda i=idx: select_drink(app, i)).pack(side="right")

    tk.Button(frame, text="홈으로 가기", command=lambda: app._show_page("home")).pack(side="bottom", pady=20)
    return frame

def select_drink(app, index):
    app.selected_index = index
    price = app.drinks[index]['price']
    app.payment_label.config(text=f"결제 금액: {price}원")
    app.money_entry.delete(0, tk.END)
    app.money_entry.insert(0, "0")
    app.change_text.delete('1.0', tk.END)
    app._show_page("payment")

def build_complete_page(app):
    frame = tk.Frame(app, bg="white")
    tk.Label(frame, text="결제가 완료되었습니다", font=("", 14, "bold"), bg="white").pack(pady=50)
    tk.Button(frame, text="홈으로 가기", command=lambda: app._show_page("home")).pack(side="bottom", pady=20)
    return frame

def build_payment_page(app):
    frame = tk.Frame(app, bg="white")

    app.payment_label = tk.Label(frame, text="결제 금액: 0원", font=("", 14, "bold"), bg="white")
    app.payment_label.pack(pady=10)

    app.money_entry = tk.Entry(frame, justify="right")
    app.money_entry.insert(0, "0")
    app.money_entry.pack(pady=10)

    app.total_label = tk.Label(frame, text="총 투입 금액: 0원", font=("", 12), bg="white", fg="black")
    app.total_label.pack(pady=5)

    button_frame = tk.Frame(frame, bg="white")
    button_frame.pack(pady=10)

    def update_total_display(total):
        app.total_label.config(fg="red", text=f"총 투입 금액: {total}원")
        app.after(150, lambda: app.total_label.config(fg="black"))

    def add_money(amount):
        current = app.money_entry.get()
        try:
            total = int(current) if current else 0
            total += amount
            app.money_entry.delete(0, tk.END)
            app.money_entry.insert(0, str(total))
            update_total_display(total)
        except ValueError:
            app.money_entry.delete(0, tk.END)
            app.money_entry.insert(0, str(amount))
            update_total_display(amount)

    for value in [1000, 500, 100, 50, 10]:
        tk.Button(button_frame, text=f"{value}원", width=6, command=lambda v=value: add_money(v)).pack(side="left", padx=5)

    def reset_input():
        app.money_entry.delete(0, tk.END)
        app.money_entry.insert(0, "0")
        update_total_display(0)
        app.change_text.delete('1.0', tk.END)

    tk.Button(frame, text="입력 초기화", command=reset_input).pack(pady=5)

    app.change_text = tk.Text(frame, height=5, width=40)
    app.change_text.pack(pady=10)

    tk.Button(frame, text="결제하기", command=lambda: handle_payment(app)).pack(pady=10)
    tk.Button(frame, text="홈으로 가기", command=lambda: app._show_page("home")).pack(side="bottom", pady=20)

    return frame
