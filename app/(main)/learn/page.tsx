import { redirect } from "next/navigation";

import { UserService } from "@/services/users";
import { CourseService } from "@/services/courses";
import { LessonService } from "@/services/lessons";
import { UnitService } from "@/services/units";

import Header from "./header";
import Unit from "./unit";
import Promo from "./promo";
import Quests from "./quests";

import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";

export default async function Learn() {
  const userProgress = await UserService.getUserProgress();
  const courseProgress = await CourseService.getCourseProgress();
  const lessonPercentage = await LessonService.getLessonPercentage();
  const units = await UnitService.getUnits();

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
        <Promo />
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
}
