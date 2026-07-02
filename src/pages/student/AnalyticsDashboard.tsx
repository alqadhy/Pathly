// Components
import WeeklyActivityChart from "../../components/custom/analytics/WeeklyActivityChart";
import ProfileStrength from "../../components/custom/analytics/ProfileStrength";
import ScoreTrendsChart from "../../components/custom/analytics/ScoreTrendsChart";
import SkillsGapAnalysis from "../../components/custom/analytics/SkillsGapAnalysis";
import AIInsights from "../../components/custom/analytics/AIInsights";
import Roadmap from "../../components/custom/analytics/Roadmap";
import ActiveCourses from "../../components/custom/analytics/ActiveCourses";
import StatCards from "../../components/custom/analytics/StatCard";
import ApplicationPipelineChart from "../../components/custom/analytics/ApplicationPipeLineChart";

function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-wrap items-center justify-between gap-x-15 gap-y-3 mb-8">
        <div>
          <h1 className="text-h3 font-bold text-foreground">
            Analytics Dashboard
          </h1>
          <p className="text-body-sm text-normal mt-1">
            Track your career momentum, scores, and progress over time
          </p>
        </div>
        <div>
          <button className="bg-card border border-border text-foreground py-2 px-4 rounded-full text-sm font-medium shadow-sm hover:bg-light transition-fast">
            30 Days
          </button>
        </div>
      </div>

      {/* Stats Cards - Row 1*/}
      <StatCards />

      {/* Weekly Activity & Application Pipeline - Row 2 */}
      <div className="md:grid grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 mb-6 md:mb-0">
          <WeeklyActivityChart />
        </div>
        <div className="col-span-1">
          <ApplicationPipelineChart />
        </div>
      </div>

      {/* Profile Strength & Score Trends - Row 3 */}
      <div className="md:grid grid-cols-2 gap-6 mb-6">
        <div className="col-span-1 mb-6 md:mb-0">
          <ProfileStrength />
        </div>
        <div className="col-span-1">
          <ScoreTrendsChart />
        </div>
      </div>

      {/* Skills Gap Analysis & Roadmap - Row 4 */}
      <div className="md:grid md:grid-cols-2 gap-6">
        <div className="col-span-1 h-full mb-6 md:mb-0">
          <SkillsGapAnalysis />
        </div>

        <div className="col-span-1 bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col h-full">
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
