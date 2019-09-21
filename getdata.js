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

function getSingalData() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM xueqiu_plog ' +
        'INNER JOIN xueqiu_p ON xueqiu_p.id = xueqiu_plog.p_id ' +
        'ORDER BY xueqiu_plog.created_at DESC LIMIT 50', function (error, results, fields) {
            if (error) throw error;

            const data = results.map(_ => ({
                stock_name: _.stock_name,
                stock_symbol: _.stock_symbol,
                weight_change: _.weight_change,
                p_name: _.name,
                p_desc: (_.description || '').slice(10),
                total_gain: _.total_gain,
                annualized_gain_rate: _.annualized_gain_rate,
                follower_count: _.follower_count,
            }))

            console.log(data.map(_=>p_desc))

            resolve(data);
        })
    })
}

module.exports = {
    getRadarData,
    getNewsData,
    getSingalData,
}