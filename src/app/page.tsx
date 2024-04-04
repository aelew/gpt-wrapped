import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { EyeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

export default function HomePage() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-6xl" aria-hidden>
          🎁
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          GPT Wrapped
        </h1>
        <p className="max-w-sm text-lg leading-6 text-muted-foreground">
          Learn more about how you use ChatGPT with insights from your
          conversations!
        </p>
      </div>
      <div className="mx-auto grid w-full max-w-md gap-2">
        <Label className="flex items-center" htmlFor="conversationUrl">
          Conversation URL
          <Tooltip>
            <TooltipTrigger className="hover:cursor-help">
              <QuestionMarkCircledIcon className="ml-1 size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Some information will appear here</p>
            </TooltipContent>
          </Tooltip>
        </Label>
        <Input
          placeholder="https://chat.openai.com/share/..."
          id="conversationUrl"
        />
        <Button className="w-full">
          <EyeIcon className="mr-2 size-4" />
          View insights
        </Button>
      </div>
      <Button className="group" variant="outline">
        I want insights on all my conversations!
      </Button>
    </section>
  );
}
