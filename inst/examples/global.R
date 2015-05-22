library("sigma")
edges <- data.frame(
  source = c("Glutamic Acid", "Glutamic Acid", "Glutamic Acid", 
             "Clostridia dificile","Glutamic Acid", "E. coli"),
  target = c("Wnt", "MAPK", "Ras", "Glutamic Acid", "E. coli", "Glutamic Acid")
)
nodes <- data.frame(
  id = c("Glutamic Acid", "E. coli", "Clostridia dificile", "Wnt", "MAPK", "Ras"),
  type = c("Compound","Microbe","Microbe","Host","Host","Host"),
  size=c(4,2,2,3,2,1),
  x=c(2,1,1,3,3,3),
  y=c(2,1.5,3,2,3,2.5)
)
