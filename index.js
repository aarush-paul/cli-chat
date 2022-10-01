const io = require('socket.io-client');
const prompt = require('prompt-sync')();
const chalk = require("chalk");
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
console.log(" ");
console.log(" ");





const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

console.log(chalk.bold.bgBlue("What is your name?"));
rl.question("What is your name?", (text) => {
    const link = prompt(chalk.bgBlue('enter chat url: '));
    console.log(" ");
    const socket = io(link);
    socket.emit('new user', text.trim());
    console.log(" ");
    console.log(chalk.bgGreen("You joined the chat"));
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



