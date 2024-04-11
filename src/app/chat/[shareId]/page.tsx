import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { MotionSection } from '@/components/motion';
import { Time } from '@/components/time';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Stuff } from './stuff';

interface ConversationPageProps {
  params: {
    shareId: string;
  };
}

const SCRIPT_TAG_PREFIX =
  '<script id="__NEXT_DATA__" type="application/json" crossorigin="anonymous">';

const SCRIPT_TAG_SUFFIX = '</script>';

export default async function ChatPage({ params }: ConversationPageProps) {
  const shareId = decodeURIComponent(params.shareId);
  const response = await fetch(`https://chat.openai.com/share/${shareId}`);
  if (!response.ok) {
    notFound();
  }

  const text = await response.text();

  // prettier-ignore
  const pageProps = JSON.parse(text.split(SCRIPT_TAG_PREFIX)[1].split(SCRIPT_TAG_SUFFIX)[0]);
  const data = pageProps.props.pageProps.serverResponse.data;
  console.log(data);

  return (
    <MotionSection
      className="flex flex-col gap-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-6xl" aria-hidden>
          💬
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Here is your wrapped!
        </h1>
        <h2 className="max-w-sm text-4xl font-semibold tracking-tight">
          {data.title}
        </h2>
        <div className="flex items-center text-muted-foreground">
          <Time date={data.create_time * 1000} />
          <Link
            href={`https://chat.openai.com/share/${shareId}`}
            className="mb-0.5 ml-2"
            target="_blank"
          >
            <ExternalLinkIcon className="size-4" />
          </Link>
        </div>
      </div>
      <Stuff />
    </MotionSection>
  );
}
