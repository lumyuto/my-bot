import pymysql
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sqlalchemy import create_engine
conn = create_engine('mysql+pymysql://root@localhost:3306/quant?charset=utf8')

import matplotlib.patheffects as path_effects

path = "/root/static/fig/"
def draw(series, name, active):

    plt.rcParams['figure.figsize'] = (4, 2.5) # 设置figure_size尺寸
    plt.rcParams['axes.facecolor'] = 'FFAE00' if active else '282C35'

    plt.xticks([])
    plt.yticks([])
    plt.axis('off')
    pd.Series(series).plot(linewidth = '3', color=('#ffffff' if active else '#FFAE00'), 
                path_effects=[path_effects.SimpleLineShadow(), path_effects.Normal()])
    plt.savefig(path+name+".png", bbox_inches='tight',facecolor=('#FFAE00' if active else '#282C35'))
    plt.clf()
    
def checkTarget(iD, name):
    print(iD, name)
    series = pd.read_sql_query('select * from series where target='+str(iD)+'  order by timestamp DESC limit 4320', conn)
    t = series[series['target'] == iD]
    t.index = t['timestamp']
    t = t.sort_index(ascending=False)['C'].iloc[:1440*3].sort_index()
    r = np.log(t).diff(periods=10)
    r[(r > r.std() * 4) | (r < -r.std() * 4)] = 0
    
    active = (r[-1] > r.std()*1.5) | (r[-1] < -r.std()*1.5)
    draw(t.iloc[-120:], name, active)
    
tickers = pd.read_sql_query('select id, ticker from target where source="binance"', conn)
ret_ = tickers.apply(lambda s: checkTarget(s['id'], s['ticker']), axis=1)
print(ret_)
ret = pd.DataFrame(list(ret_))
print(ret)
ret.to_sql('radar', conn, if_exists='replace')