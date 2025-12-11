import type { MessageSchema } from './schema'

const en: MessageSchema = {
  close: 'Close',
  errors: {
    network: {
      request: {
        title: 'Network Request Failed',
        description: 'Could not connect to the server. Please try again.',
      },
    },
  },
}

export default en
