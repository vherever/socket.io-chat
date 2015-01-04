var app = require("http").createServer(handler),
    io = require("socket.io").listen(app),
    fs = require("fs");
app.listen(3000);
 
function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on("message", function (data) {
        socket.emit("message", data);
        socket.broadcast.emit("message", data);
    });
 
        socket.on("sender", function (data) {
        socket.emit("sender", data);
        socket.broadcast.emit("sender", data);
    });
        socket.on('disconnect', function(socket) {
        console.log('user disconnected');
    });
});

