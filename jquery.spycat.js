(function($) {
  $.fn.spycat = function(options) {
	$.fn.spycat.defaults = {
		postUrl: "spycat.php",
		frameTime: 250, // 250 milliseconds
		sendTime: 6, // 6 seconds
		sendTimeLong: 20, // 20 seconds
		setLong: 60, // 60 seconds 
		maxTime: 1000 // 1000 seconds
	}
    var opts = $.extend({}, $.fn.spycat.defaults, options);
	var isInIFrame = (window.location != window.parent.location) ? true : false;
	//set vars				
				ticks = [];
				tick = [];
								
				mouse_y_pos = -1;
				mouse_x_pos = -1;
				mouse_click_type = -1;
				mouse_click_x = -1;
				mouse_click_y = -1;		
				scroll_distance = -1;
				interval_counter = 0;
				
				frame_mouse_move_data = "";
				last_move = mouse_x_pos + "," + mouse_y_pos + ",";
				frame_mouse_click_data = "";
				last_click = mouse_click_type + "," + mouse_click_x + "," + mouse_click_y + ",";
				frame_scroll_data = "";
				last_scroll = scroll_distance;
								
				viewport_height = window.innerHeight;
				viewport_width = window.innerWidth;
				screen_height = window.screen.height;
				screen_width = window.screen.width;
				
				//a time loop
				function onTick(){
					
					//increase frame count
					interval_counter = interval_counter + 1;
					
					//only do anything if not in iframe
					if(!isInIFrame){
					
						//update mouse movents only if different from movements in previous frame
						if(last_move !== mouse_x_pos + "," + mouse_y_pos + ","){
							frame_mouse_move_data = frame_mouse_move_data + interval_counter + "," +  + mouse_x_pos + "," + mouse_y_pos + ",";
							last_move = mouse_x_pos + "," + mouse_y_pos + ",";
						}
						
						//update click events
						if(last_click !== mouse_click_type + "," + mouse_click_x + "," + mouse_click_y + "," ){
							frame_mouse_click_data = frame_mouse_click_data + interval_counter + "," + mouse_click_type + "," + mouse_click_x + "," + mouse_click_y + ",";
							last_click = mouse_click_type + "," + mouse_click_x + "," + mouse_click_y + ",";
						}
						//update scroll events
						if(last_scroll !== scroll_distance){
							frame_scroll_data = frame_scroll_data + interval_counter + "," + scroll_distance + ",";
							last_scroll = scroll_distance;
						}
						//dont track forever
						if(interval_counter > opts.maxTime){
							clearInterval(intervalHandler);
						}
						//send data every 6 seconds to database or send on first frame
						if((interval_counter <= opts.setLong && interval_counter%opts.sendTime == 0) || interval_counter == 1){
							console.log(frame_mouse_click_data);
							console.log(interval_counter);
							viewport_data = screen_width + "," + screen_height + "," + viewport_width + "," + viewport_height;
							$.post(opts.postUrl, { move: frame_mouse_move_data, click: frame_mouse_click_data, scroll: frame_scroll_data, window: viewport_data }, function(data) {
								console.log("Data Loaded: " + data);
							});
						}
						//after 60 frames send every 20 seconds
						if(interval_counter > opts.setLong && interval_counter%opts.sendTimeLong == 0){
							console.log(frame_mouse_click_data);
							console.log(interval_counter);
							$.post(opts.postUrl, { move: frame_mouse_move_data, click: frame_mouse_click_data, scroll: frame_scroll_data }, function(data) {console.log("Data Loaded: " + data);} );
						}
					
					}

				}
				//start timeloop with 250 ms for each frame				
				intervalHandler = setInterval(onTick, opts.frameTime);

				//event handlers for mouse movements
				$(window).mousemove(function(e) {
					mouse_y_pos = e.pageY;
					mouse_x_pos = e.pageX;
					return true;
				})
				//event handlers for scroll
				$(window).scroll(function(e) {
					scroll_distance = $(window).scrollTop();
					return true;
				});
				
				//event handlers for resizing a window (TODO)
				$(window).resize(function(e) {
					//viewport_height = document.documentElement.clientHeight;
					//viewport_width = document.documentElement.clientWidth;
					return true;
				});
				
				//event handlers for mouse clicks (left, middle, right)
				$(window).mousedown(function(e){
					switch(e.which) {
						case 1:
							mouse_click_type = 1;
							mouse_click_x = e.pageX;
							mouse_click_y = e.pageY;
						break;
						case 2:
							mouse_click_type = 2;
							mouse_click_x = e.pageX;
							mouse_click_y = e.pageY;
						break;
						case 3:
							mouse_click_type = 3;
							mouse_click_x = e.pageX;
							mouse_click_y = e.pageY;
						break;
					}
					return true;
				});
				//event handlers for keyword input (TODO)
    
  }
})(jQuery);