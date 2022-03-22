const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mysql = require('mysql')


// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mary@31547207",
    database: "schoolproject"
})

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})


app.post('/register_admin', (req, res) => {

    // INSERT INTO table_name
    // VALUES (value1, value2, value3, ...);
    console.log(req.body);
    let adminObject = req.body;

    var fetchData = ` INSERT INTO admin VALUES (${adminObject.adminname}, ${adminObject.adminemail}, ${adminObject.adminpassword})`;
    db.query(fetchData, (err, result) => {
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

        res.send(result);
    })

});



//create connection
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))