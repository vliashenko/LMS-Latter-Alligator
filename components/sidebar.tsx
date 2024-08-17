import Image from "next/image";
import Link from "next/link";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";

import SidebarItem from "./sidebar-item";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};

const sidebarItems = [
  {
    label: "Навчання",
    href: "/learn",
    iconSrc: "/learn.svg",
  },
  {
    label: "Список лідерів",
    href: "/leaderboard",
    iconSrc: "/leaderboard.svg",
  },
  {
    label: "Квести",
    href: "/quests",
    iconSrc: "/quests.svg",
  },
  {
    label: "Магазин",
    href: "/shop",
    iconSrc: "/shop.svg",
  },
];

export default function Sidebar({ className }: Props) {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/crocodile.png" height={40} width={40} alt="mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Later, Alligator!
          </h1>
        </div>
      </Link>
      <div className="flex flex-col flex-1 gap-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            href={item.href}
            iconSrc={item.iconSrc}
          />
        ))}
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
}
