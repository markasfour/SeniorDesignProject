var trends_menu_move = function() {
    $('#icon-trends').click(function()
    {
        $('#right-panel').animate({right: '0px'}, 200);
        $('#icon-trends').animate({right: '-320px'}, 200);
    });
    
    $('#icon-close-right').click(function()
    {
        $('#right-panel').animate({right: '-320px'}, 200);
		$('#icon-trends').animate({right: '0px'}, 200);
    });
};

$(document).ready(trends_menu_move)
