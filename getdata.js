var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'lumotian',
  database : 'quant'
});
 
connection.connect();
 
connection.query('select * from radar', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
//   console.log('The solution is: ', results[0].solution);
});