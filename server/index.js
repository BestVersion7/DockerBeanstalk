import express from "express";
import pg from "pg";
const { Pool } = pg;
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
    user: "postgres",
    password: "password",
    database: "sample",
    // host: "localhost",
    host: process.env.PG_HOST,
    port: 5432,
});

const app = express();
app.use(express.json());

app.get("/api/1", async (req, res) => {
    try {
        const allUser = await pool.query("SELECT * FROM account;");
        // const allUser = await pool.query("SELECT * FROM account WHERE account_id = 1;");
        res.json(allUser.rows);
    } catch (err) {
        return res.status(400).json(err.message);
    }
});

app.get('/api/:id', async (req, res) => {
    try {
        const {id} = req.params
        const allUser = await pool.query("SELECT * FROM account WHERE account_id = $1;", [id]);
        // console.log(allUser)
        res.json(allUser.rows[0]);
    } catch (err) {
        return res.status(400).json(err.message);
    }
});


app.use(express.static("client"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve("client/index.html"));
})


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
