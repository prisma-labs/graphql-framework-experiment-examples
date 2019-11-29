import { app } from "pumpkins"

app.addContext(() => {
  return {
    a: 1
  }
})

app.server.start()
