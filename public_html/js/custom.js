/* some custom function for animating the theme */

var timeout = 5000;
var ani_time = 500; //miliseconds

// lol http://youtu.be/FMghvnqDhT8

// for the slide show
function go() {
    themeing();

$(".feature-grid div").click(function()
{
    //$(this).animate({'height':'30px'},'slow');
});

    //giq();
    //cycle_images();
}

function giq()
{
    $('#highlights img').each(function(i) 
    {
        var left = $(this).css('left'),
            top = $(this).css('top'),
            a = $(this).css({opacity: 0, left: 0, top: 0});

        $(document).queue('myQueue', function(n) 
        {
            $("#hl-caption").text(a.attr('alt'));
            a.animate({left: left, top: top, opacity: 1}, n);
        });
    });
    $(document).dequeue('myQueue');

    //setTimeout(giq, 2000);
}

function cycle_images()
{
    // get all the images
    var images = $("#highlights").children("img");
    idx = $(images).size()-1;
    // set all images to the top of the container and hide them
    $(images).each(function() { $(this).css('top','0px').css('visibility','hidden'); });
/*
    $(images).each(function() {
        $("#hl-caption").text($(images[idx]).attr('alt'));
        $(this).delay(timeout).animate({'top': $('#highlights').css('height')});
    }
    */
    $("#hl-caption").text($(images[0]).attr('alt'));
    
    $.each(images, function(i,val)
    {
        $(val).css('visibility', 'visible').delay(1000).animate({'top': $('#highlights').css('height')}, 'slow', 'linear', function() 
        {
            $("#hl-caption").text($(this[i]).attr('alt'));
        });
    });

    $(images).each(function() { $(this).css('top','0px'); });
    //setInterval(cycle_images, 2000);
}

function fade_out_and_stop() {
    
    var images = $("#highlights").children("img");
    idx = 0;
    $(images).each(function() { $(this).css('top','0px').css('visibility','hidden'); });
    (function() {
     $(images[idx++]).css('visibility','visible').delay(timeout).animate({'top': $('#highlights').css('height')}, ani_time, arguments.callee);
     })();
     //fade_out_and_stop();
}

function themeing()
{
    //style the first and last menu elements
    $("#menu li:first-child").addClass("LTB-Round");
    $("#menu li:last-child").addClass("RTB-Round");
    
    //menu hover color
    ocolor = $("#menu li").css('background-color'); 
    $("#menu li").hover(
        function() {
            $(this).css('background-color', '#343434');
        },
        function() {
            $(this).css('background-color', ocolor);
        }
    );
}

function hide_click(){
    $(this).hide();
}

function show_click()
{
    $(this).show();
}