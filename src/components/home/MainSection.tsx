import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowRight, Briefcase, BookOpen } from 'lucide-react'
import backgroundImage from '@/assets/imgs/auth_bg.png'

export default function MainSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{ backgroundColor: "var(--primary-darker)" }}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div className="absolute inset-0 h-screen opacity-75"
        style={{ backgroundColor: "var(--overlay)" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="mb-20">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
              style={{ backgroundColor: "var(--primary-dark-active)" }}>
              <div className="flex items-center justify-center w-5 h-5 rounded-full"
                style={{ backgroundColor: "var(--primary)" }}>
                <span className="text-xs font-bold text-white">✓</span>
              </div>
              <span className="text-sm font-medium text-white">
                Trusted by 50,000+ Fresh Graduates
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Land Your First Role.
              <br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(to right, var(--primary), var(--secondary))" }}>
                Skip the Noise.
              </span>
            </h1>

            <p className="text-lg mb-8 leading-relaxed text-white/80">
              Pathly gives fresh graduates a personalized roadmap, an ATS-ready CV, and direct matches to jobs, internships, and scholarships.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                className="rounded-full text-white px-8 py-6 text-base font-semibold flex items-center gap-2"
                style={{ backgroundColor: "var(--primary)" }}
               onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => 
                 (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => 
                (e.currentTarget.style.backgroundColor = "var(--primary)")}
              >
                Build My Roadmap
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button className="rounded-full border border-white/40 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-base font-semibold">
                Explore Courses
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: "var(--primary-light)", borderColor: "var(--primary-darker)", color: "var(--primary-darker)" }}>
                  A
                </div>
                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: "var(--primary)", borderColor: "var(--primary-darker)" }}>
                  B
                </div>
                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: "var(--success)", borderColor: "var(--primary-darker)" }}>
                  C
                </div>
              </div>
              <span className="text-sm text-white/70">
                428 graduates currently learning
              </span>
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <div className="w-full max-w-100 rounded-2xl backdrop-blur-xl border border-white/10 p-6"
              style={{
                backgroundColor: "color-mix(in srgb, var(--primary-darker) 75%, transparent)",
                boxShadow: "var(--shadow-card)"
              }}>
              <div className="flex justify-between items-start mb-1">
                <div className="mb-4">
                  <p className="text-sm text-white/60">AI Roadmap</p>
                  <h6 className="text-xl font-bold text-white">
                    Frontend Developer Path
                  </h6>
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-bold"
                  style={{ backgroundColor: "var(--secondary)", color: "var(--primary-darker)" }}>
                  78/100 ATS
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-white/70">Overall Progress</p>
                  <span className="text-xs px-3 py-1 rounded-full"
                    style={{ backgroundColor: "color-mix(in srgb, var(--success) 20%, transparent)", color: "var(--success)" }}>
                    68%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[68%] rounded-full"
                    style={{ backgroundImage: "linear-gradient(to right, var(--primary), var(--success))" }} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3 p-3 rounded-lg bg-white/10 border border-white/10">
                  <CheckCircle className="w-5 h-5" style={{ color: "var(--success)" }} />
                  <div>
                    <p className="text-white font-medium">Frontend Basics</p>
                    <p className="text-xs text-white/60">Completed</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-white/10 border border-white/10">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: "var(--primary)" }}>
                    2
                  </div>
                  <div>
                    <p className="text-white font-medium">React & Ecosystem</p>
                    <p className="text-xs text-white/60">In Progress</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-white/10 border border-white/10">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/60">
                    3
                  </div>
                  <div>
                    <p className="text-white/70">Portfolio Build</p>
                    <p className="text-xs text-white/50">Upcoming</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex justify-between text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  3 job matches
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  12 courses
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}