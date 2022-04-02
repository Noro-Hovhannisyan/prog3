function rand(array){
	let i = Math.floor(Math.random()*array.length)
	return array[i]
}
let LivingCreature = require('./LivingCreature')

module.exports = class GrassEater{
	constructor(x,y){
		this.x = x
		this.y = y
		this.energy = 8
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
		for(const i in this.directions){
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
		let emptyCells = this.chooseCell(0)
		let emptyCell  = rand(emptyCells)
		if(emptyCell && this.energy>0){
			this.energy--
			let newX = emptyCell[0]
			let newY = emptyCell[1]
			matrix[newX][newY] = 2
			matrix[this.x][this.y] = 0
			this.x = newX
			this.y = newY
		}
		else if(this.energy<=0){
			this.die()
		}
	}

	eat(){
		this.mul()
		let grassCells = this.chooseCell(1)
		let grassCell = rand(grassCells)

		if(grassCell && this.energy>0){
			this.energy++
			let newX = grassCell[0]
			let newY = grassCell[1]
			matrix[newX][newY] = 2
			matrix[this.x][this.y] = 0
			for(let i=0; i<grassArr.length;i++){
				if(newX==grassArr[i].x && newY==grassArr[i].y){
					grassArr.splice(i,1)
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
		if(emptyCell && this.energy>=10){
			let newX = emptyCell[0]
			let newY = emptyCell[1]
			matrix[newX][newY] = 2
			let great = new GrassEater(newX,newY)
			grassEaterArr.push(great)
			this.energy = 8
		}
	}

	die(){
		matrix[this.x][this.y] = 0
		for(let i=0; i<grassEaterArr.length; i++){
			if(this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y){
				grassEaterArr.splice(i,1)
			}
		}
	}

}





