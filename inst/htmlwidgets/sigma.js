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
    doubleClickEnabled:false,
    edgeLabelThreshold: 100
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

    console.log(data);
    console.log(typeof data);
    //jdata = JSON.parse(data);
    jdata = data;
    nodeData = jdata['nodes'];
    edgeData = jdata['edges'];
    g = {nodes: nodeData, edges: edgeData};
    // update the sigma instance


    instance.sig.graph.clear();
    instance.sig.graph.read(g);
    instance.sig.refresh();

    //popup code
    data_popups(instance.sig);
  },

  resize: function(el, width, height, instance) {

    // forward resize on to sigma renderers
    for (var name in instance.sig.renderers)
      instance.sig.renderers[name].resize(width, height);
  }
});
