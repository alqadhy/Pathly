// Icons
import { Bookmark } from "lucide-react";

// State
import { useSavedItemsStore } from "../../../store/saved-items.store";

function SavedWrapper({
  category,
  itemId,
  children,
  
}: {
  category: string;
  itemId: number;
  children: React.ReactElement;
}) {
  const { removeItem } = useSavedItemsStore();

  return (
    <div className="relative">
      <button
        className="absolute top-3 right-3 z-2"
        title="Remove item"
        onClick={() => removeItem(category, itemId)}
      >
        <Bookmark fill="var(--warning)" className="text-warning" />
      </button>
      {children}
    </div>
  );
}

export default SavedWrapper;
