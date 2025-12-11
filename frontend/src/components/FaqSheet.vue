<script setup lang="ts">
import i18n from '@/i18n/i18n'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/components/ui/accordion'
import { Button } from '@/shadcn/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shadcn/components/ui/sheet'

import OpenSourceCard from './OpenSourceCard.vue'

const t = i18n.global.t

const faqItems = [
  {
    question: t('faq.questions.streamFrom.title'),
    answer: t('faq.questions.streamFrom.description'),
  },
  {
    question: t('faq.questions.videoNotSupported.title'),
    answer: t('faq.questions.videoNotSupported.description'),
  },
  {
    question: t('faq.questions.someVideosNotWatchable.title'),
    answer: t('faq.questions.someVideosNotWatchable.description'),
  },
  {
    question: t('faq.questions.affiliatedWithTeamCoco.title'),
    answer: t('faq.questions.affiliatedWithTeamCoco.description'),
  },
]
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" class="fixed bottom-4 right-4"> {{ t('faq.title') }} </Button>
    </SheetTrigger>
    <SheetContent class="overflow-y-scroll">
      <SheetHeader>
        <SheetTitle>{{ t('faq.title') }}</SheetTitle>
        <SheetDescription>
          {{ t('faq.description') }}
        </SheetDescription>
      </SheetHeader>
      <div class="grid flex-1 auto-rows-min gap-6 px-4">
        <Accordion type="single" collapsible class="w-full" default-value="item-1">
          <AccordionItem v-for="item in faqItems" :key="item.question" :value="item.question">
            <AccordionTrigger>{{ item.question }}</AccordionTrigger>
            <AccordionContent class="text-foreground/80">{{ item.answer }}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <SheetFooter>
        <OpenSourceCard class="mb-4" />
        <SheetClose as-child>
          <Button> {{ t('close') }} </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
