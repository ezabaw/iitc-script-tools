
var express      = require('express');
var bodyParser   = require('body-parser');

// =============================================================================

var app = express();
var server = require('http').Server(app);

server.listen(3000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

var router = express.Router();
var authRouter = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'API online and ready!' });
});

router.get('*', function noCache (req, res, next) {
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
});

app.use('/api', router);

app.use(function(req, res) { 
  res.sendfile(__dirname + '/public/index.html');
});

console.log('server running on port 3000...');
