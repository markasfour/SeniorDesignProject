var customize_menu_move = function() {
    $('#icon-customize').click(function()
    {
        $('#left-panel').animate({left: '0px'}, 200);
        $('#icon-customize').animate({left: '-330px'}, 200);
        $('#info_container').animate({left: '330px'}, 200);
    });
    
    $('#icon-close-left').click(function()
    {
        $('#left-panel').animate({left: '-330px'}, 200);
		$('#icon-customize').animate({left: '0px'}, 200);
        $('#info_container').animate({left: '0px'}, 200);
    });
};

$(document).ready(customize_menu_move)
