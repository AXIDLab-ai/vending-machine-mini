# Vending Machine Python Project Lab

학부 1학년 파이썬 미니 프로젝트인 자판기 앱을 학습하기 위한 React 기반 실습 앱입니다.

## 학습 구조

1. UX / Presentation Layer 보기
2. 기존 Tkinter 코드 역엔지니어링
3. 보일러플레이트 코드 생성
4. 소비자 모드 함수 실습
5. 관리자 모드 함수 실습
6. 파이썬 개념 연결

## 핵심 실습 함수

### customer.py

- `handle_payment(app)`
- `save_transaction_to_file(app, transaction)`
- `select_drink(app, index)`

### admin.py

- `show_revenue_popup(root)`
- `calculate_revenue_by_date(transactions, target_date)`
- `update_price(drinks, name, new_price)`

## 포함된 원본 참고 코드

`reference/original-python/` 폴더에 원본 Python 파일을 넣었습니다.

- `admin.py`
- `customer.py`
- `vendingmachineGUI.py`

## 핵심 메시지

완성 코드를 주는 것이 아니라, 학생이 기존 프로젝트를 읽고, 화면-함수-데이터 흐름을 분해하고, 빈 함수를 직접 구현하게 하는 학습용 앱입니다.
