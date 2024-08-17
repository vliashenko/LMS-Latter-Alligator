import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import db from "@/lib/db/drizzle";
import { challengeProgress, courses, lessons, units } from "@/lib/db/schema";
import { UserService } from "../users";

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();

    return data;
})

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
    })

    return data;
})

export const getCourseProgress = cache(async () => {
    const { userId } = await auth();
    const userProgress = await UserService.getUserProgress();

    if (!userId || !userProgress?.activeCourseId) {
        return null;
    }

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(lessons.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    unit: true,
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userid, userId),
                            }
                        }
                    }
                }
            }
        }
    })

    const firstUncompletedLesson = unitsInActiveCourse.flatMap((unit) => unit.lessons).find((lesson) => {
        return lesson.challenges.some((challenge) => {
            return !challenge.challengeProgress
                || challenge.challengeProgress.length === 0
                || challenge.challengeProgress.some((progress) => progress.completed === false);
        })
    })

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id
    }
})