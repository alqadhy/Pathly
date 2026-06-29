// Components
import {
  WeeklyActivityChart,
  ProfileStrength,
  ScoreTrendsChart,
  SkillsGapAnalysis,
  AIInsights,
  Roadmap,
  ActiveCourses,
  StatCards,
  ApplicationPipelineChart,
} from "../../components/custom/analytics";

function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 md:mb-8">
        <div>
          <h1 className="text-h4 md:text-h3 font-bold text-foreground">
            Analytics Dashboard
          </h1>
          <p className="text-xs md:text-body-sm text-normal mt-1">
            Track your career momentum, scores, and progress over time
          </p>
        </div>
        <div>
          <button className="bg-card border border-border text-foreground py-1.5 md:py-2 px-4 rounded-full text-xs md:text-sm font-medium shadow-sm hover:bg-light transition-fast w-full sm:w-auto">
            30 Days
          </button>
        </div>
      </div>

      {/* Stats Cards - Row 1*/}
      <StatCards />

      {/* Weekly Activity & Application Pipeline - Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="lg:col-span-2">
          <WeeklyActivityChart />
        </div>
        <div className="lg:col-span-1 h-full">
          <ApplicationPipelineChart />
        </div>
      </div>

      {/* Profile Strength & Score Trends - Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="col-span-1 h-full">
          <ProfileStrength />
        </div>
        <div className="col-span-1">
          <ScoreTrendsChart />
        </div>
      </div>

      {/* Skills Gap Analysis & Roadmap - Row 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="col-span-1 h-full">
          <SkillsGapAnalysis />
        </div>

        {/* Roadmap & Active Courses */}
        <div className="col-span-1 bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm flex flex-col h-full">
          <Roadmap />
          <ActiveCourses />
        </div>
      </div>

      {/* AI Insights - Row 5 */}
      <AIInsights />
    </div>
  );
}

export default AnalyticsDashboard;
