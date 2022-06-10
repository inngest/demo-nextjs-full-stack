# Demo Inngest + Next.js

This example repo demonstrates how one might build our their background jobs along side a Next.js API backend. It could be any backend in any language, but this uses Next since it's fairly simple to install and understand.

👋 _**Have a question or suggestion? [Join our Discord](https://www.inngest.com/discord)!**_

## Start the app

Start the Next.js app in dev mode and the **Inngest dev server** ([install instructions](https://github.com/inngest/inngest-cli)):

```
yarn dev
```

```
inngest dev
```

## Environment variables

Check out `.env.example` for direction for your own `.env` files. See [the Next.js docs](https://nextjs.org/docs/basic-features/environment-variables) for more information.

To set environment variables for any Inngest functions prefix them (e.g. `TWILIO_AUTH_TOKEN=123... inngest dev`) or set them via `export`.

## The app

The demo app is a basic Next.js form view which when submitted, sends event(s) in batch to Inngest and runs the "Send SMS Dispatch" function. For reference, these are direct links to the code:

- [`dispatch.js`](./pages/api/dispatch.js) - Sending an event to Inngest and Inngest DevServer during development via a Next.js API endpoints (the form receiver).
- [`index.ts`](./functions/send-sms-dispatch/src/index.ts) - Handling the event and sending an SMS via the Twilio API.

If you want to, create a new function by running `inngest init` in the `functions` directory.

![Inngest Demo App](./screenshot.png)

### Notes

- Inngest dev server support for `.env` files is in development ([inngest-cli#93](https://github.com/inngest/inngest-cli/issues/93)). If you want to use environment variables use `export VAR=val` before you run `inngest dev` or `run`
