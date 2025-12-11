<script setup lang="ts">
import { onMounted } from 'vue'
import { toast, Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
function getBrowserInfo() {
  const ua = navigator.userAgent

  // Check for Chrome/Chromium-based browsers
  const chromeMatch = ua.match(/(?:Chrome|Chromium)\/(\d+)/)
  if (chromeMatch) {
    return { browser: 'chromium', version: parseInt(chromeMatch[1] ?? '0', 10) }
  }

  // Check for Safari (must check after Chrome since Chrome UA includes Safari)
  const safariMatch = ua.match(/Safari\/(\d+)/)
  const isSafari = safariMatch && !ua.includes('Chrome') && !ua.includes('Chromium')
  if (isSafari) {
    const versionMatch = ua.match(/Version\/(\d+)/)
    return { browser: 'safari', version: versionMatch ? parseInt(versionMatch[1] ?? '0', 10) : 0 }
  }

  // Firefox
  const firefoxMatch = ua.match(/Firefox\/(\d+)/)
  if (firefoxMatch) {
    return { browser: 'firefox', version: parseInt(firefoxMatch[1] ?? '0', 10) }
  }

  return { browser: 'unknown', version: 0 }
}

function shouldShowBrowserWarning(): boolean {
  const { browser, version } = getBrowserInfo()

  // Allow Safari (any version) or Chromium-based browsers >= 143
  if (browser === 'safari') return false
  if (browser === 'chromium' && version >= 143) return false

  // Show warning for all other browsers
  return true
}

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
})
</script>

<template>
  <RouterView />
  <Toaster />
</template>
