//լոկալհոստ
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(6676);

/*--------------------------------------------------------*/


matrix = []
function matrixGen(n, gr, grEat, predator,boy,girl){
	for(let x = 0; x < n; x++){
		matrix[x] = []
		for(let y = 0; y < n; y++){
			matrix[x][y] = 0
		}
	}

	for(let i = 0; i < gr; i++){
		let x = Math.floor(Math.random() * n)
		let y = Math.floor(Math.random() * n)

		if(matrix[x][y]==0){
			matrix[x][y]=1
		}else{
			i--
		}
	}

	for(let i = 0; i < grEat; i++){
		let x = Math.floor(Math.random() * n)
		let y = Math.floor(Math.random() * n)
		if(matrix[x][y]==0){
			matrix[x][y]=2
		}else{
			i--
		}
	}

	for(let i = 0; i < predator; i++){
		let x = Math.floor(Math.random() * n)
		let y = Math.floor(Math.random() * n)
		if(matrix[x][y]==0){
			matrix[x][y]=3
		}else{
			i--
		}
	}

	for(let i = 0; i < boy; i++){
		let x = Math.floor(Math.random() * n)
		let y = Math.floor(Math.random() * n)
		if(matrix[x][y]==0){
			matrix[x][y]=4
		}else{
			i--
		}
	}
	for(let i = 0; i < girl; i++){
		let x = Math.floor(Math.random() * n)
		let y = Math.floor(Math.random() * n)
		if(matrix[x][y]==0){
			matrix[x][y]=5
		}else{
			i--
		}
	}
}
/*----------------------------------------------*//*------------------------------*/
io.sockets.emit('send matrix',matrix)

grassArr = []
grassEaterArr = []
predatorArr = []
boyArr = []
girlArr = []

Grass = require("./Grass")
GrassEater = require("./GrassEater")
Predator = require("./predator")
Boy = require("./boy")
Girl = require("./girl")

function creatingobjects(){


	for(let x=0; x<matrix.length; x++){
		for(let y=0; y<matrix[x].length; y++){
			if (matrix[x][y]==1){
				let gr = new Grass(x,y)
				grassArr.push(gr)
			}
			else if(matrix[x][y]==2){
				let great = new GrassEater(x,y)
				grassEaterArr.push(great)
			}
			else if(matrix[x][y]==3){
				let predator = new Predator(x,y)
				predatorArr.push(predator)
			}
			else if(matrix[x][y]==4){
				let boy = new Boy(x,y)
				boyArr.push(boy)
			}
			else if(matrix[x][y]==5){
				let girl = new Girl(x,y)
				girlArr.push(girl)
			}
		}
	}
	io.sockets.emit('send matrix', matrix)
}


function game(){
	for(const i in grassArr){
		grassArr[i].mul()
	}
	for(const i in grassEaterArr){
		grassEaterArr[i].eat()
	}
	for(const i in predatorArr){
		predatorArr[i].eatE()
	}
	for(const i in predatorArr){
		predatorArr[i].eatB()
	}
	for(const i in predatorArr){
		predatorArr[i].eatG()
	}
	for(const i in boyArr){
		boyArr[i].eatE()
	}
	for(const i in boyArr){
		boyArr[i].eatP()
	}
	for(const i in girlArr){
		girlArr[i].eatE()
	}
	io.sockets.emit("send matrix", matrix);
}
setInterval(game, 500)

io.on("connection",function(socket){
	matrixGen(100,5100,2000,600,400,400);
	creatingobjects()
})