import type { CommunitySection } from "../../../types/Community";
import Card from "../Card";

export default function CommunitySectionList({
  sections,
  actionLabel,
  cardMediaSize = "lg",
  actionTone = "primary",
}: {
  sections: CommunitySection[];
  actionLabel: string;
  cardMediaSize?: "sm" | "md" | "lg";
  actionTone?: "primary" | "dark";
}) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {sections.map((section) => (
        <section
          key={section.id}
          className="rounded-3xl bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)] ring-1 ring-border/50 sm:p-5"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
        
              <h2 className="my-3 text-[18px]! font-semibold tracking-[-0.01em] text-darker sm:text-[16px]">
                {section.title}
              </h2>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold text-primary transition hover:text-primary-hover"
            >
              Show all
            </button>
          </div>

          <div className="max-h-105 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-normal scrollbar-track-transparent sm:max-h-130 lg:max-h-155">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {section.cards.map((card) => (
                <Card
                  key={card.id}
                  title={card.name}
                  subtitle={card.role}
                  body={card.subtitle}
                  media={{
                    src: card.avatarUrl,
                    alt: card.name,
                    size: cardMediaSize,
                  }}
                  meta={{
                    avatarSrc: card.avatarUrl,
                    avatarAlt: `${card.name} connection`,
                    text: card.mutualConnections,
                  }}
                  actionLabel={actionLabel}
                  actionTone={actionTone}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
