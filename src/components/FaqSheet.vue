<script setup lang="ts">
import { Button } from '@/shadcn/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/components/ui/accordion'
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

const faqItems = [
  {
    question: 'Where do the videos stream from?',
    answer:
      'The videos stream straight from the Conan Classics servers. The search engine does not store any videos.',
  },
  {
    question: 'Why does the video stream not work on my browser?',
    answer:
      "Due to technical limitations, the video needs to be played through your browser's native video player. Some browser do not support the required video format yet. That is why only Safari and recent Chrome-based browsers are supported.",
  },
  {
    question: 'Why are only some videos watchable?',
    answer:
      'Due to the Conan Classics server interface being quite broken, only ~3k of the 15k video links were recoverable. Non watchable search results redirect to the video on the Conan Classics website.',
  },
]
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" class="fixed bottom-4 right-4"> FAQ </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>FAQ</SheetTitle>
        <SheetDescription>
          Frequently asked questions about the Conan Classics Rebirth Search.
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
          <Button> Close </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
