'use client';

import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { EyeIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

export function ChatForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return (
    <div className="mx-auto mb-4 grid w-full max-w-md gap-2">
      <Label className="flex items-center" htmlFor="chatUrl">
        ChatGPT Chat URL
        <Tooltip>
          <TooltipTrigger className="hover:cursor-help">
            <QuestionMarkCircledIcon className="ml-1 size-4" />
          </TooltipTrigger>
          <TooltipContent className="rounded-lg p-1.5">
            <video className="rounded-sm" width={400} autoPlay muted loop>
              <source src="/_static/share-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </TooltipContent>
        </Tooltip>
      </Label>
      <Input
        placeholder="https://chat.openai.com/share/..."
        ref={inputRef}
        id="chatUrl"
      />
      <Button
        onClick={() => {
          if (!inputRef.current) return;
          const url = inputRef.current.value.trim();
          if (!url.startsWith('https://chat.openai.com/share/')) {
            toast.error("Uh oh! That URL doesn't seem right.");
            return;
          }
          const shareId = url.slice(30);
          router.push(`/chat/${shareId}`);
        }}
      >
        <EyeIcon className="mr-2 size-4" />
        View insights
      </Button>
    </div>
  );
}
