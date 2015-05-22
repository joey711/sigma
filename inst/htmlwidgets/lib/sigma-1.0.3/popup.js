$( document ).ready(function() {
        
$.fn.filterByData = function(prop, val) {
    return this.filter(
        function() { return $(this).data(prop)==val; }
    );
}

var starter = setTimeout(update_box, 20); 


function update_box() {
  $('table').each(function() {
    var dx =  $(this).data("c_x") - (sig.camera.x);
    var dy =  $(this).data("c_y") - (sig.camera.y);
    var x = $(this).data("start_x") + dx / sig.camera.ratio;
    var y = $(this).data("start_y") + dy / sig.camera.ratio;
    $(this).css({left:x, top:y});
  });
  // do some stuff...
  tid = setTimeout(update_box, 10);
}

var myimage = $(".sigma-mouse");
myimage.bind("mousewheel", function(){
$("table").remove();
last_node = "";

});


    });