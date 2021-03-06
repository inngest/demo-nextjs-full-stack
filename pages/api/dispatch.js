import { Inngest } from "inngest"

import { team } from "../../data"

export default async function handler(req, res) {
  const { ids, message } = req.body

  if (!ids?.length || !message) {
    return res.redirect(301, `/?success=false&message=Missing+parameters`)
  }

  const userIds = Array.isArray(req.body?.ids) ? req.body.ids : [req.body.ids]
  const users = userIds.map((userId) => team.find((u) => u.id === userId))

  const events = users.map((user) => ({
    name: "worker.dispatched",
    data: {
      message: message,
    },
    user: {
      external_id: user.id,
      name: user.name,
      phone: user.phone,
    },
  }))

  const options = {}
  if (process.env.NODE_ENV === "development") {
    options.inngestApiUrl = "http://localhost:9999/e/"
  }

  const inngest = new Inngest(process.env.INNGEST_KEY, options)
  await inngest.send(events)

  res.redirect(
    301,
    `/?success=true&message=Sent+dispatches+to+${userIds.length}+users`
  )
}
