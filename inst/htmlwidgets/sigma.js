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
    edgeLabelThreshold: 4
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


  },

  resize: function(el, width, height, instance) {

    // forward resize on to sigma renderers
    for (var name in instance.sig.renderers)
      instance.sig.renderers[name].resize(width, height);
  }
});
