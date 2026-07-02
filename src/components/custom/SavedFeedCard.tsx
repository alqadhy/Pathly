// Components
import { Card, CardContent } from "../ui/card";

// Types
import type { SavedFeed } from "../../types/saved.types";

function SavedFeedCard({ feed }: { feed: SavedFeed }) {
  return (
    <Card className="bg-card rounded-lg p-0 relative">
      <CardContent className="p-6 flex gap-5 flex-col md:flex-row">
        <div className="grow">
          <div className="flex flex-wrap items-center gap-3">
            <img
              src={feed.user.profilePic}
              alt="profile pricture"
              className="w-[65px]! h-[65px] rounded-full"
            />
            <div className="grow">
              <h5>{feed.user.name}</h5>
              <p className="text-text-light">{feed.user.headline}</p>
              <span className="text-text-light">{feed.user.uploadTime}</span>
            </div>
          </div>
          <p className="mt-[18px] leading-(--h6-line-height)">{feed.content}</p>
        </div>

        {feed.feedImage && (
          <div className="image w-[205px] rounded-lg overflow-hidden">
            <img src={feed.feedImage} alt={"post image"} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SavedFeedCard;
