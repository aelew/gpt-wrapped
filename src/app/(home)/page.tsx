import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ChatForm } from './chat-form';

export default function HomePage() {
  return (
    <section className="flex flex-col">
      <Image
        className="absolute left-36 hidden duration-1000 animate-in fade-in slide-in-from-bottom-6 lg:block"
        src="/_static/bubbles-left.gif"
        height={200}
        width={200}
        alt=""
      />
      <Image
        className="absolute right-36 hidden translate-y-1/2 duration-1000 animate-in fade-in lg:block"
        src="/_static/bubbles-right.gif"
        height={200}
        width={200}
        alt=""
      />
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
        <span className="text-6xl" aria-hidden>
          🎁
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          GPT Wrapped
        </h1>
        <p className="max-w-sm text-muted-foreground">
          Uncover insights within{' '}
          <strong className="font-semibold">your</strong> conversations with{' '}
          <strong className="font-medium">ChatGPT</strong>! Learn more about
          your prompts and what they reveal about you.
        </p>
      </div>
      <video
        className="mb-6 rounded-lg shadow-lg"
        width={400}
        autoPlay
        muted
        loop
      >
        <source src="/_static/share-demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <ChatForm />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="group shadow" variant="outline">
            I want insights on all my conversations!
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>I want insights on all my conversations!</DialogTitle>
            <DialogDescription>
              This feature isn&apos;t ready yet, but you can still get insights
              on individual conversations!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}
