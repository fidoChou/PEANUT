window.onload=function(){
	WIN_WIDTH = document.documentElement.clientWidth;
	WIN_HEIGHT = document.documentElement.clientHeight;
    Canvas = document.getElementById("can");
	CTX = Canvas.getContext("2d");
	BALLS=[];

	Canvas.init=function(){
		this.width = WIN_WIDTH;
		this.height = WIN_HEIGHT;
	}

	Canvas.drawball = function(x,y,r){
		CTX.fillStyle="white";
		CTX.beginPath();
		CTX.arc(x,y,r,0,2*Math.PI,true);
		CTX.closePath();
		CTX.fill();
	}

	function getBalls(num){
		for (var i = 0; i < num; i++) {
			var ball ={
				pos: {
					x: Math.random()*WIN_WIDTH,
					y: Math.random()*WIN_HEIGHT,
				},
				r: Math.random() * 10,
				vx: Math.random() * 1,  //水平速度
				vy: Math.random() * 3,  //垂直速度
				a: Math.random() * 5,
			}
			BALLS.push(ball);
		}
	}

	function drawBalls(){
		CTX.clearRect(0,0,WIN_WIDTH,WIN_HEIGHT);
		BALLS.forEach(function(ball){
			Canvas.drawball(ball.pos.x,ball.pos.y,ball.r,0,2*Math,true)
		})
	}

	function upDate(){
		BALLS.forEach(function(ball){
			ball.pos.x += ball.vx;
			ball.pos.y += ball.vy;
			if (ball.pos.y + ball.r > WIN_HEIGHT || ball.pos.y < ball.r){
				ball.vy -= ball.vy;
			}
			else if (ball.pos.x + ball.r > WIN_WIDTH|| ball.pos.x < ball.r) {
				ball.vx -= ball.vx;
			}
		});
	}

	function main() {
		getBalls(100);
		Canvas.init();
		setInterval(function(){
			drawBalls();
			upDate();
		}, 16.7)
	}

	main();
}