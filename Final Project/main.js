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
var side = 8
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var boyArr = []
var girlArr = []

function setup(){
	frameRate(2)
	createCanvas(matrix[0].length * side, matrix.length * side)
	background("pink")

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

}


function draw(){
	for(let x=0; x<matrix.length; x++){
		for(let y = 0; y<matrix[x].length; y++){

			if(matrix[x][y]==1){
				fill("green")
			}
			else if(matrix[x][y]==0){
				fill("grey")
			}
			else if(matrix[x][y]==2){
				fill("yellow")
			}
			else if(matrix[x][y]==3){
				fill("red")
			}
			else if(matrix[x][y]==4){
				fill("blue")
			}
			else if(matrix[x][y]==5){
				fill("pink")
			}			
			rect(y * side, x * side, side,side)
		}
	}
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
}