import UnitBanner from "./unit-banner";
import LessonButton from "./lesson-button";

import { lessons, units } from "@/lib/db/schema";

type Props = {
  description: string;
  title: string;
  lessons: (typeof lessons.$inferSelect & { completed: boolean })[];
  activeLesson:
    | (typeof lessons.$inferSelect & { unit: typeof units.$inferSelect })
    | undefined;
  activeLessonPercentage: number;
};

export default function Unit({
  description,
  title,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, idx) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={idx}
              totalCount={lessons.length - 1}
              percentage={activeLessonPercentage}
              current={isCurrent}
              locked={isLocked}
            />
          );
        })}
      </div>
    </>
  );
}
