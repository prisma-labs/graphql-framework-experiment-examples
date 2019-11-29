import { app } from "pumpkins"

app.addContext(() => {
  return {
    db: {
      users: {
        newton: {
          id: "1",
          birthyear: "1649",
          name: "Newton"
        }
      }
    }
  }
})

app.server.start()
