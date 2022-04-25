const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname ));


// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "schoolproject"
})

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})


/**
 * "fieldCount": 0,
 *     "affectedRows": 1,
 *     "insertId": 3,
 *     "serverStatus": 2,
 *     "warningCount": 0,
 *     "message": "",
 *     "protocol41": true,
 *     "changedRows": 0
 */

app.post('/register_admin', (req, res) => {

    // INSERT INTO table_name
    // VALUES (value1, value2, value3, ...);
    console.log(req.body);
    let adminObject = req.body;
    let table = "admin";
    //columns
    let adminname = "adminname";
    let adminemail = "adminemail";
    let adminpassword = "adminpassword";

    db.query("INSERT INTO " + table + " SET ?", req.body, (err, result) => {
        if (err) throw err

        console.log(result);

        res.send(result);
    })

});



app.get('/fetch_admin', (req, res) => {

    var fetchData = "SELECT * FROM admin";
    db.query(fetchData, (err, result) => {
        if (err) throw err

        console.log(result);

        res.send(
            result
        );
    })

});

app.post('/login_admin', (req, res) => {
    let adminemail = "adminemail";
    let adminpassword = "adminpassword";

    var fetchData =  "SELECT * FROM admin WHERE adminemail ="+
        mysql.escape(req.body.adminemail)  +" AND adminpassword="+
        mysql.escape(req.body.adminpassword);
    db.query(fetchData, (err, result) => {
        if (err) throw err

        console.log(result);

        res.send(
            result
        );
    })

});

let array = [1,3,6,4,1,2];
//let array = [-1, -3];
let soln = algo(array);
console.log(soln);
function algo(array){
array.sort();

// for(let i=0;i<array.length;i++){
//     console.log(array[i]);
//     }

let smallestValue = array[0];
let largestValue = array[array.length-1];

    for(let i=smallestValue;i<largestValue+1;i++){
        console.log(` i: ${i}`);
        if (!array.includes(i)){
            if(i<0){
                return 1;
            }
            return  i;
        }
    }

    if (smallestValue === 1) {
        return largestValue + 1;
    } else if (smallestValue < 1) {
        return 1;
    }

}


//create connection
const PORT = process.env.PORT || 3000
app.listen(PORT, "127.0.0.1",() => console.log(`Server is running at port ${PORT}`))