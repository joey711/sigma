#' Make JSON-formatted sigma network data
#'
#' Just need the node \code{\link{data.frame}}
#' and the edge \code{\link{data.frame}}.
#'
#' @param nodeDataframe we need to document the required columns
#'
#' @param edgeDataframe same thing here.
#'
#' @import jsonlite
#' @import data.table
#' @export
sigma_json_generator <- function(nodeDataframe, edgeDataframe,
                                 palette = list(
                                   microbe = "#3288bd",
                                   compound = "#ff9d00",
                                   host = "#e31a1c")
                                 ){
  edges$source <- as.character(edges$source)
  edges$target <- as.character(edges$target)
  # require("jsonlite")
  edges = edgeDataframe
  nodes = nodeDataframe
  nodes$color <- unlist(palette[nodes$type])
  # Edges
  edges$size <- 1
  edges$type <- "tapered"
  edges$id <- paste0("e", 1:nrow(edges))
  edges <- transform(edges, label = paste(source, target, sep="->"))
  # Remove duplicated edge entries, label them as parallel
  edges$nodeKey <- apply(edges, 1, function(x){
    paste(sort(c(x["source"], x["target"])), collapse = "___")
  })
  duplicateKeysLogical = duplicated(edges$nodeKey)
  parallelKeys = unique(edges$nodeKey[duplicateKeysLogical])
  edges <- edges[!duplicateKeysLogical, ]
  edges[edges$nodeKey %in% parallelKeys, ]$type <- "parallel"
  # Use data.table to clean up this syntax
  edgesdt = data.table(edges)
  edgesdt[type == "parallel", label := paste(source, target, sep="<->")]
  # Make the combine JSON-formatted character to pass to sigma
  json_combined = toJSON(list(
    nodes = nodes,
    edges = edgesdt
    ))
  #prettify(json_combined)
  return(json_combined)
}
