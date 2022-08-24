const express = require('express');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3001;
const connectedUsers = {};

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static(__dirname + '/assets/'));

// app.get('/', function(req, res) {
// 	res.send('wELCOM');
// })

// Socket
const io = require('socket.io')(http, {
  cors: {
    origin: [
      'https://virtualcurrency.archdubai.com',
      '*',
      'http://winjoy.incubyter.com',
      'https://winjoy.incubyter.com',
      'https://winjoy.ae',
      'https://incubyter.com',
      'http://127.0.0.1:8000/',
      'http://localhost:8081/',
      'https://testing.winjoy.ae',
      'https://testing.winjoy.ae/',
    ],
    credentials: true,
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
  },
  allowEIO3: true,
});

io.on('connection', socket => {
  const users = {};
  //ProductLiveLuckydraw

  console.log('Connected socket-> :', socket.id);
  const count = io.engine.clientsCount;
  let msg = 'LiveGameStart';
  socket.emit('start', msg);
  socket.emit('sendCount', count);

  // onboard
  socket.on('on_board', msg => {
    console.log('on_board should start', msg);
    // let msg = "live";
    io.emit('sendOnboard', msg);
  });
  // Productlivestream
  socket.on('Productlivestream', msg => {
    console.log('Prodct live stream should start', msg);
    //let msg = "live";
    io.emit('startProductlivestream', msg);
  });
  //startedLuckydraw
  socket.on('sendProductStart', msg2 => {
    console.log('live game should start', msg2);
    let msg = 'Luckydraw started';
    io.emit('sendProductStartlive', msg2);
  });
  //showWinner
  socket.on('showProductWinner', msg4 => {
    console.log('Winner should show', msg4);
    let msg = 'Winner should show';
    io.emit('sendShowProductWinner', msg4);
  });
  //hideWinner
  socket.on('hideProductWinner', msg4 => {
    console.log('Winner should hide', msg4);
    let msg = 'Winner should hide';
    io.emit('sendHideProductWinner', msg4);
  });
  //BuyProduct
  socket.on('BuyProduct', msg3 => {
    console.log('Buyproducts', msg3);
    let msg = 'Product addtocart';
    io.emit('sendBuyProduct', msg3);
  });
  //endluckydraw
  socket.on('endLuckydraw', msg4 => {
    console.log('Luckydraw should end now', msg4);
    let msg = 'Screen should switch';
    io.emit('sendEndLuckydraw', msg4);
  });
  //username
  socket.on('newUser', name => {
    console.log(name);
    users[socket.id] = name;
    socket.broadcast.emit('userConnected', name);
  });
  //Chat
  socket.on('sendChatMessage', message => {
    console.log('message', message);
    socket.broadcast.emit('sendMessage', {
      message: message,
      name: users[socket.id],
    });
  });

  //LiveGameShow

  // onboarding
  socket.on('on_boarding', msg => {
    console.log('on_boarding should start', msg);
    // let msg = "live";
    io.emit('sendOnboarding', msg);
  });
  socket.on('livestream', msg => {
    console.log('live stream should start', msg);
    // let msg = "live";
    io.emit('startlivestream', msg);
  });
  socket.on('sendStartGameshow', msg2 => {
    console.log('live game should start', msg2);
    let msg = 'Gameshow started';
    io.emit('sendStartlivegameshow', msg2);
  });
  socket.on('switchNextQuestion', msg3 => {
    console.log('Next question should switch now', msg3);
    let msg = 'Question should switch';
    io.emit('sendSwitchNextQuestion', msg3);
  });
  socket.on('showCorrectAnswer', msg4 => {
    console.log('Show correct answer switch now', msg4);
    let msg = 'Correct answer should show';
    io.emit('sendShowCorrectAnswer', msg4);
  });
  socket.on('hideQuestion', msg4 => {
    console.log('Question Should hide', msg4);
    let msg = 'Question should hide';
    io.emit('sendHideQuestion', msg4);
  });
  socket.on('hideAnswer', msg4 => {
    console.log('Answer Should hide', msg4);
    let msg = 'Answer should hide';
    io.emit('sendHideAnswer', msg4);
  });
  socket.on('showWinners', msg4 => {
    console.log('Winners should show', msg4);
    let msg = 'Winners should show';
    io.emit('sendShowWinners', msg4);
  });
  socket.on('hideWinners', msg4 => {
    console.log('Winners should hide', msg4);
    let msg = 'Winners should hide';
    io.emit('sendHideWinners', msg4);
  });
  socket.on('endShow', msg4 => {
    console.log('Game should end now', msg4);
    let msg = 'Question should switch';
    io.emit('sendEndShow', msg4);
  });
});
