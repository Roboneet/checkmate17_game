// add id = player_girl to girl's g tag
$(document).ready(function(){

	//fancy colors
	$('body').css('backgroundColor', '#f7d16e')
	
	var svg = $('svg')
	var player_girl = $('#player_girl');
	var player_boy;
	var player = player_girl;
	var roads = $('.cls-3')
	var inital_pos = [-250, 20]
	// initial position
	TweenMax.set(player_girl, {scale: .5, xPercent: -250, yPercent: 20})
	
	// player properties 
	var player_props = {
		rel_x: -250,
		rel_y: 20,
		step: 20,
		top: 0,
		left:0,
		width: player_girl[0].getBoundingClientRect().width 
	}
	
	// movement
	$(document).keydown(function(e){
		player_props.top = 0;
		player_props.left = 0;
		
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
	
	// storing each state
	var history = [[-250, 20], [-250, 20]];

	// render animation
	function render(top, left){
		var inRoad = false;

		player_props.rel_x +=  left;
		player_props.rel_y +=  top;
	
		TweenMax.to(player, .5,{xPercent:(player_props.rel_x ), yPercent:(player_props.rel_y)});

		roads.each(function(ind, ele){
			if(checkEnclosed(player[0], $(ele)[0])){
				inRoad = true;
				old_road = $(ele);
			}
		})
		
		if(inRoad){
			history.push([player_props.rel_x, player_props.rel_y]);
		}else{
			[[player_props.rel_x, player_props.rel_y]] = history.slice(-3, -2);
			TweenMax.to(player, .5,{xPercent:(player_props.rel_x ), yPercent:(player_props.rel_y)});
			history.push([player_props.rel_x, player_props.rel_y]);

		}

	}

	
	// returns true if  enclosing
	function checkEnclosed(player, container){
		var player_rect = player.getBoundingClientRect();
		var container_rect = container.getBoundingClientRect();

		// boundary checking
		var cond_right = ((player_rect.right) >(container_rect.left ) && (player_rect.right ) < container_rect.right),
		cond_left = 	((player_rect.left) > container_rect.left && (player_rect.left) < container_rect.right),
		cond_top = 	((player_rect.top)> container_rect.top) && ((player_rect.top) < container_rect.bottom),
		cond_bottom = ((player_rect.bottom ) > container_rect.top) && ((player_rect.bottom )< container_rect.bottom);
	
		return (cond_right && cond_left && cond_top && cond_bottom)
	}
});