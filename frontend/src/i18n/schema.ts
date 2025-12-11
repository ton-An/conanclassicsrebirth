type MessageSchema = {
  close: string
  home: {
    title: string
    search: string
    searchPlaceholder: string
  }
  playbackNotSupported: {
    title: string
    description: string
  }
  openSource: {
    title: string
    description: string
    viewOnGitHub: string
  }
  faq: {
    title: string
    description: string
    questions: {
      streamFrom: {
        title: string
        description: string
      }
      videoNotSupported: {
        title: string
        description: string
      }
      someVideosNotWatchable: {
        title: string
        description: string
      }
      affiliatedWithTeamCoco: {
        title: string
        description: string
      }
    }
  }
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
