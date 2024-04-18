'use client';

import {
  SiGmail,
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
  EmailShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton
} from 'react-share';

import { MotionDiv } from '@/components/motion';
import NumberTicker from '@/components/number-ticker';
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

export function Stage({ chat }: { chat: Chat }) {
  function calculateChatDuration() {
    // Assuming chatData is the JSON object you provided
    const startTime = chat.create_time; // Start time of the chat
    const endTime = chat.update_time; // End time of the chat

    // Calculate duration in seconds
    const durationInSeconds = endTime - startTime;

    // Convert duration to hours, minutes, and seconds
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

    return [number, s] as const;
  }

  function compileUserMessagesToString() {
    // Initialize an empty string to hold all user messages
    let compiledMessage = '';

    // Check if the 'linear_conversation' property exists
    if (chat.linear_conversation) {
      // Iterate through each item in the linear_conversation array
      chat.linear_conversation.forEach((item) => {
        // Check if the 'message' property exists and the 'author' role is 'user'
        if (item.message && item.message.author.role === 'user') {
          // Check if the 'content' property and 'parts' array exist
          if (item.message.content && item.message.content.parts) {
            // Concatenate each part of the message to the compiledMessage string
            item.message.content.parts.forEach((part) => {
              compiledMessage += part + ' ';
            });
          }
        }
      });
    }

    // Trim the final string to remove any trailing spaces
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
              transition={{ delay: 3.5 }}
            >
              {duration[1].startsWith('second')
                ? "Blink and you'll miss it &mdash; your chat session, that is. Speedy Gonzalez has nothing on you. Was that a chat or a race?"
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
                  Neutral, curious
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
                <p className="inline-block bg-gradient-to-r from-violet-400 to-violet-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                  Code help
                </p>
              </div>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conversation summary</CardTitle>
                <CardDescription className="select-text">
                  You asked for help with a coding problem, and ChatGPT provided
                  a detailed explanation of the solution. ChatGPT appears to
                  have been was and informative, and you were able to understand
                  the solution.
                </CardDescription>
              </CardHeader>
            </Card>
            <motion.p
              className="max-w-md rounded-xl bg-black/60 p-1 text-center text-lg leading-6 text-muted-foreground text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              You sought assistance with a coding-related issue, and ChatGPT
              provided a detailed explanation that you were able to understand.
            </motion.p>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex h-full flex-col items-center justify-center gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Suggested system prompt</CardTitle>
                <CardDescription className="select-text">
                  Convert the provided OpenGL code snippet to use LWJGL 3.
                  Ensure that you have imported the necessary LWJGL classes,
                  such as org.lwjgl.opengl.GL11, and initialized your OpenGL
                  context properly before calling these functions.
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
          <MotionDiv
            className="grid h-full gap-4 overflow-y-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            ref={ref}
          >
            <div className="grid grid-cols-7 gap-4">
              <Card className="relative col-span-4 p-6">
                <p>Your chat lasted&hellip;</p>
                <p className="inline-block bg-gradient-to-r from-indigo-400 to-indigo-700 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  36 minutes
                </p>
                <ClockIcon className="absolute right-6 top-1/3 size-9" />
              </Card>
              <Card className="col-span-3 p-6">
                <p className="text-lg">Chat topic</p>
                <p className="inline-block bg-gradient-to-r from-violet-400 to-violet-700 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  Code help
                </p>
              </Card>
            </div>
            <div className="grid grid-cols-7 gap-4">
              <Card className="col-span-3 p-6">
                <p>Thanked ChatGPT?</p>
                <p className="text-2xl font-bold tracking-tight text-red-500">
                  No 🥲
                </p>
              </Card>
              <Card className="col-span-4 p-6">
                <p className="text-lg">💡 Your tone was&hellip;</p>
                <p className="inline-block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  Neutral, curious
                  {/* Polite, inquisitive */}
                </p>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Conversation summary</CardTitle>
                <CardDescription>
                  You asked for help with a coding problem, and ChatGPT provided
                  a detailed explanation of the solution. ChatGPT appears to
                  have been was and informative, and you were able to understand
                  the solution.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Suggested system prompt</CardTitle>
                <p className="text-sm">
                  You can use the following prompt to generate a similar chat:
                </p>
                <CardDescription className="text-base">
                  Convert the provided OpenGL code snippet to use LWJGL 3.
                  Ensure that you have imported the necessary LWJGL classes,
                  such as org.lwjgl.opengl.GL11, and initialized your OpenGL
                  context properly before calling these functions.
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
                <Card className="mx-auto flex w-fit justify-center gap-6 px-4 py-2">
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
