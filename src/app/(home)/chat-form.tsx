'use client';

import { EyeIcon, LinkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ChatForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return (
    <div className="mx-auto mb-4 grid w-full max-w-md gap-2">
      <Label className="items-center flex" htmlFor="chatUrl">
        <LinkIcon className="mr-1.5 size-4" />
        ChatGPT Chat URL
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
