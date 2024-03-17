console.clear();
const io = require('socket.io-client');
const prompt = require('prompt-sync')();
const chalk = require("chalk");

console.clear();
console.log(chalk.bold.blue(" █████╗ ██╗     ██╗   █████╗ ██╗  ██╗ █████╗ ████████╗"));
console.log(chalk.bold.blue("██╔══██╗██║░░░░░██║  ██╔══██╗██║░░██║██╔══██╗╚══██╔══╝"));
console.log(chalk.bold.blue("██║░░╚═╝██║░░░░░██║  ██║░░╚═╝███████║███████║░░░██║░░░"));
console.log(chalk.bold.blue("██║░░██╗██║░░░░░██║  ██║░░██╗██╔══██║██╔══██║░░░██║░░░"));
console.log(chalk.bold.blue("╚█████╔╝███████╗██║  ╚█████╔╝██║░░██║██║░░██║░░░██║░░░"));
console.log(chalk.bold.blue("░╚════╝░╚══════╝╚═╝  ░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░"));
console.log(" ");
console.log(chalk.bold.blue("Made By Aarush Paul"));
console.log(chalk.yellow("https://github.com/aarush-paul/cli-chat"));
console.log(" ");
console.log(" ");





const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

console.log(chalk.bold.bgBlue("What is your name?"));
rl.question("What is your name?", (text) => {
    if (text == "") {
        console.log(" ");
        console.log(chalk.bgRed("You did not enter a name"));
        console.log(" ");
        process.exit();
    }
    const link = prompt(chalk.bgBlue('enter chat url: '));
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!link.match(regex)) {
        console.log(" ");
        console.log(chalk.bgRed("[!] You did not enter a valid chat url"));
        console.log(" ");
      process.exit();
    } else if (link == "") {
        console.log(" ");
        console.log(chalk.bgRed("You did not enter a url"));
        console.log(" ");
        process.exit();
    }
    console.log(" ");
    const socket = io(link);
    socket.emit('new user', text.trim());
    console.log(" ");
    console.log(chalk.bgGreen("You joined the chat"));
    console.log(chalk.bold.green("Press Ctrl + C anytime to quit the room"));
    console.log(" ");
    process.stdout.write("> ");
    socket.on("message", (text) => {
        process.stdout.write("\r\x1b[K")
        console.log(text);
        process.stdout.write("> ");
    });
    
    
    
    rl.prompt();
    
    rl.on('line', (text) => {
        socket.emit('message', text.trim());
        process.stdout.write("> ");
        rl.prompt(true);
    });
});



