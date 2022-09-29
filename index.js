const io = require('socket.io-client');
const prompt = require('prompt-sync')();

const link = prompt('enter chat url: ');
const socket = io(link);

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

socket.on("message", (text) => {
    process.stdout.write("\r\x1b[K")
    console.log(text);
    process.stdout.write("> ");
});

console.log("What is your name?");
rl.question("What is your name?", (text) => {
    socket.emit('new user', text.trim());
    console.log("You joined the chat");
    process.stdout.write("> ");
});

rl.prompt();

rl.on('line', (text) => {
    socket.emit('message', text.trim());
    process.stdout.write("> ");
    rl.prompt(true);
});