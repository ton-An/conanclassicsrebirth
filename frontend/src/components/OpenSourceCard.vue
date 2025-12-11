<script setup lang="ts">
import { Github } from 'lucide-vue-next'

import i18n from '@/i18n/i18n'
import { Button } from '@/shadcn/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shadcn/components/ui/card'

const t = i18n.global.t
</script>

<template>
  <div
    class="p-[2px] rounded-[13px] bg-[linear-gradient(to_right,#ef4444,#f97316,#eab308,#22c55e,#3b82f6,#6366f1,#a855f7)] w-full max-w-sm"
  >
    <Card class="w-full rounded-[10px] border-0 gap-3">
      <CardHeader>
        <CardTitle class="flex items-center gap-2"
          ><Github /> {{ t('openSource.title') }}</CardTitle
        >
      </CardHeader>
      <CardContent>
        <p class="text-foreground/80">
          {{ t('openSource.description') }}
        </p>
      </CardContent>
      <CardFooter class="flex flex-col gap-2">
        <Button
          as="a"
          href="https://github.com/ton-An/conanclassicsrebirth"
          target="_blank"
          variant="outline"
          class="w-full"
        >
          {{ t('openSource.viewOnGitHub') }}
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
