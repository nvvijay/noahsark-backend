const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

ping = async (req, res) => {
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
  }

login = async (req, res) => {
	const checklogin = 'SELECT * from users WHERE users.name=$1'
	const getprofile = 'SELECT * from user_profile WHERE user_profile.name=$1'
	const values = [res.body.user]
	output = {}
	try {
		const client = await pool.connect()
		const results = await pool.query(checklogin, values)

		if ( results["pass"] == req.body.pass ):
			output["result"] = "success"
			output["code"] = 200
			const profile = await pool.query(text, values)
			output["profile"] = profile
		else:
			output["result"] = "failure"
			output["code"] = 400
		res.send(output)
		client.release()
	} catch (err) {
		console.error(err);
		res.send("Error " + err);
	}
}
module.exports = {
	"ping": ping,
	"login": login
};