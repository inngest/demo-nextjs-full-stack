import type { Args } from "./types"
import { run } from "./index"

/**
 * Init initializes the context for running the function.  This calls
 * start() when
 */
async function init() {
  // let context: Args | undefined

  // We pass the event in as an argument to the node function.  Running
  // npx ts-node "./foo.bar" means we have 2 arguments prior to the event.
  // We'll also be adding stdin and lambda compatibility soon.
  let context = JSON.parse(process.argv[2])

  if (!context) {
    throw new Error("unable to parse context")
  }

  // v1
  const result = await run(context)
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
    if (result.status >= 400) {
      process.exit(1)
    }
  })
  .catch((e) => {
    // TODO: Log error and stack trace.
    console.log(JSON.stringify({ error: e }))
    process.exit(1)
  })
