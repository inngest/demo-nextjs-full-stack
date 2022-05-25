import type { EventTriggers } from "./types"
import { run } from "./index"

type Context = {
  baggage: {
    WorkspaceEvent: {
      Event: EventTriggers
    }
    Actions: {
      [clientID: string]: any
    }
  }
}

/**
 * Init initializes the context for running the function.  This calls
 * start() when
 */
async function init() {
  let context: Context | undefined

  // We pass the event in as an argument to the node function.  Running
  // npx ts-node "./foo.bar" means we have 2 arguments prior to the event.
  // We'll also be adding stdin and lambda compatibility soon.
  context = JSON.parse(process.argv[2])

  console.log("context", process.argv[2])

  if (!context) {
    throw new Error("unable to parse context")
  }

  const result = await run({
    // event: context.baggage.WorkspaceEvent.Event,
    // actions: context.baggage.Actions,
  })
  return result
}

init()
  .then((result) => {
    // TODO If this isn't an object, wrap this in a result object.
    if (typeof result === "string") {
      console.log(JSON.stringify({ result }))
      return
    }
    console.log(JSON.stringify(result))
  })
  .catch((e) => {
    // TODO: Log error and stack trace.
    console.log(JSON.stringify({ error: e }))
    process.exit(1)
  })
