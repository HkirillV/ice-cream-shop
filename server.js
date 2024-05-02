const express = require('express');
const cors  = require("cors")
const Pool = require('pg').Pool
const pool = new Pool({
  user: "postgres",
  password: "123456",
  host: "localhost",
  port: 5432,
})
const PORT = 3000;

const app = express();
app.use(cors());

app.get('/icecream', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM icecream');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(200).send('Internal Server Error');
  }
});

app.post('/icecream', (req, res) => {
  const { name, quantity, expiration_date, category_id } = req.body;

  pool.query('INSERT INTO icecream (name, quantity, expiration_date, category_id) VALUES ($1, $2, $3, $4)', [name, quantity, expiration_date, category_id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).send('Ice cream added');
  });
});



app.listen(PORT, () => console.log(`server started on port ${PORT}`));