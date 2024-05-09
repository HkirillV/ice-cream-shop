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
app.use(express.json())

app.get('/icecream', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM icecream');

    const categoryMap = {
      1: 'Шоколадное',
      2: 'Сливочное'
    };

    const icecreamData = result.rows.map(item => {
      return {
        ...item,
        category_id: categoryMap[item.category_id]
      };
    });

    res.json(icecreamData);
  } catch (err) {
    console.error(err);
    res.status(200).send('Internal Server Error');
  }
});

app.post('/icecream', (req, res) => {
  const {id, category_id, name, manufacturer, price} = req.body;

  pool.query('INSERT INTO icecream (id, category_id, name, manufacturer, price) VALUES ($1, $2, $3, $4, $5)', [id, category_id, name, manufacturer, price], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).json({ message: 'Ice cream added' });
  });
});

app.delete('/icecream/:id', async (req, res) => {
  const idToDelete = req.params.id;

  try {
    const query = 'DELETE FROM icecream WHERE id = $1';
    const result = await pool.query(query, [idToDelete]);

    res.status(200).json({message:'Ice cream with ID ' + idToDelete + ' deleted successfully'});
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({message:'Error deleting ice cream'});
  }
});

app.put('/icecream/:id', async (req, res) => {
  const idToUpdate = req.params.id;
  const { category_id, name, manufacturer, price } = req.body;

  try {
    const query = 'UPDATE icecream SET category_id = $1, name = $2, manufacturer = $3, price = $4 WHERE id = $5';
    const result = await pool.query(query, [category_id, name, manufacturer, price, idToUpdate]);

    res.status(200).json({message:'Ice cream with ID ' + idToUpdate + ' updated successfully'});
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({message:'Error updating ice cream'});
  }
});



//category


app.get('/ice_cream_categories', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM ice_cream_categories');

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(200).json('Internal Server Error');
  }
});

app.post('/ice_cream_categories', (req, res) => {
  const {id, name} = req.body;

  pool.query('INSERT INTO ice_cream_categories (id, name) VALUES ($1, $2)', [id, name], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).json({ message: 'Ice cream added' });
  });
});


app.listen(PORT, () => console.log(`server started on port ${PORT}`));