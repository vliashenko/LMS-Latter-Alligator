"use client";

import { useState } from "react";
import { challengeOptions, challenges } from "@/db/schema";
import Header from "./header";

type Props = {
  initialLessonId: number;
  initialHearts: number;
  initialPercentage: number;
  initialLessonChallenges: (typeof challenges.$inferSelect &
    {
      completed: boolean;
      challengeOptions: (typeof challengeOptions.$inferSelect)[];
    })[];
  userSubscription: any;
};

export default function Quiz({
  initialLessonId,
  initialHearts,
  initialPercentage,
  initialLessonChallenges,
  userSubscription,
}: Props) {
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialHearts);

  return (
    <>
        <Header 
        hearts ={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
        />
    </>
  );
}
