//function to change element's alpha
HTMLElement.prototype.alpha = function(a) {
        current_color = getComputedStyle(this).getPropertyValue("background-color");
        match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(current_color)
        a = a > 1 ? (a / 100) : a;
        this.style.backgroundColor = "rgba(" + [match[1],match[2],match[3],a].join(',') +")";
}

//change color scheme customization 
function changeColorScheme(color_scheme){
	var value = color_scheme.colors.value;
	
	var r1 = 0;
	var	g1 = 172;
	var	b1 = 237;
	var	a1 = .8;

	var	r2 = 81;
	var	g2 = 127;
	var	b2 = 164;
	var	a2 = .8;

	var r3 = r1;
	var g3 = g1;
	var b3 = b1;
	var a3 = a1;

	var r4 = r2;
	var g4 = g2;
	var b4 = b2;
	var a4 = a2;
	
	if (value == "default") {
		r1 = 0;
		g1 = 172;
		b1 = 237;
		a1 = .8;

		r2 = 81;
		g2 = 127;
		b2 = 164;
		a2 = .8;

		r3 = r1;
		g3 = g1;
		b3 = b1;
		a3 = a1;

		r4 = r2;
		g4 = g2;
		b4 = b2;
		a4 = a2;
	}
	else if (value == "dark") {
		r1 = 0;
		g1 = 0;
		b1 = 0;
		a1 = 1;
		
		r2 = 25; 
		g2 = 25;
		b2 = 25;
		a2 = .9;

		r3 = r1;
		g3 = g1;
		b3 = b1;
		a3 = a1;

		r4 = r2;
		g4 = g2;
		b4 = b2;
		a4 = a2;
	}

	else if (value == "Google") {
		r1 = 214;
		g1 = 45;
		b1 = 32;
		a1 = 1;
		
		r2 = 255; 
		g2 = 167;
		b2 = 0;
		a2 = .9;
		
		r3 = 0;
		g3 = 135;
		b3 = 68;
		a3 = 1;
		
		r4 = 0; 
		g4 = 87;
		b4 = 231;
		a4 = .9;
	}

	document.getElementById("logo").style.backgroundColor = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';	
	document.getElementById("logo").alpha(a1);

	document.getElementById("footer").style.backgroundColor = 'rgb(' + r3 + ',' + g3 + ',' + b3 + ')';	
	document.getElementById("footer").alpha(a3);

	document.getElementById("left-panel").style.backgroundColor = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';	
	document.getElementById("left-panel").alpha(a2);

	document.getElementById("right-panel").style.backgroundColor = 'rgb(' + r4 + ',' + g4 + ',' + b4 + ')';	
	document.getElementById("right-panel").alpha(a4);

	document.getElementById("icon-customize").style.backgroundColor = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

	document.getElementById("icon-trends").style.backgroundColor = 'rgb(' + r4 + ',' + g4 + ',' + b4 + ')';

	document.getElementById("icon-about").style.backgroundColor = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

	document.getElementById("about").style.backgroundColor = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';
}
