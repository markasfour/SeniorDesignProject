var about_move = function() {
    $('#icon-about').click(function()
    {
		$('#about').animate({left: '0%'}, 200);
    });
    
    $('#icon-close-about').click(function()
    {
        $('#about').animate({left: '-100%'}, 200);
    });
};

$(document).ready(about_move)
