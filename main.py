# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    import requests
    import csv
    from bs4 import BeautifulSoup
    from datetime import datetime
    import time

    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0',
    }
    while True:
        results = []
        url = 'https://connect2concepts.com/connect2/?type=circle&key=2A2BE0D8-DF10-4A48-BEDD-B3BC0CD628E7'
        response = requests.get(url, headers=headers)

        soup = BeautifulSoup(response.text, 'html.parser')

        dashboard = soup.find('div', class_='panel-body')

        for div in dashboard:
            text = div.find_next('div', {'style': 'text-align:center;'})
            if text is not None and text.find_next('span').get_text() == '(Open)':
                now = datetime.utcnow()
                textString=text.get_text()
                count=int(textString[textString.index(':')+2:textString.index('Updated')])
                location=textString[:textString.index('(')]
                results.append({'location': location, 'count': count, 'time': now})

        print(results)
        with open('data.csv', 'a', newline='') as csvfile:
            csvwriter = csv.writer(csvfile)
            csvwriter.writerow(results)
        time.sleep(600)
