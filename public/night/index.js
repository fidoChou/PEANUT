window.onload = function(){
	WIN_WIDTH = document.documentElement.clientWidth;
	WIN_HEIGHT = document.documentElement.clientHeight;
	BG = document.getElementById("bg");
	BG.width = WIN_WIDTH
	BG.height = WIN_HEIGHT
	BG.stars=[];
	CTX1 = BG.getContext('2d');
	BG.getStars = function(num){
		for (var i = 0; i < num; i++) {
			var star = {
				R:Math.random()*10,
				r:Math.random()*5,
				x:Math.random()*WIN_WIDTH,
				y:Math.random()*200,
				rot:Math.random()*360
			}
		BG.stars.push(star)	
		}
	}
	BG.getStars(100)
	BG.stars.forEach(function(star){
		drawStar(CTX1,star.R,star.r,star.x,star.y,star.rot);
	})

 
	function dToR(degree){
	  return degree * (Math.PI / 180);
	}
	function drawStar(ctx,R,r,x,y,rot){
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "#DBF0F0";
		ctx.shadowColor="white";
		ctx.lineWidth = 3;
		for(var i = 0 ; i < 5 ; i++){      	
			ctx.lineTo(Math.cos( dToR(18 + i * 72) ) * R + x,
					   -Math.sin( dToR(18 + i * 72) ) * R + y);
			ctx.lineTo(Math.cos( dToR(54 + i * 72) ) * r + x,
					   -Math.sin( dToR(54 + i * 72) ) * r + y)

		}
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
	function drawMoon(ctx,x,y,r){
		ctx.save()
		ctx.beginPath();
		ctx.shadowColor="white";
		ctx.shadowBlur=30;
		ctx.arc(x, y, r, 1.3 * Math.PI, 0 ,true);
		var endx = x-Math.cos(Math.PI*0.3)*r;
		var endy = y - Math.sin(Math.PI*0.3)*r
		ctx.bezierCurveTo(280, 180, 100, 150, endx, endy)
		ctx.fillStyle = "#E0FFFF";  
		ctx.fill();
		ctx.restore();
	}
	drawMoon(CTX1,200,100,80);
	
	canvas2 = document.getElementById('wind')	
	CTX2 = canvas2.getContext('2d')
	canvas2.width = WIN_WIDTH
	canvas2.height = WIN_HEIGHT
	function drawTower(ctx,tower){
		// 右墙
		ctx.save();
		ctx.moveTo(WIN_WIDTH-tower.right+30,WIN_HEIGHT);
		ctx.beginPath();
		ctx.lineTo(WIN_WIDTH-tower.right-tower.width,WIN_HEIGHT);
		ctx.lineTo(WIN_WIDTH-tower.right-tower.width,WIN_HEIGHT-tower.height)
		ctx.lineTo(WIN_WIDTH-tower.right-(tower.width/2),WIN_HEIGHT-tower.height);
		ctx.lineTo(WIN_WIDTH-tower.right+10,WIN_HEIGHT);
		ctx.fillStyle="rgb(174,174,174)";
		ctx.closePath();
		ctx.fill();
		ctx.restore();
		// 中间
		ctx.save();
		ctx.moveTo(WIN_WIDTH-tower.right-tower.width,WIN_HEIGHT);
		ctx.beginPath();
		ctx.lineTo(WIN_WIDTH-tower.right-tower.width,WIN_HEIGHT);
		ctx.lineTo(WIN_WIDTH-tower.right-tower.width,WIN_HEIGHT-tower.height)
		ctx.lineTo(WIN_WIDTH-tower.right-2*(tower.width),WIN_HEIGHT-tower.height);
		ctx.lineTo(WIN_WIDTH-tower.right-2*(tower.width),WIN_HEIGHT);
		ctx.lineTo(WIN_WIDTH-tower.right,WIN_HEIGHT);
		ctx.fillStyle="rgb(217,217,217)"
		ctx.closePath();
		ctx.fill();
		ctx.restore();
		//右侧
		ctx.save();
		ctx.moveTo(WIN_WIDTH-tower.right-2*tower.width,WIN_HEIGHT);
		ctx.beginPath();
		ctx.lineTo(WIN_WIDTH-tower.right-2*tower.width,WIN_HEIGHT);
		ctx.lineTo(WIN_WIDTH-tower.right-2*tower.width,WIN_HEIGHT-tower.height)
		ctx.lineTo(WIN_WIDTH-tower.right-2.5*(tower.width),WIN_HEIGHT-tower.height);
		ctx.lineTo(WIN_WIDTH-tower.right-3*(tower.width)-10,WIN_HEIGHT);
		ctx.lineTo(WIN_WIDTH-tower.right-2*tower.width,WIN_HEIGHT);
		ctx.fillStyle="rgb(242,237,232)"
		ctx.closePath();
		ctx.fill();
		ctx.restore();

		// 屋檐
		ctx.save();
		ctx.moveTo(WIN_WIDTH-tower.right,WIN_HEIGHT-tower.height);
		ctx.beginPath();
		ctx.lineTo(WIN_WIDTH-tower.right,WIN_HEIGHT-tower.height)
		ctx.lineTo(WIN_WIDTH-tower.right,WIN_HEIGHT-tower.height-tower.eaveH );
		ctx.lineTo(WIN_WIDTH-tower.right-3*(tower.width),WIN_HEIGHT-tower.height-tower.eaveH);
		ctx.lineTo(WIN_WIDTH-tower.right-3*(tower.width),WIN_HEIGHT-tower.height);
		ctx.lineTo(WIN_WIDTH-tower.right,WIN_HEIGHT-tower.height)
		ctx.fillStyle="#EFEFEF"
		ctx.closePath();
		ctx.fill();
		ctx.restore();

		// 红帽
		ctx.save()
		ctx.moveTo(WIN_WIDTH-tower.right-(tower.width/2),WIN_HEIGHT-tower.height-tower.eaveH);
		ctx.beginPath();
		ctx.arc(WIN_WIDTH-tower.right-1.5*tower.width,
				WIN_HEIGHT-tower.height-tower.eaveH,
				tower.width,0,Math.PI,true);
		var gradient1 = ctx.createLinearGradient(WIN_WIDTH-tower.right-(tower.width/2),
												 WIN_HEIGHT-tower.height,
												 WIN_WIDTH-tower.right-2*tower.width,
												 WIN_HEIGHT-tower.height);
		gradient1.addColorStop(0, "black");
		gradient1.addColorStop(1, 'red');
		ctx.fillStyle=gradient1;
		ctx.closePath();
		ctx.fill();

		// button
		ctx.save()
		ctx.moveTo(WIN_WIDTH-tower.right-(tower.width/2),WIN_HEIGHT-tower.height-tower.eaveH/2);
		ctx.beginPath();
		ctx.arc(WIN_WIDTH-tower.right-1.5*tower.width,
				WIN_HEIGHT-tower.height-2*tower.eaveH,
				tower.width/8,0,2*Math.PI,true);
		ctx.fillStyle="#EFEFEF"
		ctx.closePath();
		ctx.fill();
	}
	tower={
		right:200,
		width:72,
		height:300,
		eaveH:30 //屋檐

	}
	drawTower(CTX1,tower);
	function drawWings(ctx) {
		ctx.clearRect(0,0,WIN_WIDTH,WIN_HEIGHT)
		ctx.save();
		ctx.translate(WIN_WIDTH-tower.right-1.5*tower.width,WIN_HEIGHT-tower.height-2*tower.eaveH);
        ctx.rotate(rotation); 
        ctx.translate(-350,-200);
		ctx.beginPath();
		
		ctx.moveTo(350, 200);
		ctx.lineTo(300, -30);
		ctx.lineTo(400, -30);

		ctx.lineTo(350, 200);
		ctx.lineTo(300, 430);
		ctx.lineTo(400, 430);
		
		ctx.lineTo(350, 200);
		ctx.lineTo(110, 250);
		ctx.lineTo(110, 150);
		
		ctx.lineTo(350, 200);
		ctx.lineTo(590, 260);
		ctx.lineTo(590, 150);
		ctx.closePath();
		ctx.lineWidth = 5;
		ctx.shadowColor="white";
		ctx.shadowBlur=90;
		ctx.strokeStyle = 'rgb(238,199,130)';
		ctx.stroke();

		ctx.restore();
	}
	rotation=0;
	intervalGame = setInterval(function(){
	 drawWings(CTX2);rotation+=0.1;
	}, 100);



}
