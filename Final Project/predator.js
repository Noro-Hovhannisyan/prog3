function rand(array){
	let i = Math.floor(Math.random()*array.length)
	return array[i]
}
let LivingCreature = require('./LivingCreature')

module.exports = class Predator{
	constructor(x,y){
		this.x = x
		this.y = y
		this.energy = 12
		this.directions = []
	}

	getNewCordinates(){
		this.directions = [
			[this.x-1, this.y-1],
			[this.x  , this.y-1],
			[this.x+1, this.y-1],
			[this.x-1, this.y  ],
			[this.x+1, this.y  ],
			[this.x-1, this.y+1],
			[this.x  , this.y+1],
			[this.x+1, this.y+1]
		]
	}

	chooseCell(character){
		this.getNewCordinates()
		let found = []
		for(let i in this.directions){
			let x = this.directions[i][0]
			let y = this.directions[i][1]
			if(x>=0 && x<matrix[0].length   &&   y>=0 && y<matrix.length){
				if(matrix[x][y]==character){
					found.push(this.directions[i])
				}
			}
		}
		return found
	}

	move(){
		let emptyCells0 = this.chooseCell(0)
		let emptyCells1 = this.chooseCell(1)
		let emptyCells = [...emptyCells0, ...emptyCells1]
		let emptyCell  = rand(emptyCells)
		if(emptyCell && this.energy>0){
			this.energy--
			let newX = emptyCell[0]
			let newY = emptyCell[1]
			if(matrix[newX][newY] == 0){
			matrix[newX][newY] = 3
			matrix[this.x][this.y] = 0
			}else if(matrix[newX][newY] == 1){
				matrix[newX][newY] = 3
				matrix[this.x][this.y] = 1
				}
			this.x = newX
			this.y = newY
		}
		else if(this.energy<=0){
			this.die()
		}
	}

	eatE(){
		this.mul()
		let predatorCells = this.chooseCell(2)
		let predatorCell = rand(predatorCells)

		if(predatorCell && this.energy>0){
			this.energy+=2
			let newX = predatorCell[0]
			let newY = predatorCell[1]
			matrix[newX][newY] = 3
			matrix[this.x][this.y] = 0
			for(let i=0; i<grassEaterArr.length;i++){
				if(newX==grassEaterArr[i].x && newY==grassEaterArr[i].y){
					grassEaterArr.splice(i,1)
				}
			}
			this.x = newX
			this.y = newY
		}
		else{
			this.move()
		}
	}

	eatB(){
		this.mul()
		var age
		let predatorCells = this.chooseCell(4)
		let predatorCell = rand(predatorCells)

		if(predatorCell && this.energy>0){
			let newX = predatorCell[0]
			let newY = predatorCell[1]

			for (let i = 0; i < boyArr.length; i++) {
				
				if(newX==boyArr[i].x && newY==boyArr[i].y){
					var age = boyArr[i].age
				}
					
				
			}
			
			if(age && age<12){
				this.energy+=4
			let newX = predatorCell[0]
			let newY = predatorCell[1]
			matrix[newX][newY] = 3
			matrix[this.x][this.y] = 0
			for(let i=0; i<boyArr.length;i++){
				if(newX==boyArr[i].x && newY==boyArr[i].y){
					boyArr.splice(i,1)
				}
			}
			this.x = newX
			this.y = newY
			}
			
		}
		else{
			this.move()
		}
	}

	eatG(){
		this.mul()
		let predatorCells = this.chooseCell(5)
		let predatorCell = rand(predatorCells)

		if(predatorCell && this.energy>0){
			
			this.energy+=3
			let newX = predatorCell[0]
			let newY = predatorCell[1]
			matrix[newX][newY] = 3
			matrix[this.x][this.y] = 0
			for(let i=0; i<girlArr.length;i++){
				if(newX==girlArr[i].x && newY==girlArr[i].y){
					girlArr.splice(i,1)
				}
			}
			this.x = newX
			this.y = newY
		}
		else{
			this.move()
		}
	}

	mul(){
		let emptyCells = this.chooseCell(0)
		let emptyCell = rand(emptyCells)
		if(emptyCell && this.energy>=18){
			let newX = emptyCell[0]
			let newY = emptyCell[1]
			matrix[newX][newY] = 3
			let predator = new Predator(newX,newY)
			predatorArr.push(predator)
			this.energy = 12	
		}
	}

	die(){
		matrix[this.x][this.y] = 0
		for(let i=0; i<predatorArr.length; i++){
			if(this.x == predatorArr[i].x && this.y == predatorArr[i].y){
				predatorArr.splice(i,1)
			}
		}
	}

}




