import { useCommunityPageData } from "./useCommunityPageData";
import CommunitySectionList from "./CommunitySectionList";

function Profiles() {
  const data = useCommunityPageData("profiles");

  if (!data) {
    return null;
  }

  return <CommunitySectionList sections={data.sections} actionLabel="connect +" />;
}

export default Profiles;
