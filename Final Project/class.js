class Grass{
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



class GrassEater{
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



class Predator{
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



class Boy{
	constructor(x,y){
		this.x = x
		this.y = y
		this.energy = 100
		this.age = 0	
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
			if (x>=0 && x<matrix[0].length   &&   y>=0 && y<matrix.length) {
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



class Girl{
	constructor(x,y){
		this.x = x
		this.y = y
		this.energy = 100
		this.age = 0	
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
			if (x>=0 && x<matrix[0].length   &&   y>=0 && y<matrix.length) {
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










