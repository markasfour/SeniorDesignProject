var about_open = false;

var about_move = function() {
    $('#icon-about').click(function()
    {
        if(!about_open){        
            $('#about').animate({left: '0%'}, 200);
            about_open = true;
        }
        else{
            $('#about').animate({left: '-100%'}, 200);
            about_open = false;
        }
    });
    
    $('#icon-close-about').click(function()
    {
        $('#about').animate({left: '-100%'}, 200);
        about_open = false;
    });
};

$(document).ready(about_move)
