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
          <div className="relative">
            <p
              className="absolute animate-ping text-6xl opacity-25 drop-shadow-lg delay-100"
              aria-hidden
            >
              🎁
            </p>
            <p className="animate-bounce text-6xl drop-shadow-lg" aria-hidden>
              🎁
            </p>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-green-600 sm:text-5xl">
            GPT Wrapped
          </h1>
          <div className="max-w-sm text-lg text-muted-foreground">
            <p>We&apos;re building your personalized wrapped.</p>
            <strong className="font-medium">Get ready!</strong>
          </div>
          <p className="text-medium mt-2 max-w-sm text-muted-foreground">
            <strong className="font-medium">Fun fact:</strong> The daily cost of
            running ChatGPT is approximately $700,000 due to computational power
            and expensive servers.
          </p>
        </section>
      }
    >
      <Wrapper shareId={shareId} />
    </Suspense>
  );
}
