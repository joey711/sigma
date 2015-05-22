/*

Sigma Data Popups
Created by Alex Crits-Christoph
License: GPL

Basic Requirements:
Sigma.JS 1.0.3
JQuery 1.11.3

*/
$( document ).ready(function() {
        
    //used to retrieve and remove selected nodes
	$.fn.filterByData = function(prop, val) {
	    return this.filter(
	        function() { return $(this).data(prop)==val; }
	    );
	}

	//Updates the coordinates of the popups when spanning.
	function update_box() {
	  $('table').each(function() {
	    var dx =  $(this).data("c_x") - (sigma_global.camera.x);
	    var dy =  $(this).data("c_y") - (sigma_global.camera.y);
	    var x = $(this).data("start_x") + dx / sigma_global.camera.ratio;
	    var y = $(this).data("start_y") + dy / sigma_global.camera.ratio;
	    $(this).css({left:x, top:y});
    });
	
	tid = setTimeout(update_box, 10);
}

var starter = setTimeout(update_box, 20); 


});


function data_popups(sig) {

	//Remove popups on scroll
	var sigma_mouse = $(".sigma-mouse");
	sigma_mouse.bind("mousewheel", function(){
	$("table").remove();
	open_nodes = [];
	});

	window.sigma_global = sig;

	//Popup mouse overs
	sig.bind('overNode', function(e) {
      document.body.style.cursor = "pointer";
    });

    sig.bind('outNode', function(e) {
      document.body.style.cursor = "default";
    });

    //handles clicks
    window.open_nodes = [];
    sig.bind('clickNode', function(e) {
      $("table").filterByData("node_id",e.data.node.id).remove();
      //position table below node
      var start_pos = $(".sigma").position()
      //-100 centers table
      var x1 = e.data.node['renderer1:x'] + $(".sigma").position()['left']-100;
      var y1 = e.data.node['renderer1:y'] + $(".sigma").position()['top']+e.data.node['renderer1:size'];
      //If this node doesn't have a table open
      if (open_nodes.indexOf(e.data.node.id) == "-1")
      {
      open_nodes.push(e.data.node.id);

      html_string = "<table class='ui celled striped small compact table' style='width:200px;height:200px'><thead><tr><th colspan='2'>";
      html_string = html_string + e.data.node.label;
      html_string = html_string + "</th></tr></thead><tbody>"; 
      var data_cols = sig.settings("data_cols");
      if(typeof data_cols === 'undefined' || data_cols === null){
        var data_cols = ["label","id"];
      }
      $.each(data_cols, function( index, value ) {
	  	html_string = html_string + "<tr><td>" + data_cols[index] + "</td><td>"+ e.data.node[value] + "</td></tr>";
      });

      html_string = html_string + "</tbody></table>";
      var sigma_obj = $(".sigma")[0];
      $(html_string).css( {position:"absolute", top:y1, left: x1}).appendTo(sigma_obj).data("node_id",e.data.node.id).data("start_x",x1).data("start_y",y1).data("c_x",sig.camera.x).data("c_y",sig.camera.y);
      }
      else
      {
      	//Remove this node's table if it is already open
        var n_index = open_nodes.indexOf(e.data.node.id);
        open_nodes.splice(n_index,1);
      }
    });
}