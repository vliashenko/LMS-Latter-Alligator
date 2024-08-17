import { CourseService } from "@/services/courses";
import { UserService } from "@/services/users";
import List from "./list";

export default async function Courses() {
  const courses = await CourseService.getCourses();
  const userProgress = await UserService.getUserProgress();
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Курси</h1>
      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
}
