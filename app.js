var twilio = require('twilio');
var numbers = ['2403825553', '2403825553'];
var client = new twilio('ACb615bf6eff723ed1cd6c2865c6d76138', '34bed1cda2f790fc3af1a84a0d8f24ee'),
cronJob = require('cron').CronJob;
var express = require('express');
bodyParser = require('body-parser');
var MessagingResponse = require('twilio').twiml.MessagingResponse;
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var textJob = new cronJob( '04 19 * * *', function(){
	for( var i = 0; i < numbers.length; i++ ) {
  		client.messages.create( { to:numbers[i], from:'6306569420', body:"You're so skinny, your mom actually enjoyed your birth."}, function( err, data ) {
    		console.log( data.body );
  		});
	}
},  null, true);
app.post('/message', function (req, res) {
  var resp = new MessagingResponse();
  resp.message('Thanks for subscribing!');
  res.writeHead(200, {
    'Content-Type':'text/xml'
  });
  res.end(resp.toString());
});
var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});