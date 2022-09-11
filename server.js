const io = require("socket.io")();

const PORT = process.env.PORT || 3000;

const users = {};

const ngrok = require('ngrok');
(async function() {
    const url = await ngrok.connect(3000);
    console.log("Your chat url is:  " + url + ". Send to you friends and ask them to paste this link in the console after running npm run join-a-room command");
})();
console.log(" ");
console.log("=====CHAT SERVER LOGS(Press CTRL+Q to destroy room)=====");

    io.on("connection", (socket) => {
	    console.log("New Connection: " + socket.id);
        socket.on('new user', (name) => {
            users[socket.id] = name;
            socket.broadcast.emit("message", `${name} joined the chat.`)
        });

        socket.on('message', (text) => {
            socket.broadcast.emit("message", `${users[socket.id]} > ${text}`);
        });
    });
    var stdin = process.stdin;

    // without this, we would only get streams once enter is pressed
    stdin.setRawMode( true );
    
    // resume stdin in the parent process (node app won't quit all by itself
    // unless an error or process.exit() happens)
    stdin.resume();
    
    // i don't want binary, do you?
    stdin.setEncoding( 'utf8' );
    
    // on any data into stdin
    stdin.on( 'data', function( key ){
      // ctrl-c ( end of text )
      if ( key === '\u0011' ) {
        (async function() {await ngrok.disconnect(url);}());
        process.exit();
      }
      // write the key to stdout all normal like
      process.stdout.write( key );
    });

io.listen(PORT);
