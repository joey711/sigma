
sigma <- function(json_data, drawEdges = TRUE, drawNodes = TRUE,
                  width = NULL, height = NULL) {
  
  # Convert the gexf object to character vector
  data <- json_data
  
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
