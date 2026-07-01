import {
  TrendingCoursesSection,
  BuildConnectionsSection,
  StatsSection,
  LearnNetworkGrowSection,
  CTASection,
  HowItWorks,
  Features,
  MainSection,
  Header
} from "@/components/custom/home";

function Home() {
  return <div>
    <Header />
    <div id="home">
      <MainSection />
    </div>
    <div id="features">
      <Features />
    </div>
    <div id="how-it-works">
      <HowItWorks />
    </div>
    <div id="courses">
      <TrendingCoursesSection />
    </div>
    <div id="network">
      <BuildConnectionsSection />
    </div>
    <StatsSection />
    <LearnNetworkGrowSection />
    <CTASection />
  </div>;
}

export default Home;