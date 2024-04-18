import { Suspense } from 'react';

import { Wrapper } from './wrapper';

interface ConversationPageProps {
  params: {
    shareId: string;
  };
}

export default async function ChatPage({ params }: ConversationPageProps) {
  const shareId = decodeURIComponent(params.shareId);
  return (
    <Suspense
      fallback={
        <section className="flex flex-col items-center gap-3 text-center">
          <span className="animate-bounce text-6xl" aria-hidden>
            🎁
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            GPT Wrapped
          </h1>
          <p className="max-w-sm text-muted-foreground">
            Building your wrapped&hellip; Get ready!
          </p>
        </section>
      }
    >
      <Wrapper shareId={shareId} />
    </Suspense>
  );
}
