
var socket =io()
var side =10
function setup(){
	createCanvas(50* side, 50 * side)
	background("pink")}




function nkarel(matrix){
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
	
}

socket.on("send matrix", nkarel);