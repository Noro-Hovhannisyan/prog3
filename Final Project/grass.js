function rand(array){
	let i = Math.floor(Math.random()*array.length)
	return array[i]
}
let LivingCreature = require('./LivingCreature')

module.exports = class Grass{
	constructor(x,y){
		this.x = x
		this.y = y
		this.multiplay = 0
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
		let found = []
		for(const i in this.directions){
			let x = this.directions[i][0]
			let y = this.directions[i][1]
			if (x >= 0 && x < matrix[0].length  &&  y >= 0 && y < matrix.length) {
				if(matrix[x][y]==character){
					found.push(this.directions[i])
				}
			}
		}
		return found
	}

	mul(){
		this.multiplay++
		let emptyCells = this.chooseCell(0)
		let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
		if(this.multiplay >= 8 && emptyCell){
			let newX = emptyCell[0]
			let newY = emptyCell[1]
			matrix[newX][newY] = 1
			let gr = new Grass(newX,newY)
			grassArr.push(gr)
			this.multiplay = 0
		}
	}

}



