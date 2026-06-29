import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  title: string;
  accentColor: string;
  accentBg: string;
  desc: string;
}

const steps: Step[] = [
  {
    icon: GraduationCap,
    title: "Learn",
    accentColor: "text-blue-600",
    accentBg: "bg-blue-50",
    desc: "Access world-class content mapped to real career milestones.",
  },
  {
    icon: Users,
    title: "Network",
    accentColor: "text-purple-600",
    accentBg: "bg-purple-50",
    desc: "Join peer groups and mentor sessions that turn learning into action.",
  },
  {
    icon: TrendingUp,
    title: "Grow",
    accentColor: "text-emerald-600",
    accentBg: "bg-emerald-50",
    desc: "Get matched to roles, internships, and scholarships that fit who you're becoming.",
  },
];

export default function LearnNetworkGrowSection() {
  return (
    <section className="w-full py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="font-bold text-slate-900 text-3xl md:text-4xl">
            The Learn → Network → Grow Loop
          </h2>
          <p className="text-slate-600 mt-3 text-lg">
            Your growth is continuous, social, and measurable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative">
                <Card className="w-full border border-slate-200 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-8 flex flex-col items-center text-center gap-5">

                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${step.accentBg}`}>
                      <Icon size={32} className={step.accentColor} strokeWidth={1.75} />
                    </div>

                    <div className={`w-10 h-1 rounded-full ${step.accentColor.replace('text-', 'bg-')}`} />

                    <h3 className="font-bold text-slate-900 text-xl">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {step.desc}
                    </p>
                  </CardContent>
                </Card>

               
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}