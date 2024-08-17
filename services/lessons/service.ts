import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";
import { challengeProgress, lessons } from "@/lib/db/schema";
import { CourseService } from "../courses";


export const getLesson = cache(async (id?: number) => {
    const { userId } = await auth();

    if (!userId) {
        return null
    }

    const courseProgress = await CourseService.getCourseProgress();
    const lessonId = id || courseProgress?.activeLessonId;

    if (!lessonId) {
        return null
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userid, userId),
                    }
                }
            }
        }
    })

    if (!data || !data.challenges) {
        return null
    }

    const normalizedChallenges = data.challenges.map((challenge) => {
        const completed = challenge.challengeProgress
            && challenge.challengeProgress.length > 0
            && challenge.challengeProgress.every((progress) => progress.completed)

        return { ...challenge, completed };
    })

    return { ...data, challenges: normalizedChallenges };
})

export const getLessonPercentage = cache(async () => {
    const courseProgress = await CourseService.getCourseProgress();

    if (!courseProgress?.activeLessonId) {
        return 0
    }

    const lesson = await getLesson(courseProgress.activeLessonId);

    if (!lesson) {
        return 0
    }

    const completedChallenges = lesson.challenges.filter((challenge) => challenge.completed);
    const percentage = Math.round((completedChallenges.length / lesson.challenges.length) * 100)

    return percentage;
})
