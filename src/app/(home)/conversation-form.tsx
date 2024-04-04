'use client';

import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
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

export function ConversationForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return (
    <div className="mx-auto mb-4 grid w-full max-w-md gap-2">
      <Label className="flex items-center" htmlFor="conversationUrl">
        ChatGPT Conversation URL
        <Tooltip>
          <TooltipTrigger className="hover:cursor-help">
            <QuestionMarkCircledIcon className="ml-1 size-4" />
          </TooltipTrigger>
          <TooltipContent>
            <Image
              src="https://placehold.co/400"
              alt="Placeholder"
              className="py-2"
              height={200}
              width={200}
              unoptimized
            />
            <p>Some information will appear here</p>
          </TooltipContent>
        </Tooltip>
      </Label>
      <Input
        placeholder="https://chat.openai.com/share/..."
        id="conversationUrl"
        ref={inputRef}
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
          router.push(`/conversation/${shareId}`);
        }}
      >
        <EyeIcon className="mr-2 size-4" />
        View insights
      </Button>
    </div>
  );
}
