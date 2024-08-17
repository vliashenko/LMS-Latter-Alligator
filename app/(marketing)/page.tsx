import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto w-full flex flex-col items-center">
      <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center p-4 gap-2">
        <div className="relative w-full max-w-[1224px] h-70 lg:h-[724px] flex items-center justify-center">
          <Image
            src="/all-animals.png"
            fill
            alt="all-characters"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col items-center gap-y-8 text-center">
          <h1 className="text-4xl drop-shadow-xs lg:text-3xl font-bold text-white max-w-[680px] text-center">
            Вивчай, практикуй, та вдосконалюй англійську з Later, Alligator!
          </h1>
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" variant="secondaryOutline" className="w-full">
                  Розпочати
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button
                size="lg"
                variant="secondaryOutline"
                asChild
                className="w-full"
              >
                <Link href="/learn">Продовжити навчання</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
