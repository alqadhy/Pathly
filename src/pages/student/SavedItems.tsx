// Components
import SavedResults from "../../components/custom/saved-items/SavedResults";
import NoResults from "../../components/custom/NoResults";

// Icons
import {
  StickyNote,
  BriefcaseBusiness,
  UserRoundSearch,
  BookOpen,
} from "lucide-react";

// Constants
import { SAVED_ITEMS_TYPES } from "../../constants";

// Hooks
import { useState } from "react";

// State
import { useSavedItemsStore } from "../../store/saved-items.store";

// Types
import type {
  SavedItemsCategory,
  SavedItemsType,
} from "../../types/saved.types";

function SavedItems() {
  const [savedItemsCategory, setSavedItemsCategory] =
    useState<SavedItemsCategory>("Feeds");
  const { savedItems } = useSavedItemsStore();

  const currentKey = savedItemsCategory.toLowerCase() as keyof SavedItemsType;

  return (
    <div className="bg-card p-6 rounded-2xl">
      <div className="flex justify-between items-center flex-wrap gap-x-15 gap-y-3 mb-20">
        <div className="grid grid-cols-2 w-full md:w-auto md:grid-cols-[repeat(auto-fit,minmax(115px,1fr))] grow rounded-xl overflow-hidden">
          {SAVED_ITEMS_TYPES.map(({ id, type, icon }) => (
            <button
              key={id}
              title={type}
              className={`bg-background h-14 flex justify-center items-center gap-2 font-semibold text-normal transition ${savedItemsCategory == type ? "bg-primary-light text-primary" : "hover:bg-primary-light-hover hover:text-primary-hover"}`}
              onClick={() => setSavedItemsCategory(type)}
            >
              {icon}
              {type}
            </button>
          ))}
        </div>
        <p className="text-text-light">
          {savedItems[currentKey].length} saved {savedItemsCategory}
        </p>
      </div>

      {/* Display Saved Items */}
      {savedItems[currentKey].length == 0 ? (
        <NoResults
          heading={`No Saved ${savedItemsCategory}`}
          text={`You didn't save any ${savedItemsCategory.toLowerCase()} yet. Saved ${savedItemsCategory.toLowerCase()} will be shown here`}
        >
          {savedItemsCategory == "Feeds" ? (
            <StickyNote />
          ) : savedItemsCategory == "Jobs" ? (
            <BriefcaseBusiness />
          ) : savedItemsCategory == "Profiles" ? (
            <UserRoundSearch />
          ) : (
            <BookOpen />
          )}
        </NoResults>
      ) : (
        <SavedResults
          savedItemsCategory={savedItemsCategory}
          savedItems={savedItems}
        />
      )}
    </div>
  );
}

export default SavedItems;
