import twilio from "twilio"

import type { Args } from "./types"

const accountSid = "AC24e89b9427fb194291681f4b4b644fd5"
const authToken = process.env.TWILIO_AUTH_TOKEN
const messagingServiceSid = "MGe27a599530bdef5df9c2fffd326ea39c"

export async function run({ event }: Args) {
  const { data, user } = event
  const { message } = data
  const { phone } = user
  const twilioClient = twilio(accountSid, authToken)

  try {
    const res = await twilioClient.messages.create({
      messagingServiceSid,
      to: process.env.DEMO_PHONE_NUMBER || phone,
      // to: "+1 (123) 555-1234", // Hardcode for demo purposes
      body: message,
    })

    return {
      status: 200,
      body: {
        messageStatus: res.status,
        messageSid: res.sid,
      },
    }
  } catch (err: any) {
    return {
      status: err.status,
      body: {
        code: err.code,
        message: err.message,
      },
    }
  }
}
