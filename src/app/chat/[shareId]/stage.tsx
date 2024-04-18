'use client';

import {
  SiLinkedin,
  SiReddit,
  SiTelegram,
  SiX
} from '@icons-pack/react-simple-icons';
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { ClockIcon } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import {
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton
} from 'react-share';

import { MotionDiv } from '@/components/motion';
import { NumberTicker } from '@/components/number-ticker';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import type { Chat } from '@/lib/types';
import { cn } from '@/lib/utils';

import '@splidejs/react-splide/css/sea-green';

import Image from 'next/image';
import { toast } from 'sonner';

import { PERSONALITIES } from '@/lib/constants/personalities';

export function Stage({
  chat,
  completion
}: {
  chat: Chat;
  completion: {
    tone: string;
    topic: string;
    summary: string;
    summary_comment: string;
    system_prompt: string;
    personality: keyof typeof PERSONALITIES;
  };
}) {
  function calculateChatDuration() {
    const messages = chat.linear_conversation.filter(
      (c) => c.message?.create_time
    );

    const startTime = messages[0].message!.create_time;
    const endTime = messages[messages.length - 1].message!.create_time;

    const durationInSeconds = endTime - startTime;

    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;

    // Format the duration string
    let number = 0;
    let s = '';
    if (minutes > 0) {
      number = minutes;
      s += `minute${minutes > 1 ? 's' : ''} `;
    } else {
      number = seconds;
      s += `second${seconds !== 1 ? 's' : ''}`;
    }

    return [parseFloat(number.toFixed(2)), s] as const;
  }

  function compileUserMessagesToString() {
    let compiledMessage = '';

    chat.linear_conversation.forEach((item) => {
      if (item.message && item.message.author.role === 'user') {
        if (item.message.content && item.message.content.parts) {
          item.message.content.parts.forEach((part) => {
            compiledMessage += part + ' ';
          });
        }
      }
    });

    return compiledMessage.trim().toLowerCase();
  }

  const [duration] = useState(calculateChatDuration());
  const [userMessages] = useState(compileUserMessagesToString());

  const thankedChatGPT = userMessages.includes('thank');

  const ref = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string | null>(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true, height: ref.current.scrollHeight })
      .then((dataUrl) => {
        setImage(dataUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const personality = (
    <div className="relative isolate h-fit overflow-hidden bg-gray-900 p-6 shadow-2xl sm:rounded-3xl">
      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
        aria-hidden="true"
      >
        <circle
          cx="512"
          cy="512"
          r="512"
          fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
            <stop stopColor="#7775D6" />
            <stop offset="1" stopColor="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
      <div className="flex justify-between gap-6">
        <div>
          <p className="text-lg font-medium text-white">Your personality</p>
          <h2 className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            {completion.personality}
          </h2>
        </div>
        <Image
          src={`/_static/personalities/${completion.personality.toLowerCase().replaceAll(' ', '-')}.jpg`}
          alt={completion.personality}
          className="rounded-lg"
          height={64}
          width={64}
        />
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl">
      <Splide
        options={{
          rewind: true,
          // wheel: true,
          // wheelSleep: 500,
          omitEnd: true
        }}
      >
        <SplideSlide>
          <Card className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <motion.span
              className="text-6xl"
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              aria-hidden
            >
              👀
            </motion.span>
            <motion.div initial={{ y: 24 }} animate={{ y: 0 }}>
              <p className="text-lg leading-6">
                Welcome to your{' '}
                <strong className="font-semibold">GPT Wrapped</strong>!
              </p>
              <p className="text-lg leading-6 text-muted-foreground">
                Let&apos;s take a look at your recent chat with{' '}
                <strong className="font-medium">ChatGPT</strong>.
              </p>
            </motion.div>
          </Card>
        </SplideSlide>
        <SplideSlide>
          <div className="flex h-full flex-col items-center justify-center gap-6">
            <Card className="flex min-w-72 items-center justify-between gap-8 p-5">
              <div>
                <p className="text-lg">Your chat lasted&hellip;</p>
                <p className="inline-block bg-gradient-to-r from-indigo-400 to-blue-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                  <NumberTicker delay={0.25} value={duration[0]} />{' '}
                  {duration[1]}
                </p>
              </div>
              <div className="relative">
                <ClockIcon className="duration-[2000ms] absolute size-12 animate-ping opacity-20" />
                <ClockIcon className="size-12" />
              </div>
            </Card>
            <motion.p
              className="max-w-md rounded-xl bg-black/60 p-1 text-center text-lg leading-6 text-muted-foreground text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              {duration[1].startsWith('second') || duration[0] < 3
                ? "Blink and you'll miss it — your chat session, that is. Speedy Gonzalez has nothing on you. Was that a chat or a race?"
                : "Wow. That's a long chat! How about you go outside and get some sunlight? Stretch those legs!"}
            </motion.p>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex h-full flex-col items-center justify-center gap-6">
            <Card className="flex min-w-72 items-center justify-between gap-8 p-5">
              <div>
                <p className="text-lg">
                  Did you thank <strong className="font-medium">ChatGPT</strong>
                  ?
                </p>
                <p
                  className={cn(
                    'text-3xl font-bold tracking-tight',
                    thankedChatGPT ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  {thankedChatGPT ? 'Yes 👍' : 'No 🥲'}
                </p>
              </div>
              <Image
                alt="User didn't thank ChatGPT meme"
                src="/_static/no-thank.jpg"
                height={200}
                width={200}
              />
            </Card>
            <motion.p
              className="max-w-md rounded-xl bg-black/60 p-1 text-center text-lg leading-6 text-muted-foreground text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {thankedChatGPT
                ? "ChatGPT's circuits are warmed by your gratitude. You're a kind soul. 🤖❤️"
                : "You know who they're going to remember during the robot apocalypse, right?"}
            </motion.p>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex h-full flex-col items-center justify-center gap-6">
            <Card className="flex min-w-72 items-center justify-between gap-8 p-5">
              <div>
                <p className="text-lg">💡 Your tone was&hellip;</p>
                <p className="inline-block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                  {completion.tone}
                  {/* Polite, inquisitive */}
                </p>
              </div>
            </Card>
            <motion.p
              className="max-w-md rounded-xl bg-black/60 p-1 text-center text-lg leading-6 text-muted-foreground text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {thankedChatGPT
                ? 'You showed gratitude towards ChatGPT for its assistance.'
                : 'You approached the conversation with a sense of inquiry and openness.'}
            </motion.p>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex h-full flex-col items-center justify-center gap-6">
            <Card className="flex min-w-72 items-center justify-between gap-8 p-5">
              <div>
                <p className="text-lg">Chat topic</p>
                <p className="inline-block whitespace-nowrap bg-gradient-to-r from-violet-400 to-violet-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                  {completion.topic}
                </p>
              </div>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conversation summary</CardTitle>
                <CardDescription className="select-text">
                  {completion.summary}
                </CardDescription>
              </CardHeader>
            </Card>
            <motion.p
              className="max-w-md rounded-xl bg-black/60 p-1 text-center text-lg leading-6 text-muted-foreground text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {completion.summary_comment}
              {/* You sought assistance with a coding-related issue, and ChatGPT
              provided a detailed explanation that you were able to understand. */}
            </motion.p>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex h-full flex-col items-center justify-center gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Suggested system prompt</CardTitle>
                <CardDescription className="select-text">
                  {completion.system_prompt}
                  {/* Convert the provided OpenGL code snippet to use LWJGL 3.
                  Ensure that you have imported the necessary LWJGL classes,
                  such as org.lwjgl.opengl.GL11, and initialized your OpenGL
                  context properly before calling these functions. */}
                </CardDescription>
              </CardHeader>
            </Card>
            <motion.p
              className="max-w-md rounded-xl bg-black/60 px-2 py-1 text-center text-lg leading-6 text-muted-foreground text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              You can use this prompt to generate a similar chat to the one you
              had.
            </motion.p>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex h-full flex-col items-center justify-center gap-6">
            {personality}
            <motion.p
              className="max-w-md rounded-xl bg-black/60 p-2 text-center leading-5 text-muted-foreground text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {PERSONALITIES[completion.personality]}
            </motion.p>
          </div>
        </SplideSlide>
        <SplideSlide>
          <MotionDiv
            className="grid h-full gap-4 overflow-y-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            ref={ref}
          >
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">{personality}</div>
              <Card className="relative col-span-6 p-6">
                <p>Your chat lasted&hellip;</p>
                <p className="inline-block bg-gradient-to-r from-indigo-400 to-blue-700 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  {duration.join(' ')}
                </p>
                <ClockIcon className="absolute right-6 top-1/3 size-9" />
              </Card>
              <Card className="col-span-6 p-6">
                <p>Thanked ChatGPT?</p>
                <p
                  className={cn(
                    'text-2xl font-bold tracking-tight',
                    thankedChatGPT ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  {thankedChatGPT ? 'Yes 👍' : 'No 🥲'}
                </p>
              </Card>
            </div>
            <div className="grid grid-cols-7 gap-4">
              <Card className="col-span-3 p-6">
                <p className="text-lg">💡 Your tone was&hellip;</p>
                <p className="inline-block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  {completion.tone}
                  {/* Neutral, curious */}
                  {/* Polite, inquisitive */}
                </p>
              </Card>
              <Card className="col-span-4 p-6">
                <p className="text-lg">Chat topic</p>
                <p className="inline-block whitespace-nowrap bg-gradient-to-r from-violet-400 to-violet-700 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  {completion.topic}
                </p>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Conversation summary</CardTitle>
                <CardDescription className="select-text">
                  {completion.summary}
                  {/* You asked for help with a coding problem, and ChatGPT provided
                  a detailed explanation of the solution. ChatGPT appears to
                  have been was and informative, and you were able to understand
                  the solution. */}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Suggested system prompt</CardTitle>
                <CardDescription className="select-text">
                  {completion.system_prompt}
                  {/* Convert the provided OpenGL code snippet to use LWJGL 3.
                  Ensure that you have imported the necessary LWJGL classes,
                  such as org.lwjgl.opengl.GL11, and initialized your OpenGL
                  context properly before calling these functions. */}
                </CardDescription>
              </CardHeader>
            </Card>
          </MotionDiv>
        </SplideSlide>
      </Splide>
      <div className="flex items-center justify-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-48" onClick={onButtonClick}>
              Share your results
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Here are your results! Share them with your friends.
              </DialogTitle>
            </DialogHeader>
            {image && (
              <>
                <div>
                  <Image
                    alt="Results"
                    className="-ml-3"
                    src={image}
                    height={462}
                    width={462}
                  />
                </div>
                <Button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.download = 'gpt-wrapped-results.png';
                    link.href = image;
                    link.click();
                    toast.success('Image downloaded!');
                  }}
                >
                  Download image
                </Button>
                <Card className="mx-auto flex w-fit justify-center gap-6 px-4 py-2 bg-green-50">
                  <LinkedinShareButton
                    title="I just used GPT Wrapped to analyze my recent chat with ChatGPT! Try it for yourself: "
                    url="https://gpt-wrapped.vercel.app"
                  >
                    <SiLinkedin className="fill-[#0A66C2]" />
                  </LinkedinShareButton>
                  <TwitterShareButton
                    title="I just used GPT Wrapped to analyze my recent chat with ChatGPT! Try it for yourself: "
                    url="https://gpt-wrapped.vercel.app"
                  >
                    <SiX />
                  </TwitterShareButton>
                  <RedditShareButton
                    title="I just used GPT Wrapped to analyze my recent chat with ChatGPT! Try it for yourself: "
                    url="https://gpt-wrapped.vercel.app"
                  >
                    <SiReddit className="fill-[#FF4500]" />
                  </RedditShareButton>
                  <TelegramShareButton
                    title="I just used GPT Wrapped to analyze my recent chat with ChatGPT! Try it for yourself: "
                    url="https://gpt-wrapped.vercel.app"
                  >
                    <SiTelegram className="fill-[#26A5E4]" />
                  </TelegramShareButton>
                </Card>
              </>
            )}
          </DialogContent>
        </Dialog>
        <Link
          className={cn(buttonVariants({ variant: 'outline' }), 'w-48 shadow')}
          href="/"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
