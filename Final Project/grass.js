let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature{

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



