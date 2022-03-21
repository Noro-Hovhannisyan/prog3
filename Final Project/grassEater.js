let LivingCreature = require('./LivingCreature')

module.exports = class GrassEater extends LivingCreature{
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




