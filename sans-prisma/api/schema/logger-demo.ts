import { app } from "graphql-santa"

// root logger exposed on app
app.logger

// six log levels

app.logger.fatal
app.logger.error
app.logger.warn
app.logger.info
app.logger.debug
app.logger.trace

// can log events with context

app.logger.info("shutdown", { reason: "overheat" })

// can create children

const engineRoom = app.logger.child("engine-room")
engineRoom.info("loaded", { duration: 500 })

// children inherit context

app.logger.addToContext({ root: "data" })
engineRoom.info("ok")

// children can add their own isolated context

engineRoom.addToContext({ color: "red" })
engineRoom.info("statusChange", { newStatus: "offline" })

// there is a per-request child logger available in resolver context

app.extendType({
  type: "Query",
  definition(t) {
    t.string("foobar", (_root, args, ctx) => {
      ctx.logger.debug("foo")
    })
  }
})
