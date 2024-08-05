import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";

export default function Learn() {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
            my sticky wrapper
        </StickyWrapper>
        <FeedWrapper>
            My feed wrapper 
        </FeedWrapper>
    </div>
  )
}
