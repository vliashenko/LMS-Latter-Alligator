import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import Items from "./items";

export default async function ShopPage() {
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
          <Image src={"/shop.svg"} alt={"Shop"} height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Магазин
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Використайте бали щоб поновити спроби.
          </p>
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
          />
        </div>
      </FeedWrapper>
    </div>
  );
}
