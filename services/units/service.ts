import { auth } from "@clerk/nextjs/server";
import { cache } from "react";
import db from "@/lib/db/drizzle";
import { challengeProgress, units } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { UserService } from "../users";

export const getUnits = cache(async () => {
    const { userId } = await auth();
    const userProgress = await UserService.getUserProgress();

    if (!userId || !userProgress?.activeCourseId) {
        return [];
    }

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userid, userId)
                            },
                        }
                    }
                }
            }
        }
    })

    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
            if (lesson.challenges.length === 0) {
                return { ...lesson, completed: false }
            }
            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengeProgress
                    && challenge.challengeProgress.length > 0
                    && challenge.challengeProgress.every((progress) => progress.completed)
            });

            return { ...lesson, completed: allCompletedChallenges };
        });

        return { ...unit, lessons: lessonsWithCompletedStatus };
    });

    return normalizedData;
});

