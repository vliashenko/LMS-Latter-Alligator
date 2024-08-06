"use client";

import { courses, userProgress } from "@/db/schema";
import Card from "./card";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export default function List({ courses, activeCourseId }: Props) {
  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeate(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={() => {}}
          disabled={false}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
}
