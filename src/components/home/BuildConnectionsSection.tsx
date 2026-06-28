import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Mentor {
  id: number;
  name: string;
  role: string;
  bio: string;
  tags: string[];
  initials: string;
  color: string;
}

const mentors: Mentor[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Senior PM @ Meta",
    bio: "10 years building products users love at scale.",
    tags: ["Product Strategy", "Roadmapping"],
    initials: "SJ",
    color: "hsl(242, 85%, 57%)", // Purple
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Lead Data Scientist @ Goldman Sachs",
    bio: "Turning financial data into insights that move markets.",
    tags: ["Python", "ML Models"],
    initials: "MT",
    color: "hsl(177, 68%, 40%)", // Teal
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Creative Director @ Ogilvy",
    bio: "Brand storytelling that makes companies unforgettable.",
    tags: ["Brand Identity", "UX"],
    initials: "ER",
    color: "hsl(345, 80%, 55%)", // Pink
  },
];

export default function BuildConnectionsSection() {
  return (
    <section className="w-full py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      
        <div className="space-y-5">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
            Build Connections
          </p>
          <h2 className="font-bold text-5xl md:text-5xl text-[#0f172a] leading-tight">
            Meet the people who'll
            <br />
            shape your career
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed ">
            Access a curated directory of mentors, founders, and industry
            leaders who've built careers at the world's best companies.
            Real conversations, real guidance.
          </p>
           <Button
              className="w-50 h-14 cursor-pointer rounded-full font-semibold text-primary bg-white  border-2 border-primary hover:bg-primary-light"
            >
              Browse Directory
               <ArrowRight size={16} />
            </Button>
        </div>

    
        <div className="space-y-4">
          {mentors.map((mentor) => (
            <Card
              key={mentor.id}
              className="border border-light rounded-md shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow duration-200 bg-white"
            >
              <CardContent className="p-2 flex items-start gap-4">
                
              
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold  shrink-0"
                  style={{ backgroundColor: mentor.color }}
                >
                  {mentor.initials}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Name & Role */}
                  <h4 className="font-bold text-[#0f172a] text-base">
                    {mentor.name}
                  </h4>
                  <p className="text-[#38bdf8] mt-0.5 text-sm font-medium">
                    {mentor.role}
                  </p>
                  
                  {/* Bio */}
                  <p className="text-gray-400 mt-1.5 text-sm line-clamp-1 font-normal">
                    {mentor.bio}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {mentor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-[#0f172a] rounded-full px-3 py-1 text-[13px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}