// add id = player_girl to girl's g tag
$(document).ready(function(){
	$('body').css('backgroundColor', '#84a0b1')
	var svg = $('svg')
	var player_girl = $('#player_girl');

	TweenMax.set(player_girl, {scale: .5, xPercent: -250, yPercent: 20})
	
	// var obstacles= svg.children();
	var roads = $('.cls-3')

	var player_props = {
		rel_x: -250,
		rel_y: 20,
		step: 20,
		top: 0,
		left:0,
		width: player_girl[0].getBoundingClientRect().width 
		// prox: 0,

	}
	// TweenMax.to(player_girl, 2,{x: 100, y:100});

	$(document).keydown(function(e){
		player_props.top = 0;
		player_props.left = 0;
		// console.log(e.keyCode);
		if(e.keyCode == 38){
			player_props.top = -(player_props.step);
		}else if(e.keyCode == 40){
			player_props.top = player_props.step;
		}else if(e.keyCode==39){
			player_props.left = player_props.step;
		}else if(e.keyCode == 37){
			player_props.left = -(player_props.step);
		}
		render(player_props.top,player_props.left);
	})
	// var ignore = [];
	// obstacles.each(function(ind, ele){
	// 		var rectangle = $(ele)[0];
	// 		if(checkIntersection(player_girl[0], rectangle)){
	// 			// $(rectangle).fadeOut();
	// 			// console.log(ele);
	// 			ignore.push(ind);
	// 		}
	// 	})
	// console.log(ignore);
	var old_intersect = true;
	var old_road = roads.map(function(ind, ele){
		if(checkEnclosed(player_girl[0], $(ele)[0])){
			return $(ele);
		}
	})
	var history = [[-250, 20], [-250, 20]];

	function render(){
		var intersect = false;

		// obstacles.each(function(ind, ele){
		// 	var rectangle = $(ele)[0];
		// 	if(ignore.indexOf(ind)==-1){
		// 		if(checkIntersection(player_girl[0], rectangle)){
		// 			// console.log(ele);
		// 			intersect = true;
					
		// 		}
		// 	}
		// })
		
		// document.elementFromPoint(player_girl.x.animVal.value, $(player_girl[0]).y.animVal.value)
		// console.log(old_intersect, 'old')
		// if(old_intersect)
		// {
			// console.log(player_props.rel_x, player_props.rel_y, "old")
			player_props.rel_x +=  left;
			player_props.rel_y +=  top;
			// console.log(player_props.rel_x, player_props.rel_y, "new")
			TweenMax.to(player_girl, .5,{xPercent:(player_props.rel_x ), yPercent:(player_props.rel_y)});
			

		// }

		roads.each(function(ind, ele){
			if(checkEnclosed(player_girl[0], $(ele)[0])){
				intersect = true;
				old_road = $(ele);
			}
		})

		// console.log(intersect, '1')

		// if(!intersect){
		// 	console.log(player_props.rel_x, player_props.rel_y)
		// 	// player_props.rel_x -=  left;
		// 	// player_props.rel_y -=  top;
		// 	// console.log(player_props.rel_x, player_props.rel_y)
		// 	// TweenMax.to(player_girl, .5,{xPercent:(player_props.rel_x ), yPercent:(player_props.rel_y)});
		// 	// roads.each(function(ind, ele){
		// 	// 	if(checkEnclosed(player_girl[0], $(ele)[0])){
		// 	// 		intersect = true;
		// 	// 	}
		// 	// })
		// 	console.log(top, left)
		// 	player_props.rel_x -= (left);
		// 	player_props.rel_y -= (top);
		// 	console.log(player_props.rel_x, player_props.rel_y)
		// 	TweenMax.to(player_girl, .5,{xPercent:(player_props.rel_x ), yPercent:(player_props.rel_y)});
		// 	intersect = true;

		// }
		console.log(history)
		if(intersect){
			history.push([player_props.rel_x, player_props.rel_y]);
		}else{
			[[player_props.rel_x, player_props.rel_y]] = history.slice(-3, -2);
			TweenMax.to(player_girl, .5,{xPercent:(player_props.rel_x ), yPercent:(player_props.rel_y)});
			history.push([player_props.rel_x, player_props.rel_y]);
		}

		// console.log(player_props)
		old_intersect = intersect;
		// console.log(intersect, '2')

	}

	
	// returns true if  enclosing
	function checkEnclosed(player, container){
		var player_rect = player.getBoundingClientRect();
		var container_rect = container.getBoundingClientRect();

		var cond_right = ((player_rect.right) >(container_rect.left ) && (player_rect.right ) < container_rect.right),
		cond_left = 	((player_rect.left) > container_rect.left && (player_rect.left) < container_rect.right),
		cond_top = 	((player_rect.top)> container_rect.top) && ((player_rect.top) < container_rect.bottom),
		cond_bottom = ((player_rect.bottom ) > container_rect.top) && ((player_rect.bottom )< container_rect.bottom);
		// console.log(container)
		// console.log(cond_right, cond_left, cond_top, cond_bottom);
		return (cond_right && cond_left && cond_top && cond_bottom)
	}
});