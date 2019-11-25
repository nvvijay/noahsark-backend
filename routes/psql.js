var express = require('express');
var router = express.Router();
var psqlController = require('../public/javascripts/PSQLController');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

/* GET listing. */
router.get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test');
      const results = { 'results': (result) ? result.rows : null};
      res.send( results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

/* GET listing. 
router.get('/users/', psqlController.getList);
router.post('/login/:id', psqlController.login);
router.delete('/users/:id', psqlController.deleteItem);

*/

module.exports = router;
