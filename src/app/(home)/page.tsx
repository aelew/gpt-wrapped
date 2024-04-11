import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { ChatForm } from './chat-form';

export default function HomePage() {
  return (
    <section className="flex flex-col">
      <Image
        className="absolute left-36 hidden lg:block"
        src="/_static/bubbles-left.gif"
        height={200}
        width={200}
        alt=""
      />
      <Image
        className="absolute right-36 hidden translate-y-1/2 lg:block"
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
      <ChatForm />
      <Button className="group shadow" variant="outline">
        I want insights on all my conversations!
      </Button>
    </section>
  );
}
