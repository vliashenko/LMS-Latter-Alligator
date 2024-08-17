import { redirect } from "next/navigation";

import Quiz from "./quiz";

import { LessonService } from "@/services/lessons";
import { UserService } from "@/services/users";

export default async function LessonPage() {
  const lesson = await LessonService.getLesson();
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
