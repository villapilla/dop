$(document).ready(function() {   
    var sideslider = $('[data-toggle=collapse-side]'),
        sel = sideslider.attr('data-target'),
        sel2 = sideslider.attr('data-target-2');
    sideslider.click(function(event){
        $(sel).toggleClass('in');
        $(sel2).toggleClass('out');
    });
    $("#log_git").hover(function() {
        $("#log_git img").attr("src","img/gitHub_black.png");
    }, function () {
        $("#log_git img").attr("src","img/gitHub_white.png");
    });

});