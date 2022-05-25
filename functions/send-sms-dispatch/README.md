# Send SMS Dispatch

This function takes a payload of an event `worker.dispatched` and sends an SMS message via the Twilio API.

## To test

In this function's directory run, either prepend or export your Twilio Auth token and use the `inngest run` command:

```
TWILIO_AUTH_TOKEN=XYZ... inngest run
```
