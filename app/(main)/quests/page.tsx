import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import UserProgress from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";


export default async function QuestsPage() {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  return (
    <div className="flex flex-col-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center lg:pt-[62px]">
          <Image src={"/quests.svg"} alt={"Quests"} height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Квести
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Виконуйте квести, заробляючи бали
          </p>
          <Separator className="mb-4 h-0.5 rounded-full"/>
          {leaderboard.map((userProgress, idx) => (
            <div className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50" key={userProgress.userId}>
              <p className="font-bold text-lime-700 mr-4">{idx + 1}</p>
              <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                <AvatarImage className="object-cover" src={userProgress.userImageSrc}/>
              </Avatar>
              <p className="font-bold text-neutral-800 flex-1">
                {userProgress.userName}
              </p>
              <p className="text-muted-foreground">
              {userProgress.points} XP
              </p>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
}
