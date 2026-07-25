import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import { BookOpen, FileText, Target, Mic2 } from 'lucide-react'

const features = [

  {
    icon: BookOpen,
    title: "Skills & Roadmaps",
    desc: "AI-generated learning paths tailored to your target role, timeline, and current skills.",
  },
  {
    icon: FileText,
    title: "CV & Portfolio Builder",
    desc: "ATS score analyzer + built-in CV builder. No expensive external tools needed.",
  },
  {
    icon: Target,
    title: "Smart Matching",
    desc: "Get ranked and matched to jobs, internships, and scholarships that actually fit your profile.",
  },
  {
    icon: Mic2,
    title: "Mentorship & Mock Interviews",
    desc: "Book sessions with industry mentors. Practice with AI-generated interview questions and get feedback.",
  },
]

export default function Features() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (

    <div   ref={ref}
      id="features" 
      className={`transition-all duration-600 ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10"
      }`}>
      <section className="w-full bg-background py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

       
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-wide mb-4"
            style={{ color: "var(--normal)" }}>
            THE PLATFORM
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-foreground">
            Everything you need to go from graduate to hired
          </h1>
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-card p-8 transition-shadow duration-300"
                style={{ ["--tw-shadow" as string]: "var(--shadow-card)" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--shadow-card)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
              >
                <div
                  className="inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-6"
                  style={{ backgroundColor: "var(--primary-light)" }}
                >
                  <Icon className="h-8 w-8" style={{ color: "var(--primary)" }} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
    </div>
  )
}