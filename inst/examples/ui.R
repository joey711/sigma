library(shiny)

# Define UI for application that draws a histogram
shinyUI(fluidPage(

  # Application title
  titlePanel("Hello Shiny!"),

  # Sidebar with a slider input for the number of bins
  sidebarLayout(
    sidebarPanel(
      selectInput("type", "Type", multiple = TRUE,
                  choices = as.character(unique(nodes$type)),
                  selected = as.character(unique(nodes$type))),
      selectInput("hover", "Node Hover", multiple = TRUE,
                  choices = colnames(nodes), selected = colnames(nodes))
    ),

    # Show a plot of the generated distribution
    mainPanel(
      sigma::sigmaOutput("jsplot_sigma1")
    )
  )
))
