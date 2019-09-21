var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'quant'
});
 
connection.connect();
 
function getRadarData() {
    return new Promise((resolve, reject) => {
        connection.query('select * from radar', function (error, results, fields) {
        if (error) throw error;
        resolve(
        results.map(_ => ({
            img: "http://47.94.136.153:8000/fig/"+_.name+".png",
            title: _.name,
            active: _.active,
            value: Math.floor(_.value*10000)/100 + '%',
            value_color: _.value>0 ? '#F2564E' : '#17A56B',
            factor: _.factor,
        })))
        });
    })
}

function getNewsData() {
    return new Promise((resolve, reject) => {
        connection.query('select * from news order by timestamp desc limit 40 ', function (error, results, fields) {
        if (error) throw error;
        resolve(
            results.map(_ => ({
                time: _.time,
                title: _.title,
            })))
        });
    })
}

const bug_img = 'http://dbp-resource.gz.bcebos.com/2428e786-8d60-d103-925a-55f1b4739400/buy.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T19%3A50%3A29Z%2F-1%2F%2Fd0e3f0acebcd7965a57282061ee1b5c92139c27fcbe5ff83030a7692340957a2'
const sell_img = 'http://dbp-resource.gz.bcebos.com/2428e786-8d60-d103-925a-55f1b4739400/sell.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T19%3A50%3A29Z%2F-1%2F%2Fa4493d560a68f23c8205c1d03c7a5dcb8b23609fddb617675553f639d742a618'

function getSingalData() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM xueqiu_plog ' +
        'INNER JOIN xueqiu_p ON xueqiu_p.id = xueqiu_plog.p_id ' +
        'ORDER BY xueqiu_plog.created_at DESC LIMIT 10', function (error, results, fields) {
            if (error) throw error;

            const data = results.map(_ => ({
                time: _.created_at.toISOString().slice(5,10) +' '+ _.created_at.toISOString().slice(11,16),
                stock_name: _.stock_name,
                stock_symbol: _.stock_symbol,
                weight_change: _.weight_change,
                buy_sell_icon: _.weight_change > 0 ? bug_img: sell_img,
                p_name: _.name,
                p_desc: (_.description || '').slice(0,4),
                total_gain: _.total_gain,
                annualized_gain_rate: _.annualized_gain_rate,
                follower_count: _.follower_count,
            }))

            resolve(data);
        })
    })
}

module.exports = {
    getRadarData,
    getNewsData,
    getSingalData,
}