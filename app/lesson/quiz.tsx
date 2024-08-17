"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { useAudio, useWindowSize, useMount } from "react-use";
import Confetti from "react-confetti";

import { ChallengeService } from "@/services/challenges";
import { UserService } from "@/services/users";

import Header from "./header";
import QuestionBubble from "./question-bubble";
import Challenge from "./challenge";
import Footer from "./footer";
import ResultCard from "./result-crad";

import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

import { challengeOptions, challenges } from "@/lib/db/schema";
import { toast } from "sonner";


type Props = {
  initialLessonId: number;
  initialHearts: number;
  initialPercentage: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
};

export default function Quiz({
  initialLessonId,
  initialHearts,
  initialPercentage,
  initialLessonChallenges,
}: Props) {
  const { open: openPracticeModal } = usePracticeModal();
  const { open: openHeartsModal } = useHeartsModal();

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const { width, height } = useWindowSize();

  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [finishAudio, _, finishAudioControls, finishAudioRef] = useAudio({
    src: "/finish.wav",
    autoPlay: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [correctAudio, _c, correctAudioControls, correctAudioRef] = useAudio({
    src: "/correct1.wav",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [incorrectAudio, _i, incorrectAudioControls, incorrectAudioRef] =
    useAudio({
      src: "/incorrect.wav",
    });
  const [pending, startTransition] = useTransition();

  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];
  const isSound = useMemo(
    () => correctAudio && finishAudio && incorrectAudio,
    [correctAudio, finishAudio, incorrectAudio]
  );

  const onSelect = (id: number) => {
    if (status !== "none") return;

    setSelectedOption(id);
  };

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correctOption);

    if (correctOption && correctOption.id === selectedOption) {
      startTransition(() => {
        ChallengeService.upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            correctAudioControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."));
      });
    } else {
      startTransition(() => {
        UserService.reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            incorrectAudioControls.play();
            setStatus("wrong");

            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."));
      });
    }
  };

  if (!challenge) {
    return (
      <>
        {isSound ? <div>{finishAudio}</div> : <audio ref={finishAudioRef} />}
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={1000}
          width={width}
          height={height}
        />
        <div className="flex w-full flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="/moose.png"
            alt="finish"
            className="hidden lg:block"
            height={150}
            width={150}
          />
          <Image
            src="/moose.png"
            alt="finish"
            className="block lg:hidden"
            height={100}
            width={100}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Чудова робота!
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
      </>
    );
  }

  const title =
    challenge.type === "ASSIST"
      ? "Обери правильний варіант"
      : challenge.question;

  return (
    <>
      {isSound ? (
        <div>{incorrectAudio}</div>
      ) : (
        <audio ref={incorrectAudioRef} />
      )}
      {isSound ? <div>{correctAudio}</div> : <audio ref={correctAudioRef} />}
      <Header hearts={hearts} percentage={percentage} />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={!selectedOption || pending}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
}
