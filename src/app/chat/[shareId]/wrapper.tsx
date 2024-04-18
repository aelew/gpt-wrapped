import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import OpenAI from 'openai';

import { Time } from '@/components/time';
import { PERSONALITIES } from '@/lib/constants/personalities';
import type { Chat } from '@/lib/types';
import { Stage } from './stage';

const SCRIPT_TAG_PREFIX =
  '<script id="__NEXT_DATA__" type="application/json" crossorigin="anonymous">';

const SCRIPT_TAG_SUFFIX = '</script>';

export async function Wrapper({ shareId }: { shareId: string }) {
  const response = await fetch(`https://chat.openai.com/share/${shareId}`);
  if (!response.ok) {
    notFound();
  }

  const text = await response.text();

  // prettier-ignore
  const pageProps = JSON.parse(text.split(SCRIPT_TAG_PREFIX)[1].split(SCRIPT_TAG_SUFFIX)[0]);
  const chat: Chat = pageProps.props.pageProps.serverResponse.data;

  const messages = chat.linear_conversation
    .filter((c) => c.message)
    .map((c) => ({
      role: c.message!.author.role as 'system' | 'user' | 'assistant',
      content: c.message!.content.parts.join(' ')
    }));

  const openai = new OpenAI();
  const gptCompletion = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      ...messages,
      {
        role: 'user',
        content:
          'Your response should be a JSON object with the keys "tone", "topic", "summary", "summary_comment", "system_prompt", and "personality". ' +
          'Tone should describe the tone of the chat we had in one word (for example, "Neutral"). ' +
          'Topic should describe the topic of the chat. It should be two words and very general, like "Code help". ' +
          'Summary should be a summary of the chat. ' +
          'Summary comment should be a joking comment about the summary/chat as a whole. ' +
          'System prompt should be an example prompt that can be used to replicate this chat with placeholders if neccessary. ' +
          `Personality should be one of the following: ${Object.entries(
            PERSONALITIES
          )
            .map(([name, description]) => `${name} (${description})`)
            .join(', ')}. ` +
          'Do not include any other information in your response. When referring to ChatGPT, mention it by name, not "I". '
      }
    ]
  });

  const gptResponse = gptCompletion.choices[0].message.content;
  if (!gptResponse) {
    notFound();
  }

  const completion = JSON.parse(gptResponse) as {
    tone: string;
    topic: string;
    summary: string;
    summary_comment: string;
    system_prompt: string;
    personality: keyof typeof PERSONALITIES;
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-6xl" aria-hidden>
          💬
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-green-600">
          Here&apos;s your wrapped!
        </h1>
        <div className="text-center">
          <h2 className="mx-auto max-w-sm text-2xl font-semibold tracking-tight">
            {chat.title}
          </h2>
          <div className="flex items-center justify-center text-muted-foreground">
            <Time date={chat.create_time * 1000} />
            <Link
              href={`https://chat.openai.com/share/${shareId}`}
              className="mb-0.5 ml-2"
              target="_blank"
            >
              <ExternalLinkIcon className="size-4" />
            </Link>
          </div>
        </div>
      </div>
      <Stage chat={chat} completion={completion} />
    </>
  );
}
