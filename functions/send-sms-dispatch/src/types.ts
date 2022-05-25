export type EventTriggers = {
  [key: string]: any
}

export type Args = {
  event: EventTriggers
  actions: {
    [clientID: string]: any
  }
}
