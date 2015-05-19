#' Make JSON-formatted sigma network data
#'
#' Just need the node \code{\link{data.frame}}
#' and the edge \code{\link{data.frame}}.
#'
#' @param nodeDataframe
#' @param edgeDataframe
#'
#' @import jsonlite
#' @export
sigma_json_generator <- function(nodeDataframe, edgeDataframe){
  # require("jsonlite")
  edges = edgeDataframe
  nodes = nodeDataframe
  #preset colors
  microbeColor = "#3288bd"
  compoundColor = "#ff9d00"
  hostColor = "#e31a1c"

  #Generate edge data for sigma
  i = 1
  edges_check = list()

  for (so in edges$source)
  {
    edge = edges[i,]

    backward = paste(edge$target,edge$source,sep="")
    forward = paste(edge$source,edge$target,sep="")
    #Have we already added an edge this pair of nodes?
    if (backward %in% names(edges_check))
    {
      #It's a bi-directional edge
      edges_check[[backward]][['type']] = 'parallel'
      edges_check[[backward]][['label']] = paste(edge$source, edge$target, sep="<->")
    }
    else
    {
      edges_check[[forward]] = list()
      edgeLabel = paste(edge$source, edge$target, sep="->")
      #It's a new edge
      edges_check[[forward]][['id']] = paste("e",toString(i),sep="")
      edges_check[[forward]][['label']] = edgeLabel
      edges_check[[forward]][['source']] = toString(edge$source)
      edges_check[[forward]][['target']] = toString(edge$target)
      edges_check[[forward]][['type']] = 'tapered'
      edges_check[[forward]][['size']] = 1
    }

    i = i + 1
  }

  nodes_check = list()
  #Generate node data for sigma
  i = 1
  for (node in nodes$id)
  {
    nodes_check[[node]] = list()
    nodes_check[[node]][['id']] = node
    if (nodes[i,]['type'] == 'microbe')
    {
      nodeColor = microbeColor
    }
    else if (nodes[i,]['type'] == 'host')
    {
      nodeColor = hostColor
    }
    else
    {
      nodeColor = compoundColor
    }
    nodes_check[[node]][['color']] = nodeColor
    nodes_check[[node]][['x']] = nodes[i,][['x']]
    nodes_check[[node]][['y']] = nodes[i,][['y']]
    nodes_check[[node]][['size']] = nodes[i,][['size']]
    i = i + 1
  }
  # Make the combine JSON-formatted character to pass to sigma
  json_combined = toJSON(list(
    nodes = unname(nodes_check),
    edges = unname(edges_check))
    )
  return(json_combined)
}
