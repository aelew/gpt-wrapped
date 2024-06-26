import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import './globals.css';

export const metadata: Metadata = {
  title: 'GPT Wrapped',
  description:
    'Uncover insights within your conversations with ChatGPT! Learn more about your prompts and what they reveal about you.'
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'relative flex min-h-[80vh] flex-col items-center justify-center bg-background px-4 antialiased sm:min-h-screen',
          GeistSans.className
        )}
      >
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        <Toaster richColors />
        <div className="absolute inset-0 -z-10 size-full -translate-x-2 -translate-y-2 overflow-hidden bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_3rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#bbf7d0,transparent)]" />
        </div>
      </body>
    </html>
  );
}
