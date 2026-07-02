import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Upload } from "lucide-react";
import type { Profile, Skill } from "../../../../types/profile";

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string;
  onSave: (data: any) => void;
  profile: Profile;
  existingSkills?: Skill[];
}

const AddModal: React.FC<AddModalProps> = ({
  isOpen,
  onClose,
  section,
  onSave,
  existingSkills = [],
}) => {
  const [formData, setFormData] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const safeExistingSkills = Array.isArray(existingSkills)
    ? existingSkills
    : [];

  useEffect(() => {
    if (isOpen) {
      // Initialize empty form data based on section
      switch (section) {
        case "experience":
          setFormData({
            title: "",
            company: "",
            employmentType: "Full time",
            startDate: "",
            endDate: "",
            location: "",
            workMode: "",
            description: [""],
            companyLogo: "",
          });
          break;
        case "education":
          setFormData({
            degree: "",
            field: "",
            institution: "",
            startDate: "",
            endDate: "",
            description: "",
          });
          break;
        case "certifications":
          setFormData({
            name: "",
            issuer: "",
            issuedDate: "",
            expiryDate: "",
            credentialId: "",
            credentialUrl: "",
          });
          break;
        case "courses":
          setFormData({
            name: "",
            provider: "",
            completionDate: "",
            credentialId: "",
            credentialUrl: "",
          });
          break;
        case "skills":
          setFormData({
            skills: [""],
          });
          break;
        case "cv":
          setFormData({
            fileName: "",
            fileSize: "",
            fileUrl: "",
          });
          break;
        case "activities":
          setFormData({
            content: "",
            image: "",
          });
          break;
        default:
          setFormData({});
      }
      setErrors({});
    }
  }, [isOpen, section]);

  if (!isOpen || !formData) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    switch (section) {
      case "experience":
        if (!formData.title?.trim()) {
          newErrors.title = "Job title is required";
        }
        if (!formData.company?.trim()) {
          newErrors.company = "Company is required";
        }
        if (!formData.startDate?.trim()) {
          newErrors.startDate = "Start date is required";
        }
        break;
      case "education":
        if (!formData.degree?.trim()) {
          newErrors.degree = "Degree is required";
        }
        if (!formData.institution?.trim()) {
          newErrors.institution = "Institution is required";
        }
        if (!formData.startDate?.trim()) {
          newErrors.startDate = "Start date is required";
        }
        break;
      case "certifications":
        if (!formData.name?.trim()) {
          newErrors.name = "Certification name is required";
        }
        if (!formData.issuer?.trim()) {
          newErrors.issuer = "Issuing organization is required";
        }
        if (!formData.issuedDate?.trim()) {
          newErrors.issuedDate = "Issue date is required";
        }
        break;
      case "courses":
        if (!formData.name?.trim()) {
          newErrors.name = "Course name is required";
        }
        if (!formData.provider?.trim()) {
          newErrors.provider = "Provider is required";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const getSectionTitle = () => {
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  const renderSectionFields = () => {
    switch (section) {
      case "experience":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Job title
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.title ? "border-red-500" : "border-border"
                }`}
                placeholder="UI&UX Designer"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Company
              </label>
              <input
                type="text"
                value={formData.company || ""}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.company ? "border-red-500" : "border-border"
                }`}
                placeholder="Vortex AI"
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">{errors.company}</p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Employment type
              </label>
              <select
                value={formData.employmentType || ""}
                onChange={(e) =>
                  setFormData({ ...formData, employmentType: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              >
                <option value="Full time">Full time</option>
                <option value="Part time">Part time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-body-sm font-medium text-foreground mb-1">
                  Start date
                </label>
                <input
                  type="date"
                  value={formData.startDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  placeholder="MM/YYYY"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                    errors.startDate ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.startDate}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-body-sm font-medium text-foreground mb-1">
                  End date
                </label>
                <input
                  type="date"
                  value={formData.endDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  placeholder="MM/YYYY or Present"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Location
              </label>
              <select
                value={formData.location || ""}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              >
                <option value="">Select location</option>
                <option value="cairo">Cairo</option>
                <option value="riyadh">Riyadh</option>
                <option value="dubai">Dubai</option>
                <option value="remote">Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Work mode
              </label>
              <select
                value={formData.workMode || ""}
                onChange={(e) =>
                  setFormData({ ...formData, workMode: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              >
                <option value="">Select work mode</option>
                <option value="on-site">On-site</option>
                <option value="hybrid">Hybrid</option>
                <option value="remote">Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Description
              </label>
              <textarea
                value={formData.description?.join("\n") || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value.split("\n").filter(Boolean),
                  })
                }
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Line 1: Achievements\nLine 2: Responsibilities"
              />
            </div>
          </div>
        );

      case "education":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Degree
              </label>
              <input
                type="text"
                value={formData.degree || ""}
                onChange={(e) =>
                  setFormData({ ...formData, degree: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.degree ? "border-red-500" : "border-border"
                }`}
                placeholder="Bachelor's Degree"
              />
              {errors.degree && (
                <p className="text-red-500 text-xs mt-1">{errors.degree}</p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Field of Study
              </label>
              <input
                type="text"
                value={formData.field || ""}
                onChange={(e) =>
                  setFormData({ ...formData, field: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Computer Science"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Institution
              </label>
              <input
                type="text"
                value={formData.institution || ""}
                onChange={(e) =>
                  setFormData({ ...formData, institution: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.institution ? "border-red-500" : "border-border"
                }`}
                placeholder="University Name"
              />
              {errors.institution && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.institution}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-body-sm font-medium text-foreground mb-1">
                  Start date
                </label>
                <input
                  type="date"
                  value={formData.startDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  placeholder="MM/YYYY"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-body-sm font-medium text-foreground mb-1">
                  End date
                </label>
                <input
                  type="date"
                  value={formData.endDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  placeholder="MM/YYYY or Present"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Description
              </label>
              <textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Achievements, activities, or description"
              />
            </div>
          </div>
        );

      case "certifications":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Certification Name
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.name ? "border-red-500" : "border-border"
                }`}
                placeholder="AWS Certified Solutions Architect"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Issuing Organization
              </label>
              <input
                type="text"
                value={formData.issuer || ""}
                onChange={(e) =>
                  setFormData({ ...formData, issuer: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.issuer ? "border-red-500" : "border-border"
                }`}
                placeholder="Amazon Web Services"
              />
              {errors.issuer && (
                <p className="text-red-500 text-xs mt-1">{errors.issuer}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-body-sm font-medium text-foreground mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  value={formData.issuedDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, issuedDate: e.target.value })
                  }
                  placeholder="MM/YYYY"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-body-sm font-medium text-foreground mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.expiryDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                  placeholder="MM/YYYY or No Expiry"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Credential ID (Optional)
              </label>
              <input
                type="text"
                value={formData.credentialId || ""}
                onChange={(e) =>
                  setFormData({ ...formData, credentialId: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="ABC123XYZ"
              />
            </div>
          </div>
        );

      case "courses":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Course name*
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.name ? "border-red-500" : "border-border"
                }`}
                placeholder="Advanced Product Design: Design Systems & Scalable UX"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Organization*
              </label>
              <input
                type="text"
                value={formData.provider || ""}
                onChange={(e) =>
                  setFormData({ ...formData, provider: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.provider ? "border-red-500" : "border-border"
                }`}
                placeholder="Interaction Design Foundation (IxDF)"
              />
              {errors.provider && (
                <p className="text-red-500 text-xs mt-1">{errors.provider}</p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Duration*
              </label>
              <input
                type="date"
                value={formData.completionDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, completionDate: e.target.value })
                }
                placeholder="Feb 2024"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.completionDate ? "border-red-500" : "border-border"
                }`}
              />
              {errors.completionDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.completionDate}
                </p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Course Level
              </label>
              <input
                type="text"
                value={formData.level || ""}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                placeholder="Intermediate"
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Skills Acquired (comma separated)
              </label>
              <textarea
                value={formData.skills?.join("\n") || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: e.target.value.split("\n").filter(Boolean),
                  })
                }
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Design Systems&#10;Component Libraries&#10;Accessibility (WCAG)&#10;UX Consistency"
              />
            </div>
          </div>
        );

      case "skills":
        const recommendedSkills = [
          "Design leadership",
          "Stakeholder management",
          "Interaction Architecture",
          "Data-driven Design",
          "Experience strategy",
        ];

        const filteredRecommendations = recommendedSkills.filter(
          (skill) =>
            !safeExistingSkills.some(
              (s) => s.name.toLowerCase() === skill.toLowerCase(),
            ),
        );

        const handleAddSkill = (skill: string) => {
          const currentSkills = formData.skills || [];
          if (!currentSkills.includes(skill)) {
            setFormData({
              ...formData,
              skills: [...currentSkills, skill],
            });
          }
        };

        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Skill*
              </label>
              <textarea
                value={formData.skills?.join("\n") || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: e.target.value.split("\n").filter(Boolean),
                  })
                }
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Enter skills, one per line"
              />
            </div>

            {filteredRecommendations.length > 0 && (
              <div className="border border-border rounded-lg p-4">
                <p className="text-body-sm font-medium text-foreground mb-3">
                  Recommended skills for you based on your profile
                </p>
                <div className="flex flex-wrap gap-2">
                  {filteredRecommendations.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleAddSkill(skill)}
                      className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-body-sm font-medium hover:bg-purple-100 transition-colors duration-200"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "cv":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Upload CV
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors duration-200">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-body-md text-foreground mb-2">
                  Drop your CV here or click to browse
                </p>
                <p className="text-body-sm text-muted-foreground mb-4">
                  Supported formats: PDF, DOC, DOCX (Max 5MB)
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData({
                        ...formData,
                        fileName: file.name,
                        fileSize: formatFileSize(file.size),
                        fileUrl: URL.createObjectURL(file),
                      });
                    }
                  }}
                  className="hidden"
                  id="cv-upload"
                />
                <label
                  htmlFor="cv-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors duration-200 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Choose File
                </label>
                {formData.fileName && (
                  <div className="mt-4 p-3 bg-background rounded-lg">
                    <p className="text-body-sm font-medium text-foreground">
                      {formData.fileName}
                    </p>
                    <p className="text-body-sm text-muted-foreground">
                      {formData.fileSize}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "activities":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Activity Content *
              </label>
              <textarea
                value={formData.content || ""}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Share your thoughts, achievements, or projects..."
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Image URL (optional)
              </label>
              <input
                type="text"
                value={formData.image || ""}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-muted-foreground">
            Add form for {section} section coming soon...
          </div>
        );
    }
  };

  const modalElement = (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999 p-4"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        style={{ minWidth: "700px" }}
      >
        <div className="px-6 py-4 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold text-gray-900">
            Add {getSectionTitle()}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {renderSectionFields()}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#553be6] text-white rounded-lg hover:bg-[#4d35cf] transition-colors duration-200 flex items-center font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalElement, document.body);
};

export default AddModal;
