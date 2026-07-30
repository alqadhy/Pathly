import React, { useState } from "react";
import { X } from "lucide-react";

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
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="relative bg-card border border-border rounded-2xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Delete Button */}
            <button
              onClick={() => removeSuggestion(suggestion.id)}
              className="absolute top-3 right-3 text-normal hover:text-foreground transition-colors"
            >
              <div className="border border-normal/50 rounded-full p-0.5 hover:bg-light transition-colors">
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
            <p className="text-[11px] text-normal font-medium mt-1 line-clamp-1">
              {suggestion.category}
            </p>
            <p className="text-[11px] text-normal font-medium mt-0.5 mb-4">
              {suggestion.followers}
            </p>

            <button className="mt-auto w-full max-w-[100px] border border-primary text-primary hover:bg-primary hover:text-white rounded-xl py-1.5 text-xs font-bold transition-colors">
              + Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
