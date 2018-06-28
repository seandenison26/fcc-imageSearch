//creates dependencies
const 
	path = require('path'),
	express = require('express'),
	tasks = require('./tasks')

//creates router
var router = express.Router();

var rootDir = __dirname + '/../' 

//routes the react app
router.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
});

//
//currently set up to eventually use Promis.all, currently will just save the first doc
router.get('/api/q', (req, res) => {
	const query = req.params.url

	//parse query
	//queryPixelBay
	//get search results from pixelbay api
	//access some data stoer that has the previous searches 

	Promise.resolve()
	.then(doc => tasks.clientDocDisplay(req.headers.host, doc))
	.then((doc) => { res.send(doc) })
	.catch((err) => { 
		res.send(JSON.stringify(err.message))
	})
})

//flag a doc as deleted
router.get('/:short_code', (req, res) => {
	tasks.checkForCode(req.params.short_code)
		.then((doc) => {
			res.redirect(doc.old_url)
		})
		.catch((err) => {console.log(err),res.send('CODE NOT FOUND')});
})

//exports the router
module.exports = router
