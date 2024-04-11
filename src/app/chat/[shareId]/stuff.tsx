'use client';

import { AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, ClockIcon, RotateCcwIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { match } from 'ts-pattern';

import { MotionDiv } from '@/components/motion';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function Stuff() {
  const [screen, setScreen] = useState<'bento' | 'summary' | 'system_prompt'>(
    'bento'
  );
  return (
    <>
      <div className="mx-auto grid w-[36rem] gap-4">
        <AnimatePresence mode="wait">
          {match(screen)
            .with('bento', () => (
              <MotionDiv
                className="grid gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="grid grid-cols-7 gap-4">
                  <Card className="col-span-4 p-6 relative">
                    <p>Your conversation lasted&hellip;</p>
                    <p className="bg-gradient-to-r from-indigo-400 to-blue-700 inline-block text-transparent bg-clip-text text-3xl font-bold tracking-tight">
                      36 minutes
                    </p>
                    <ClockIcon className="size-9 absolute right-6 top-1/3"/>
                  </Card>
                  <Card className="col-span-3 p-6">
                    <p>Chat topic</p>
                    <p className="text-3xl font-bold tracking-tight">
                      Code help
                    </p>
                  </Card>
                </div>
                <div className="grid grid-cols-7 gap-4">
                  <Card className="col-span-3 p-6">
                    <p>Thanked ChatGPT?</p>
                    <p className="text-3xl text-red-500 font-bold tracking-tight">No 🥲</p>
                  </Card>
                  <Card className="col-span-4 p-6">
                    <p>Your tone was&hellip;</p>
                    <p className="text-3xl font-bold tracking-tight">
                      Neutral, curious
                    </p>
                  </Card>
                </div>
              </MotionDiv>
            ))
            .with('summary', () => (
              <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Conversation summary</CardTitle>
                    <CardDescription>
                      You asked for help with a coding problem, and ChatGPT
                      provided a detailed explanation of the solution. ChatGPT
                      appears to have been was and informative, and you were
                      able to understand the solution.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </MotionDiv>
            ))
            .with('system_prompt', () => (
              <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Suggested system prompt</CardTitle>
                    <p className="text-sm">
                      You can use the following prompt to generate a similar
                      chat:
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
            ))
            .exhaustive()}
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2">
        <Button
          className="w-48"
          onClick={() => {
            setScreen((prev) => {
              switch (prev) {
                case 'bento':
                  return 'summary';
                case 'summary':
                  return 'system_prompt';
                case 'system_prompt':
                  return 'system_prompt';
              }
            });
          }}
        >
          Next <ArrowRightIcon className="ml-2 size-4" />
        </Button>
        <Link
          className={cn(buttonVariants({ variant: 'outline' }), 'w-48 shadow')}
          href="/"
        >
          Return home
        </Link>
      </div>
      <Button
        className="text-muted-foreground"
        variant="link"
        onClick={() => setScreen('bento')}
      >
        <RotateCcwIcon className="mr-2 size-4" /> Restart
      </Button>
    </>
  );
}
