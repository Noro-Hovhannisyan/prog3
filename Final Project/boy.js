let LivingCreature = require('./LivingCreature')

module.exports = class Boy extends LivingCreature{
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
			matrix[newX][newY] = 4
			matrix[this.x][this.y] = 0
			}else if(matrix[newX][newY] == 1){
				matrix[newX][newY] = 4
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
		let boyCells = this.chooseCell(2)
		let boyCell = rand(boyCells)

		if(boyCell && this.energy>0){
			this.energy++
			this.age+=4
			let newX = boyCell[0]
			let newY = boyCell[1]
			matrix[newX][newY] = 4
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

	eatP(){
		let boyCells = this.chooseCell(3)
		let boyCell = rand(boyCells)

		if(boyCell && this.energy>0 && this.age>16){
			this.energy++
			let newX = boyCell[0]
			let newY = boyCell[1]
			matrix[newX][newY] = 4
			matrix[this.x][this.y] = 0
			for(let i=0; i<predatorArr.length;i++){
				if(newX==predatorArr[i].x && newY==predatorArr[i].y){
					predatorArr.splice(i,1)
				}
			}
			this.x = newX
			this.y = newY
		}
		else{
			this.move()
		}
	}

	die(){
		matrix[this.x][this.y] = 0
		for(let i=0; i<boyArr.length; i++){
			if(this.x == boyArr[i].x && this.y == boyArr[i].y){
				boyArr.splice(i,1)
			}
		}
	}
}



