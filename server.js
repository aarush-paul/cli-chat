console.clear();
const CLI = require('clui');
const Spinner = CLI.Spinner;
var countdown = new Spinner('Importing modules  ', ['◜','◠','◝','◞','◡','◟']);
var countdown2 = new Spinner('Starting Up  ', ['◜','◠','◝','◞','◡','◟']);
var countdown3 = new Spinner('', [' ',' ',' ',' ',' ',' ']);
countdown.start();
const io = require("socket.io")();
const chalk = require("chalk");
const prompt = require("prompt-sync")({ sigint: true });
const localtunnel = require('localtunnel');
console.log(chalk.bold.blue("█▀▀ █   █   █▀▀ █ █ ▄▀█ ▀█▀                      "));
console.log(chalk.bold.blue("█▄▄ █▄▄ █   █▄▄ █▀█ █▀█  █                       "));
console.log(chalk.bold.blue("░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ "));
console.log(chalk.bold.blue("░██████╗███████╗██████╗░██╗░░░██╗███████╗██████╗░"));
console.log(chalk.bold.blue("██╔════╝██╔════╝██╔══██╗██║░░░██║██╔════╝██╔══██╗"));
console.log(chalk.bold.blue("╚█████╗░█████╗░░██████╔╝╚██╗░██╔╝█████╗░░██████╔╝"));
console.log(chalk.bold.blue("░╚═══██╗██╔══╝░░██╔══██╗░╚████╔╝░██╔══╝░░██╔══██╗"));
console.log(chalk.bold.blue("██████╔╝███████╗██║░░██║░░╚██╔╝░░███████╗██║░░██║"));
console.log(chalk.bold.blue("╚═════╝░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝"));
console.log(" ");
console.log(chalk.bold.bgBlue.white("Made By Aarush Paul"));
console.log(" ");
console.log(chalk.yellow("https://github.com/aarush-paul/cli-chat"));
console.log(" ");
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
sleep(5000)
  .then(() => countdown.stop())
  .then(() => countdown2.start())
  .then(() => sleep(2000))
  .then(() => countdown2.stop())

sleep(8000).then(() => {
const port = prompt("Enter the port you want to use (must be between 1025 and 65535): ");
if (port < 1025 || port > 65535) {
    console.log(chalk.bold.red("[!] Invalid Port!"));
    process.exit();
}
const users = {};                                                                                                                  
io.listen(port);


(async () => {
  const tunnel = await localtunnel({ port: port});
  console.log(chalk.bold.green("[i] Your chat url is:  " + chalk.bold.red(tunnel.url) + ". Send to you friends and ask them to paste this link in the console after running npm run join-a-room command"));
})();
console.log(" ");
console.log(chalk.bold.bgGreen("=====CHAT SERVER LOGS(Press CTRL+Q to destroy room)====="));

    io.on("connection", (socket) => {
	    console.log(chalk.bold.cyan("[!] New Connection: ") + chalk.dim.underline(socket.id));
        socket.on('new user', (name) => {
            users[socket.id] = chalk.bold.yellow(name);
            socket.broadcast.emit("message", ` `);
            socket.broadcast.emit("message", chalk.bgYellow(`${name} joined the chat.`));
            socket.broadcast.emit("message", ` `);
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

  });
