#' Create the sigma.js object
#'
#' @param jsonData data
#' @param drawEdges logical
#' @param drawNodes logical
#' @param width integer?
#' @param height integer?
#'
#' @return something awesome
#'
#' @import htmlwidgets
#'
#' @export
sigma <- function(jsonData, drawEdges = TRUE, drawNodes = TRUE,
                  width = NULL, height = NULL, data_cols= NULL) {

  # Convert the gexf object to character vector
  data <- jsonData

  # create a list that contains the settings
  settings <- list(
    drawEdges = drawEdges,
    drawNodes = drawNodes,
    data_cols = data_cols
  )


  # pass the data and settings using 'x'
  x <- list(
    data = data,
    settings = settings
  )

  # create the widget
  createWidget("sigma", x, width = width, height = height)
}
#' @import htmlwidgets
#' @export
sigmaOutput <- function(outputId, width = "100%", height = "800px") {
  shinyWidgetOutput(outputId, "sigma", width, height, package = "sigma")
}
#' @import htmlwidgets
#' @export
renderSigma <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, sigmaOutput, env, quoted = TRUE)
}
