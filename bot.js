var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var currentString = 'lets go';
function respond() {
  var request = JSON.parse(this.req.chunks[0]);
  
if((String(request).length > 0) && (currentString != request.text.substring(0, request.text.length))) {
    this.res.writeHead(200);
    postMessage(request.text.substring(0, request.text.length));
    currentString = request.text.substring(0, request.text.length);
    this.res.end();
  }  
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}
  
function postMessage(response) {
  var botResponse,options, body, botReq;
  
  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;
