// Components
import { Button } from "../components/ui/button";

// Icons
import { Bookmark, ChevronRight } from "lucide-react";

function OnBoarding() {
  return (
    <main className="p-12">
      <button
        className="skip-btn absolute top-19 right-12 z-(--z-dropdown) w-52 h-14 flex items-center justify-center text-primary text-lg font-semibold"
        title="Skip for now"
      >
        Skip Now <ChevronRight />
      </button>
      <div className="container max-w-[800px] mx-auto grid gap-12">
        <div>
          <h1>Complete Your Professional Profile</h1>
          <p className="text-normal mt-4">
            Add your skills, experience, and career goals to unlock personalized
            opportunities and start applying for jobs.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="box">
            <h3>Information About you</h3>
            <div className="bg-card mt-4 p-6 rounded-lg"></div>
          </div>

          <div className="box">
            <h3>Professional Information</h3>
            <div className="bg-card mt-4 p-6 rounded-lg"></div>
          </div>

          <div className="box">
            <h3>Interested</h3>
            <div className="bg-card mt-4 p-6 rounded-lg"></div>
          </div>

          <div className="box">
            <h3>Education</h3>
            <div className="bg-card mt-4 p-6 rounded-lg"></div>
          </div>

          <div className="box">
            <h3>Experience</h3>
            <div className="bg-card mt-4 p-6 rounded-lg"></div>
          </div>

          <div className="box">
            <h3>Skills</h3>
            <div className="bg-card mt-4 p-6 rounded-lg"></div>
          </div>

          <div className="box">
            <h3>Resume</h3>
            <div className="bg-card mt-4 p-6 rounded-lg"></div>
          </div>

          <div className="box">
            <h3>Add URL</h3>
            <div className="bg-card mt-4 p-6 rounded-lg"></div>
          </div>
        </div>

        <Button className="h-14 rounded-sm text-lg text-white">
          Save <Bookmark fill="#fff" />
        </Button>
      </div>
    </main>
  );
}

export default OnBoarding;
