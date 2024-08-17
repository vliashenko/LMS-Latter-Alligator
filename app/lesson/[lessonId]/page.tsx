import { redirect } from "next/navigation";

import Quiz from "../quiz";

import { LessonService } from "@/services/lessons";
import { UserService } from "@/services/users";

type Props = {
  params: Promise<{
    lessonId: number;
  }>;
};

export default async function LessonIdPage({ params }: Props) {
  const { lessonId } = await params;
  const lesson = await LessonService.getLesson(lessonId);
  const userProgress = await UserService.getUserProgress();

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;
  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
    />
  );
}
