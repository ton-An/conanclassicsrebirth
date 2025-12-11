import type { MessageSchema } from './schema'

const en: MessageSchema = {
  close: 'Close',
  home: {
    title: 'Conan Classics Search',
    search: 'Search',
    searchPlaceholder: 'Search for a video',
  },
  playbackNotSupported: {
    title: 'Playback not supported',
    description:
      'Your browser does not support the required playback technology. Use Safari or an up-to-date Chrome based browser',
  },
  openSource: {
    title: 'Proudly Open Source',
    description:
      'This means that the source code is publicly available. You are invited to contribute, report bugs or suggest new features.',
    viewOnGitHub: 'View on GitHub',
  },
  faq: {
    title: 'FAQ',
    description: 'Frequently asked questions about the Conan Classics Rebirth Search.',
    questions: {
      streamFrom: {
        title: 'Where do the videos stream from?',
        description:
          'The videos stream straight from the Conan Classics servers. The search engine does not store any videos.',
      },
      videoNotSupported: {
        title: 'Why does the video stream not work in my browser?',
        description:
          "Due to technical limitations, the video needs to be played through your browser's native video player. Some browser do not support the required video format yet. That is why only Safari and recent Chrome-based browsers are supported.",
      },
      someVideosNotWatchable: {
        title: 'Why are only some videos watchable?',
        description:
          'Due to the Conan Classics server interface being quite broken, only ~3k of the 15k video links were recoverable. Non watchable search results redirect to the video on the Conan Classics website.',
      },
      affiliatedWithTeamCoco: {
        title: 'Is this project affiliated with Team Coco?',
        description:
          'This project has no affiliation with Team Coco. It was born of a far more tragic, and frankly, far more petty origin story: a single, faithful pizza night where the Conan Classics website cruelly denied my right to binge-watch.',
      },
    },
  },
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
