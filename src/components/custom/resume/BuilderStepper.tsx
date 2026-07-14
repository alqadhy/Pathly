import PersonalInfoForm from "@/components/custom/resume/forms/PersonalInfoForm";
import ContactInfoForm from "@/components/custom/resume/forms/ContactInfoForm";
import EducationForm from "@/components/custom/resume/forms/EducationForm";
import ExperienceForm from "@/components/custom/resume/forms/ExperienceForm";
import SkillsForm from "@/components/custom/resume/forms/SkillsForm";
import CVPreviewModal from "../../custom/resume/preview/CVPreviewModal";

function BuilderStepper() {
  return (
    <div className="flex flex-col gap-6">
      <PersonalInfoForm />
      <ContactInfoForm />
      <EducationForm />
      <ExperienceForm />
      <SkillsForm />
      <CVPreviewModal /> 
    </div>
  );
}

export default BuilderStepper;