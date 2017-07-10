$(function(){
	$(".contain .left img").click(function(){
		var typeLeft = $(this).data("type");
		
		if( typeLeft == 0 ){
			$(this).css("transform","translate(150px,140px)");
		}else if( typeLeft == 1 ){
			$(this).css("transform","translate(150px,0px)");
		}else if( typeLeft == 2 ){
			$(this).css("transform","translate(150px,-140px)");
		}
		var that = $(this)

		var arr = $(".contain .right img");
		var temp = $(arr[Math.floor(Math.random()*arr.length)]);
		
		var typeRight = temp.data("type");
		
		if( typeRight == 0 ){
			temp.css("transform","translate(-150px,140px)");
		}else if( typeRight == 1 ){
			temp.css("transform","translate(-150px,0px)");
		}else if( typeRight == 2 ){
			temp.css("transform","translate(-150px,-140px)");
		}
		
		var compare = typeRight - typeLeft;
		
		if(compare == 0){
			$(".info ul").prepend("<li>平"+new Date()+"</li>")
		}else if( compare == -1 || compare == 2 ){
			$(".info ul").prepend("<li>胜"+new Date()+"</li>")
		}else{
			$(".info ul").prepend("<li>负"+new Date()+"</li>")
		}
		setTimeout(function(){
			that.css("transform","translate(0px,0px)");
			temp.css("transform","translate(0px,0px)");
		},500)
		
	})
})
