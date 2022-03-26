var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


function rand(array){
	let i = Math.floor(Math.random()*array.length)
	return array[i]
}
var matrix = []
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
/*----------------------------------------------*/matrixGen(100,5100,2000,600,400,400)/*------------------------------*/
