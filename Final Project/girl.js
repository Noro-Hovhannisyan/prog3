function rand(array){
	let i = Math.floor(Math.random()*array.length)
	return array[i]
}
let LivingCreature = require('./LivingCreature')

module.exports = class Girl extends LivingCreature{
	constructor(x,y){
		super(x,y)
		this.energy = 100
		this.age = 0	
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
			matrix[newX][newY] = 5
			matrix[this.x][this.y] = 0
			}else if(matrix[newX][newY] == 1){
				matrix[newX][newY] = 5
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
		let girlCells = this.chooseCell(2)
		let girlCell = rand(girlCells)

		if(girlCell && this.energy>0){
			this.energy+=4
			this.age++
			let newX = girlCell[0]
			let newY = girlCell[1]
			matrix[newX][newY] = 5
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



	mul(){
		let emptyCells = this.chooseCell(0)
		let emptyCell = rand(emptyCells)
		let emptyBoys = this.chooseCell(4)
		let emptyBoy = rand(emptyBoys) 
		if(emptyCell && emptyBoy && this.proposal()==true){
			let newX = emptyCell[0]
			let newY = emptyCell[1]
			let gender = Math.round(Math.random())
			if(gender==1){
				matrix[newX][newY] = 4
				let boy = new Boy(newX,newY)
				boyArr.push(boy)
			}
			else if(gender==0){
				matrix[newX][newY] = 5
				let girl = new Girl(newX,newY)
				girlArr.push(girl)
			}
		}
	}

	die(){
		matrix[this.x][this.y] = 0
		for(let i=0; i<girlArr.length; i++){
			if(this.x == girlArr[i].x && this.y == girlArr[i].y){
				girlArr.splice(i,1)
			}
		}
	}

	proposal(){
		let L = Math.round(Math.random())
		if(L==1){
			L = true
		}
		else if(L==0){
			L = false
		}
		return L
	}
}

