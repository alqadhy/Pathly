import React from "react";
// icons
import { ArrowRight } from "lucide-react";
// components
import ProgressBar from "../ProgressBar";

const ProfileStrength: React.FC = () => {
  // Data for the profile sections
  const sections = [
    {
      id: 1,
      label: "Personal Info",
      value: 100,
      text: "100%",
      colorClass: "bg-primary",
      textClass: "text-primary",
    },
    {
      id: 2,
      label: "Education",
      value: 100,
      text: "100%",
      colorClass: "bg-primary",
      textClass: "text-primary",
    },
    {
      id: 3,
      label: "Skills",
      value: 85,
      text: "85%",
      colorClass: "bg-secondary",
      textClass: "text-secondary",
    },
    {
      id: 4,
      label: "Portfolio",
      value: 50,
      text: "50%",
      colorClass: "bg-secondary",
      textClass: "text-secondary",
    },
    {
      id: 5,
      label: "Languages",
      value: 0,
      text: "Not added",
      colorClass: "bg-light",
      textClass: "text-danger",
    },
    {
      id: 6,
      label: "Experience",
      value: 0,
      text: "Not added",
      colorClass: "bg-light",
      textClass: "text-danger",
    },
    {
      id: 7,
      label: "Certifications",
      value: 0,
      text: "Not added",
      colorClass: "bg-light",
      textClass: "text-danger",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm w-full h-[600px] flex flex-col">
      {/* Header  */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-h4 font-bold text-foreground">
          Profile Strength by Section
        </h3>
        {/* Complete Profile */}
        <a
          href="#"
          className="text-body-sm font-semibold text-primary hover:underline flex items-center group"
        >
          Complete profile
          <ArrowRight className="group-hover:translate-x-1 transition-fast duration-300 w-5 h-5 ml-1" />
        </a>
      </div>

      {/* Progress Bars List */}
      <div className="flex flex-col overflow-y-auto pr-2 text-3xl">
        {sections.map((section) => (
          <ProgressBar
            key={section.id}
            title={section.label}
            value={section.value}
            colorClass={section.colorClass}
            labelRight={section.text}
            labelRightClass={section.textClass}
          />
        ))}
      </div>

      {/* Footer / Divider */}
      <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
        <div className="flex items-baseline">
          <span className="text-h2 font-bold text-primary mr-1">
            72<span className="text-h4">%</span>
          </span>
          <span className="text-body-sm text-normal">overall</span>
        </div>
        <div className="text-right">
          <p className="text-body-sm text-normal mb-0.5">
            4 of 7 sections complete
          </p>
          <p className="text-body-sm font-semibold text-primary">
            +8% from last month
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileStrength;
