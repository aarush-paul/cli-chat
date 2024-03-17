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
console.log(chalk.bold.blue("         ,,                                        "));
console.log(chalk.bold.blue("        `7MM           mm     mm                   "));
console.log(chalk.bold.blue("          MM           MM     MM                   "));
console.log(chalk.bold.blue(' ,p6"bo   MM   ,6"Yb.mmMMmm mmMMmm .gP"Ya `7Mb,od8 '));
console.log(chalk.bold.blue(`6M'  OO   MM  8)   MM  MM     MM  ,M'   Yb  MM' "' `));
console.log(chalk.bold.blue('8M        MM   ,pm9MM  MM     MM  8M""""""  MM     '));
console.log(chalk.bold.blue("YM.    ,  MM  8M   MM  MM     MM  YM.    ,  MM     "));
console.log(chalk.bold.blue(" YMbmd' .JMML.`Moo9^Yo.`Mbmo  `Mbmo`Mbmmd'.JMML.   "));
console.log(chalk.bold.blue(" ██████╗███████╗██████╗ ██╗   ██╗███████╗██████╗   "));
console.log(chalk.bold.blue("██╔════╝██╔════╝██╔══██╗██║░░░██║██╔════╝██╔══██╗  "));
console.log(chalk.bold.blue("╚█████╗░█████╗░░██████╔╝╚██╗░██╔╝█████╗░░██████╔╝  "));
console.log(chalk.bold.blue("░╚═══██╗██╔══╝░░██╔══██╗░╚████╔╝░██╔══╝░░██╔══██╗  "));
console.log(chalk.bold.blue("██████╔╝███████╗██║░░██║░░╚██╔╝░░███████╗██║░░██║  "));
console.log(chalk.bold.blue("╚═════╝░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝  "));
console.log(" ");
console.log(chalk.bold.blue("Made By Aarush Paul"));
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
  console.log(chalk.bold.green("[i] Your chat url is:  " + chalk.bold.red(tunnel.url) + ". Run `clatter join` on another terminal window and enter this url to join. Send this url to your friends and ask them to paste this link in the console after running `clatter "));
})();
console.log(" ");
console.log(chalk.bold.bgGreen("=====CHATROOM LOGS(Press CTRL+Q to destroy room)====="));

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
