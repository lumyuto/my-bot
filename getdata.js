var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'quant'
});
 
connection.connect();
 
function getdata() {
    return new Promise((resolve, reject) => {
        connection.query('select * from radar', function (error, results, fields) {
        if (error) throw error;
        resolve(
        results.map(_ => ({
            img: "http://47.94.136.153:8000/fig/"+_.name+".png",
            title: _.name,
            active: _.active,
            value: '%' + (Math.floor(_.value*10000)/100),
            factor: _.factor,
        })))
        });
    })
}

module.exports = {
    getdata: getdata,
}