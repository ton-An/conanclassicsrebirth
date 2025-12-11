<script setup lang="ts">
import 'vue-sonner/style.css'

import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
import { toast, Toaster } from 'vue-sonner'

import type { MessagePath } from './i18n/i18n'
import { SearchFailure } from './stores/searchStore/searchStates'
import { useSearchStore } from './stores/searchStore/searchStore'
/**
 * Gets the browser information from the user agent.
 * @returns The browser information.
 */
function getBrowserInfo() {
  const ua = navigator.userAgent

  const chromeMatch = ua.match(/(?:Chrome|Chromium)\/(\d+)/)
  if (chromeMatch) {
    return { browser: 'chromium', version: parseInt(chromeMatch[1] ?? '0', 10) }
  }

  const safariMatch = ua.match(/Safari\/(\d+)/)
  const isSafari = safariMatch && !ua.includes('Chrome') && !ua.includes('Chromium')
  if (isSafari) {
    const versionMatch = ua.match(/Version\/(\d+)/)
    return { browser: 'safari', version: versionMatch ? parseInt(versionMatch[1] ?? '0', 10) : 0 }
  }

  const firefoxMatch = ua.match(/Firefox\/(\d+)/)
  if (firefoxMatch) {
    return { browser: 'firefox', version: parseInt(firefoxMatch[1] ?? '0', 10) }
  }

  return { browser: 'unknown', version: 0 }
}

/**
 * Checks if the browser is supported by the video player.
 * @returns True if the browser is not supported, false otherwise.
 */
function shouldShowBrowserWarning(): boolean {
  const { browser, version } = getBrowserInfo()

  // Allow Safari (any version) or Chromium-based browsers >= 143
  if (browser === 'safari') return false
  if (browser === 'chromium' && version >= 143) return false

  // Show warning for all other browsers
  return true
}

const { t } = useI18n()

const searchStore = useSearchStore()

onMounted(() => {
  if (shouldShowBrowserWarning()) {
    toast.warning('Playback not supported', {
      description:
        'Your browser does not support the required playback technology. Use Safari or an up-to-date Chrome based browser',
      duration: 10000,
      position: 'top-right',
      closeButton: true,
    })
  }

  searchStore.$subscribe(async (_, state) => {
    if (state.state instanceof SearchFailure) {
      toast.warning(
        t(`errors.${state.state.failure.category}.${state.state.failure.id}.title` as MessagePath),
        {
          description: t(
            `errors.${state.state.failure.category}.${state.state.failure.id}.description` as MessagePath,
          ),
        },
      )
    }
  })
})
</script>

<template>
  <RouterView />
  <Toaster />
</template>
