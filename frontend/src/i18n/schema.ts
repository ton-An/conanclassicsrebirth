type MessageSchema = {
  close: string
  errors: {
    network: {
      request: {
        title: string
        description: string
      }
    }
  }
}

export type { MessageSchema }
