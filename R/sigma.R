
# sigmajs graph widget
#' @import rgexf
#' @export
edgetable_to_gexf = function(netdf){
  # one-liner to convert edgetable to 
  do.call(what = write.gexf, args = edge.list(netdf))
}

#' @import htmlwidgets
#' @export
sigma <- function(gexf, drawEdges = TRUE, drawNodes = TRUE,
                  width = NULL, height = NULL) {
  
  # Convert the gexf object to character vector
  data <- gexf$graph
  
  # create a list that contains the settings
  settings <- list(
    drawEdges = drawEdges,
    drawNodes = drawNodes
  )
  
  # pass the data and settings using 'x'
  x <- list(
    data = data,
    settings = settings
  )
  
  # create the widget
  htmlwidgets::createWidget("sigma", x, width = width, height = height)
}

#' @export
sigmaOutput <- function(outputId, width = "100%", height = "400px") {
  shinyWidgetOutput(outputId, "sigma", width, height, package = "sigma")
}

#' @export
renderSigma <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, sigmaOutput, env, quoted = TRUE)
}
