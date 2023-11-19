import re
import urllib.request
import itertools

# https://stackoverflow.com/a/16187955
url = "https://gamepress.gg/arknights/tools/interactive-operator-list"
operatorUrl = "https://gamepress.gg/arknights/operator/"

user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'

headers={'User-Agent':user_agent,} 

request=urllib.request.Request(url,None,headers)

operators = {}

with urllib.request.urlopen(request) as response:
    data = response.read().decode('utf-8')
    data = data.split('\n')
    res = data[data.index('<tbody id="operators-list">'):]

    for line in res:
        if re.search(r'class="operator-title"', line):
            # using lookahead and lookbehind
            # preceding "?<=" must equal href=blabhlah
            # after "?=" must equal to " class="blabhalb
            operatorName = re.search(r'(?<=href="/arknights/operator/)[\w-]*(?=" class=)', line).group(0)
            if (operatorName):
                operators[operatorName] = operatorUrl + operatorName

    operators = dict(list(operators.items())[len(operators) - 290:])
    print(operators)
