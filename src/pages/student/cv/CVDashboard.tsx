import { useNavigate,useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useBuilderUIStore } from "../../../store/useBuilderUIStore";
import { useSeedResumes } from "../../../hooks/useSeedResumes";
import { useResumes } from "../../../hooks/useResumes";
import ResumeCard from "../../../components/custom/resume/ResumeCard";
import { APP_ROUTES } from "../../../constants/router";  
import main from "../../../assets/imgs/cv/main.png";
import {
  Sparkles,
  FileText,
  Wand2,
} from "lucide-react";

function CVDashboard() {
  const navigate = useNavigate();
   const location = useLocation();
    useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const setSelectedMode = useBuilderUIStore((s) => s.setSelectedMode);
  useSeedResumes(); 
  const { resumes, deleteResume } = useResumes();

  function handleChooseMode(mode: "ai" | "manual") {
    setSelectedMode(mode);
    
    navigate(APP_ROUTES.student.cvBuilder.templateSelection(mode));
  }

  return (
    <div className="flex flex-col gap-6">
    
      <div
  className="
  relative
  overflow-hidden
  rounded-lg
  bg-linear-to-r
  from-primary
  to-secondary
  p-8
  text-white
  flex
  items-center
  justify-between
  
"
>
  <div className="">

    <div className="flex items-center gap-2 mb-4">

      <div className="bg-black/70! rounded-full px-3 py-1 flex items-center gap-2">
        <Sparkles size={14} />
        <span className="text-sm">Rewrite AI</span>
      </div>

    </div>

    <h1 className="text-4xl font-bold leading-tight text-white! mb-4">
      Land your next role with a CV
      <br />
      that beats the bots
    </h1>

    <p className="text-primary-light-active max-w-137">
      Upload an existing resume, pick a template, or let AI build one
      from scratch using your skills and experience.
      We'll score it for ATS and polish every bullet.
    </p>

  </div>

  <div className="hidden lg:block">

   
    <img
      src={main}
      className="w-80"
    />

  </div>
</div>

      <div>
       <div className="mb-8">
    <h2 className="text-2xl font-semibold">
        Choose how you want to start
    </h2>

    <p className="text-muted-foreground mt-1">
        Two paths, all powered by Pathly AI
    </p>
</div>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
          <button
  onClick={() => handleChooseMode("ai")}
  className="
    bg-white
    rounded-radius-lg
    border
    border-border
    p-6
    flex
    flex-col
    text-left
    hover:shadow-shadow-card
    duration-300
  "
>

    <div className="flex items-center gap-3 ">

    <div className="
w-12
h-12
rounded-full


">

<Wand2
size={32}
color="var(--primary)"
/>

</div>

</div>

<h3 className="text-lg font-semibold mb-2">
Create Resume by AI Power
</h3>

<p className="text-normal text-sm text-semibold! leading-6 mb-6">
Generate a professional resume automatically using your profile information, including your skills, experience, education, certifications, projects, and career goals.
</p>

<div className="mt-auto">

<div
className="
w-full
rounded-radius-md
bg-primary
hover:bg-primary-hover
text-white
text-center
py-3
font-medium
flex
items-center
justify-center
gap-2
"
>

Create By AI

<Wand2
size={18}

/>

</div>

</div>

</button>
<button
  onClick={() => handleChooseMode("manual")}
  className="
    bg-white
    rounded-radius-lg
    border
    border-border
    p-6
    flex
    flex-col
    text-left
    hover:shadow-shadow-card
    duration-300
  "
>

<div className="flex items-center gap-3 ">

<div
className="
w-12
h-12
rounded-full
flex
items-center

justify-center
"
>

<FileText
size={32}
color="var(--secondary)"
/>

</div>

</div>

<h3 className="text-lg font-semibold mb-2">
Create Resume Manually
</h3>

<p className="text-normal text-sm text-semibold! leading-6 mb-6">
Build and customize your resume from scratch
by adding and editing your information manually.
</p>

<div className="mt-auto">

<div
className="
w-full
rounded-radius-md
bg-secondary
hover:bg-secondary-hover
text-white
text-center
py-3
font-medium
flex
items-center
justify-center
gap-2
"
>

Create Manually
<FileText
size={22}

/>
</div>

</div>

</button>
        </div>
      </div>

      <div>
        <h2 className="mb-4">Your Resume</h2>
        {resumes.length === 0 ? (
          <p className="text-muted-foreground text-body-sm">
            You haven't created any resumes yet. Start above!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} onDelete={deleteResume} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CVDashboard;