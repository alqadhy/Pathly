import React, { useState } from "react";
import { X, Check } from "lucide-react";

export interface Suggestion {
  id: string;
  name: string;
  category: string;
  followers: string;
  logo: string;
}

interface Props {
  initialSuggestions: Suggestion[];
}

export const SuggestionsList: React.FC<Props> = ({ initialSuggestions }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(
    initialSuggestions || [],
  );

  const [followedId, setFollowedId] = useState<string | null>(null);

  const handleFollow = (id: string, name: string) => {
    setFollowedId(id);

    console.log(`You are now following ${name}`);

    setTimeout(() => {
      setSuggestions((prevSuggestions) =>
        prevSuggestions.filter((suggestion) => suggestion.id !== id),
      );
      setFollowedId(null);
    }, 2000);
  };

  const removeSuggestion = (idToRemove: string) => {
    setSuggestions((prevSuggestions) =>
      prevSuggestions.filter((suggestion) => suggestion.id !== idToRemove),
    );
  };

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="w-full py-2 transition-all duration-300">
      <h3 className="text-base font-bold text-foreground mb-4">
        You May be interested
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {suggestions.map((suggestion) => {
          const isFollowed = followedId === suggestion.id;

          return (
            <div
              key={suggestion.id}
              className="relative bg-card border border-border rounded-2xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Delete Button */}
              <button
                onClick={() => removeSuggestion(suggestion.id)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="border border-border/50 rounded-full p-0.5 hover:bg-muted transition-colors">
                  <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                </div>
              </button>

              <div className="w-14 h-14 flex items-center justify-center mb-3 mt-2">
                <img
                  src={suggestion.logo}
                  alt={suggestion.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <h4 className="text-[15px] font-bold text-foreground line-clamp-1">
                {suggestion.name}
              </h4>
              <p className="text-[11px] text-muted-foreground font-medium mt-1 line-clamp-1">
                {suggestion.category}
              </p>
              <p className="text-[11px] text-muted-foreground font-medium mt-0.5 mb-4">
                {suggestion.followers}
              </p>

              {/* Follow / Following Button */}
              <button
                onClick={() => handleFollow(suggestion.id, suggestion.name)}
                disabled={isFollowed}
                className={`mt-auto w-full max-w-[110px] rounded-xl py-1.5 text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  isFollowed
                    ? "bg-emerald-500 text-white border border-emerald-500"
                    : "border border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {isFollowed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Following</span>
                  </>
                ) : (
                  <span>+ Follow</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestionsList;
