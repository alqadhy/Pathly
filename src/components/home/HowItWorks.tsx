import { useScrollAnimation } from "@/hooks/useScrollAnimation";
const steps = [
  {
    number: "1",
    title: "Build Your Profile",
    desc: "Fill in your degree, goals, and skills. The AI analyzes your gaps and creates a custom learning strategy.",
  },
  {
    number: "2",
    title: "Follow Your Roadmap",
    desc: "Take curated courses mapped to your target role. Track progress in real-time with milestone markers.",
  },
  {
    number: "3",
    title: "Get Matched & Apply",
    desc: "Employers find you through Pathly's ranked talent pool. No cold applications needed.",
  },
]

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
   <div ref={ref}
      id="features" 
      className={`transition-all duration-600 ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10"
      }`}>
     <section className="w-full bg-muted py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            HOW IT WORKS
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            From graduation to your first job offer
          </h2>
        </div>

     
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div
                className="inline-flex h-16 w-16 items-center justify-center rounded-full text-white mb-8 mx-auto hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <span className="text-3xl font-bold">{step.number}</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
   </div>
  )
}