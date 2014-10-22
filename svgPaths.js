!function (name, definition) {
	if (typeof module != 'undefined') {
		module.exports = definition();
	} else if (typeof define != 'undefined') {
		define(definition);
	} else {
		this[name] = definition();
	}
		
}('SvgPaths', function() {
	
	return function(str, option) {
		
		if(!str) return;
	
		// Lets split this SVG string into its commands
		var previous_relative_point = [0,0],
			previous_absolute_point = [0,0],
			sections = str.match(/([mcvhl]{1}[0-9 \,\.z -]+)/gi).map(function(text) {
		
			var cmd = text.match(/^\W*[mcvhl]/ig)[0],
				points,
				relative_point,
				absolute_point,
				is_relative = cmd == cmd.toLowerCase(),
				has_z = text.match(/z/gi);
		
			/**
			*
			* Lets get the list of points
			*
			**/
			if(cmd == "v") {
			
			} else if(cmd == "V") {
			
			} else if(cmd == "h") {
			
			} else if(cmd == "H") {
			
			} else {
				// Get a list of points from the command
				
				// if(!text.match(/([0-9\.]+[ \,][0-9\.]+)+/ig))
				// 	console.log(text, text.match(/([0-9\\.]+[ \,][0-9\.]+)+/ig));
				
				points = text.match(/([0-9\.\-]+[\W\,][0-9\.\-]+)+/ig).map(function(item) { return item.replace(/,/, " ").split(" ").map(Number); });
			}
		
		
			/**
			*
			* Lets see if we have a relative or absolute points, then lets find the other one.
			*
			**/
			if(is_relative) {
				relative_points = points;
				absolute_points = points.map(function(point) {
					return [previous_absolute_point[0] + point[0], previous_absolute_point[1] + point[1]]
				});
			} else {
				relative_points = points.map(function(point) {
					return [point[0] - previous_absolute_point[0], point[1] - previous_absolute_point[1]]
				});
				absolute_points = points;
			}
		
			/**
			*
			* Lets rebuild our commands
			*
			**/
			if(cmd.toLowerCase() == "v") {
			
			} else if(cmd.toLowerCase() == "h") {

			} else {
				relative_text = cmd.toLowerCase() + " " + relative_points.map(function(point) { return point.join(","); }).join(" ") + (has_z ? " z" : "");
				absolute_text = cmd.toUpperCase() + " " + absolute_points.map(function(point) { return point.join(","); }).join(" ") + (has_z ? " z" : "");
			}
		
			// Lets hold onto this absolute point for the next command.
			previous_absolute_point = absolute_points[absolute_points.length-1];

			return {

				// Lets find the command			
				cmd: cmd,
			
				// List the points relative or absolute
				relative_points: relative_points,
				absolute_points: absolute_points,
			
				// Lets save the full text of the command
				relative: relative_text,
				absolute: absolute_text
			};
		});
	
		
		return sections.map(function(item) { return item && item[option]; }).join(" ");

	}
})