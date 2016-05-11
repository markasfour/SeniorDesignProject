function changeColorScheme(color_scheme){
	var value = color_scheme.colors.value;
	
	var r1 = 0;
	var g1 = 0;
	var b1 = 0;
	var r2 = 0; 
	var g2 = 0;
	var b2 = 0;
	var a1 = 0;
	var a2 = 0;

	if (value == "default") {
		r1 = 0;
		g1 = 172;
		b1 = 237;
		a1 = .8;

		r2 = 81;
		g2 = 127;
		b2 = 164;
		a2 = .8;
	}
	else if (value == "dark") {
		r1 = 0;
		g1 = 0;
		b1 = 0;
		a1 = 1;
		
		r2 = 25; 
		g2 = 25;
		b2 = 25;
		a2 = .8;
	}

	document.getElementById("logo").style.backgroundColor = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';	
	document.getElementById("logo").style.opacity = a1;

	document.getElementById("footer").style.backgroundColor = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';	
	document.getElementById("footer").style.opacity = a1;

	document.getElementById("left-panel").style.backgroundColor = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';	
	document.getElementById("left-panel").style.opacity = a2;

	document.getElementById("right-panel").style.backgroundColor = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';	
	document.getElementById("right-panel").style.opacity = a2;

	document.getElementById("icon-customize").style.backgroundColor = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

	document.getElementById("icon-trends").style.backgroundColor = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

	document.getElementById("icon-about").style.backgroundColor = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

	document.getElementById("about").style.backgroundColor = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';
}
