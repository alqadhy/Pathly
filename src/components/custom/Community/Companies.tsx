import { useCommunityPageData } from "./useCommunityPageData";
import CommunitySectionList from "./CommunitySectionList";

function Companies() {
  const data = useCommunityPageData("companies");

  if (!data) {
    return null;
  }

  return <CommunitySectionList sections={data.sections} actionLabel="follow +" />;
}

export default Companies;
