const io = require("socket.io")();

const PORT = process.env.PORT || 3000;

const users = {};

const ngrok = require('ngrok');
(async function() {
    const url = await ngrok.connect(3000);
    console.log("Your chat url is:  " + url + ". Send to you friends and ask them to paste this link in the console after running npm run join-a-room command");
})();
console.log(" ");
console.log("=====CHAT SERVER LOGS=====");

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


io.listen(PORT);
