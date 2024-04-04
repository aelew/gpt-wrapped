import { Button } from '@/components/ui/button';
import { ConversationForm } from './conversation-form';

export default function HomePage() {
  return (
    <section className="flex flex-col">
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
        <span className="text-6xl" aria-hidden>
          🎁
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          GPT Wrapped
        </h1>
        <p className="max-w-sm text-lg leading-6 text-muted-foreground">
          Learn more about how you use{' '}
          <strong className="font-medium">ChatGPT</strong> with conversation
          insights!
        </p>
      </div>
      <ConversationForm />
      <Button className="group shadow" variant="outline">
        I want insights on all my conversations!
      </Button>
    </section>
  );
}
