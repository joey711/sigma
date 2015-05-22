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
    maxEdgeSize:4,
    defaultEdgeLabelSize: 12,
    minNodeSize:3,
    maxNodeSize:8,
    edgeLabelThreshold: 10
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
    // update the sigma instance


    instance.sig.graph.clear();
    instance.sig.graph.read(g);
    instance.sig.refresh();

    //popup code

    instance.sig.bind('overNode', function(e) {
      document.body.style.cursor = "pointer";
    });

    instance.sig.bind('outNode', function(e) {
      document.body.style.cursor = "default";
    });

    var last_node = "";
    instance.sig.bind('clickNode', function(e) {
      $("table").filterByData("node_id",e.data.node.id).remove();
      var start_pos = $(".sigma").position()
      var x1 = e.data.node['renderer1:x'] + $(".sigma").position()['left']-100;
      var y1 = e.data.node['renderer1:y'] + $(".sigma").position()['top']+10;
      if (last_node != e.data.node.label)
      {
      last_node = e.data.node.label;

      html_string = "<table class='ui celled striped small compact table' style='width:200px;height:200px'><thead><tr><th colspan='2'>";
      html_string = html_string + e.data.node.label;
      html_string = html_string + "</th></tr></thead><tbody>"; 
      var data_cols = instance.sig.settings("data_cols");
      if(typeof data_cols === 'undefined'){
        var data_cols = ["label","id"];
      }
      $.each(data_cols, function( index, value ) {
       html_string = html_string + "<tr><td>" + data_cols[index] + "</td><td>"+ e.data.node[value] + "</td></tr>";
    });

      html_string = html_string + "</tbody></table>";
      var sigma_obj = $(".sigma")[0];
      $(html_string).css( {position:"absolute", top:y1, left: x1}).appendTo(sigma_obj).data("node_id",e.data.node.id).data("start_x",x1).data("start_y",y1).data("c_x",instance.sig.camera.x).data("c_y",instance.sig.camera.y);
      }
      else
      {
        last_node = "";
      }
    });
  },

  resize: function(el, width, height, instance) {

    // forward resize on to sigma renderers
    for (var name in instance.sig.renderers)
      instance.sig.renderers[name].resize(width, height);
  }
});
