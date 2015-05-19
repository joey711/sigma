#' Make JSON-formatted sigma network data
#'
#' Just need the node \code{\link{data.frame}}
#' and the edge \code{\link{data.frame}}.
#'
#' @param nodes we need to document the required columns
#'
#' @param edges same thing here.
#'
#' @param colorPalette Color Palette.
#'
#' @import jsonlite
#' @import data.table
#' @export
sigma_json_generator <- function(nodes, edges,
                                 colorPalette = list(
                                   Microbe = "#3288bd",
                                   Compound = "#ff9d00",
                                   Host = "#e31a1c")
                                 ){
  # Nodes
  if(!any(colnames(nodes) == "label")){
    nodes$label <- nodes$id
  }
  nodes$color <- unlist(colorPalette[as.character(nodes$type)])
  # Edges
  colnames(edges)[colnames(edges) == "source"] <- "sources"
  edges$sources <- as.character(edges$sources)
  edges$target <- as.character(edges$target)
  edges$size <- 1
  edges$type <- "tapered"
  edges$id <- paste0("e", 1:nrow(edges))
  edges <- transform(edges, label = paste(sources, target, sep="->"))
  # Remove duplicated edge entries, label them as parallel
  edges$nodeKey <- apply(edges, 1, function(x){
    paste(sort(c(x["sources"], x["target"])), collapse = "___")
  })
  message("nodeKey: \n", paste0(edges$nodeKey, collapse = "\n"))
  duplicateKeysLogical = duplicated(edges$nodeKey)
message("parallel key:", edges$nodeKey[duplicateKeysLogical])
  if(any(duplicateKeysLogical)){
    parallelKeys = unique(edges$nodeKey[duplicateKeysLogical])
    edges <- edges[!duplicateKeysLogical, ]
    edges[edges$nodeKey %in% parallelKeys, ]$type <- "parallel"
    # Use data.table to clean up this syntax
    edgesdt = data.table(edges)
    edgesdt[type == "parallel", label := paste(sources, target, sep="<->")]
  } else {
    # Use data.table to clean up this syntax
    edgesdt = data.table(edges)
  }
  # Put back to source just before sending out
  setnames(edgesdt, "sources", "source")
  # Make the combine JSON-formatted character to pass to sigma
  json_combined = toJSON(list(
    nodes = nodes,
    edges = edgesdt
    ))
  #prettify(json_combined)
  return(json_combined)
}
