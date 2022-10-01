const io = require("socket.io")();
const chalk = require("chalk");
const PORT = process.env.PORT || 3000;

const users = {};
console.clear();
                                                                                                             
console.log(chalk.bold.blue("         CCCCCCCCCCCCCl llllll    iiii              CCCCCCCCCCCCC  hhhhhh                                         tttt          "));
console.log(chalk.bold.blue("      CCC::::::::::::Cl :::::l   i::::i          CCC::::::::::::C  h::::h                                      ttt:::t          "));
console.log(chalk.bold.blue("    CC:::::::::::::::Cl :::::l    iiii         CC:::::::::::::::C  h::::h                                      t:::::t          "));
console.log(chalk.bold.blue("   C:::::CCCCCCCC::::Cl :::::l                C:::::CCCCCCCC::::C  h::::h                                      t:::::t          "));
console.log(chalk.bold.blue("  C:::::C       CCCCCC  l::::l  iiiiiii      C:::::C       CCCCCC  h::::h hhhhh          aaaaaaaaaaaaa   ttttttt:::::ttttttt    "));
console.log(chalk.bold.blue(" C:::::C                l::::l  i:::::i     C:::::C                h::::hh:::::hhh       a::::::::::::a  t:::::::::::::::::t    "));
console.log(chalk.bold.blue(" C:::::C                l::::l   i::::i     C:::::C                h::::::::::::::hh     aaaaaaaaa:::::a t:::::::::::::::::t    "));
console.log(chalk.bold.blue(" C:::::C                l::::l   i::::i     C:::::C                h:::::::hhh::::::h             a::::a tttttt:::::::tttttt    "));
console.log(chalk.bold.blue(" C:::::C                l::::l   i::::i     C:::::C                h::::::h   h::::::h     aaaaaaa:::::a       t:::::t          "));
console.log(chalk.bold.blue(" C:::::C                l::::l   i::::i     C:::::C                h:::::h     h:::::h   aa::::::::::::a       t:::::t          "));
console.log(chalk.bold.blue(" C:::::C                l::::l   i::::i     C:::::C                h:::::h     h:::::h  a::::aaaa::::::a       t:::::t          "));
console.log(chalk.bold.blue("  C:::::C       CCCCCC  l::::l   i::::i      C:::::C       CCCCCC  h:::::h     h:::::h a::::a    a:::::a       t:::::t    tttttt"));
console.log(chalk.bold.blue("   C:::::CCCCCCCC::::Cl :::::: li::::::i      C:::::CCCCCCCC::::C  h:::::h     h:::::h a::::a    a:::::a       t::::::tttt:::::t"));
console.log(chalk.bold.blue("    CC:::::::::::::::Cl :::::: li::::::i       CC:::::::::::::::C  h:::::h     h:::::h a:::::aaaa::::::a       tt::::::::::::::t"));
console.log(chalk.bold.blue("      CCC::::::::::::Cl :::::: li::::::i         CCC::::::::::::C  h:::::h     h:::::h  a::::::::::aa::: a       tt:::::::::::tt"));
console.log(chalk.bold.blue("         CCCCCCCCCCCCCl llllll liiiiiiii            CCCCCCCCCCCCC  hhhhhhh     hhhhhhh   aaaaaaaaaa  aaa a         ttttttttttt  "));
console.log(" ");
console.log(chalk.bold.bgBlue.black("Made By Aarush Paul"));
console.log(chalk.yellow("https://github.com/aarush-paul/cli-chat"));
                                                                                                                     
                                                                                                                     

const ngrok = require('ngrok');
(async function() {
    const url = await ngrok.connect(3000);
    console.log(chalk.bold.green("Your chat url is:  " + chalk.bold.red(url) + ". Send to you friends and ask them to paste this link in the console after running npm run join-a-room command"));
})();
console.log(" ");
console.log(chalk.bold.bgGreen("=====CHAT SERVER LOGS(Press CTRL+Q to destroy room)====="));

    io.on("connection", (socket) => {
	    console.log(chalk.bold.cyan("[!] New Connection: ") + chalk.underline(socket.id));
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

io.listen(PORT);
