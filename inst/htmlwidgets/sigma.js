HTMLWidgets.widget({

  name: "sigma",

  type: "output",

  initialize: function(el, width, height) {

    // create our sigma object and bind it to the element
    sig = new sigma({
  renderer: {
    container: document.getElementById(el.id),
    type: 'canvas'
  },
  settings: {
    edgeLabelSize: 'proportional',
    minEdgeSize:1,
    maxEdgeSize:6,
    defaultEdgeLabelSize: 12,
    minNodeSize:3,
    maxNodeSize:8,
    edgeLabelThreshold: 4,
    doubleClickEnabled: false
  }
});
    // return it as part of our instance data
    return {
      sig: sig
    };
  },

  renderValue: function(el, x, instance) {

    // parse gexf data
/*    var parser = new DOMParser();
    var data = parser.parseFromString(x.data, "application/xml");
*/
    var data = x.data
    // apply settings
    for (var name in x.settings)
    {
      instance.sig.settings(name, x.settings[name]);
    }

    jdata = JSON.parse(data);
    nodeData = jdata['nodes'];
    edgeData = jdata['edges'];
    g = {nodes: nodeData, edges: edgeData};
    console.log(g);
    // update the sigma instance


    console.log(JSON.stringify(g, null, 2));
    instance.sig.graph.clear();
    instance.sig.graph.read(g);
    instance.sig.refresh();

    //popup code

    s.bind('overNode', function(e) {
      document.body.style.cursor = "pointer";
    });

    s.bind('outNode', function(e) {
      document.body.style.cursor = "default";
    });

    var last_node = "";
    s.bind('clickNode', function(e) {
      $("table").filterByData("node_id",e.data.node.id).remove();
      var x1 = e.data.captor.clientX-110;
      var y1 = e.data.captor.clientY;
      if (last_node != e.data.node.label)
      {
      last_node = e.data.node.label;

      html_string = "<table class='ui celled striped small compact table' style='width:200px;height:200px'><thead><tr><th colspan='2'>";
      html_string = html_string + e.data.node.label;
      html_string = html_string + "</th></tr></thead><tbody>"; 
      var data_cols = s.settings["data_cols"];
      console.log(data_cols);
      //var data_cols = ["id","label","size"];
      $.each(data_cols, function( index, value ) {
       html_string = html_string + "<tr><td>" + data_cols[index] + "</td><td>"+ e.data.node[value] + "</td></tr>";
    });

      html_string = html_string + "</tbody></table>";
      $(html_string).css( {position:"absolute", top:y1, left: x1}).appendTo("#container").data("node_id",e.data.node.id).data("start_x",x1).data("start_y",y1).data("c_x",s.camera.x).data("c_y",s.camera.y);
      }
      else
      {
        last_node = "";
      }
    });


    $.fn.filterByData = function(prop, val) {
        return this.filter(
            function() { return $(this).data(prop)==val; }
        );
    }

    var starter = setTimeout(update_box, 20); 


    function update_box() {
      $('table').each(function() {
        var dx =  $(this).data("c_x") - (s.camera.x);
        var dy =  $(this).data("c_y") - (s.camera.y);
        var x = $(this).data("start_x") + dx / s.camera.ratio;
        var y = $(this).data("start_y") + dy / s.camera.ratio;
        $(this).css({left:x, top:y});
      });
      // do some stuff...
      tid = setTimeout(update_box, 10);
    }

    var myimage = document.getElementById("container").children[1];
    myimage.addEventListener("mousewheel", MouseWheelHandler, true);

    function MouseWheelHandler(e) {
    $("table").remove();
    last_node = "";
    }

  },

  resize: function(el, width, height, instance) {

    // forward resize on to sigma renderers
    for (var name in instance.sig.renderers)
      instance.sig.renderers[name].resize(width, height);
  }
});
