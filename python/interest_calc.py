start_money = float(input('Start Money: '))
interest = float(input('interest in %: '))
years = int(input('years: '))

start_money = 5000
interest = 2.75
years = 40

interest = 1 + interest / 100

money = start_money
for _ in range(years):
    money *= interest
    print(money)

text = 'After {} years you will have {:.2f}'.format(years, money)
print(text)

input()