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

module.exports = {
    getRadarData,
    getNewsData
}