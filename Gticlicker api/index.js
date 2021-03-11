const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {pool} = require("./config");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
const getUsers = (req, res) => {
    pool.query('SELECT * FROM userlist', (err, results) => {
        if(err){
            throw err;
        }
        res.status(200).json(results.rows);
    });
}
const addUser = (req, res) => {
    const {username, score} = req.body;
    pool.query(
        'INSERT INTO userlist (username, score) VALUES ($1, $2)',
        [username, score],
        (err) => {
            if(err){
                throw err;
            }
            res.status(201).json({status: "success", message: "User added."});
        },
    );
}
app.route("/users").get(getUsers).post(addUser);
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server listening`);
});