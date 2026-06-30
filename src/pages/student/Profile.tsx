// src/pages/student/Profile.tsx
import React, { useState, useEffect } from "react";
import type { Profile as ProfileType } from "../../types/profile";
import {
  ProfileHeader,
  AboutSection,
  ActivitiesSection,
  PersonalInfoSection,
  SkillsSection,
  CVSection,
  CertificationsSection,
  ExperienceSection,
  EducationSection,
  CoursesSection,
  EditModal,
  ProgressBar,
} from "../../components/custom/Profile";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/mocked/Profile/profile.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(getFallbackProfile());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackProfile = (): ProfileType => {
    return {
      id: "student-001",
      name: "Ahmed Hossam",
      title: "Senior Product Designer",
      followers: 349,
      location: "Cairo, Egypt",
      industry: "Design & Technology",
      about:
        "Senior Product Designer passionate about creating intuitive, user-centered digital experiences that drive business impact.",
      coverImage: {
        url: "/images/profile-cover.jpg",
        alt: "Profile cover image"
      },
      avatarImage: {
        url: "/images/avatar.jpg",
        alt: "Ahmed Hossam avatar"
      },
      personalInfo: {
        username: "ahmedhossam",
        email: "ahmedhossam4@gmail.com",
        phone: "+201012345678",
        location: "Cairo, Egypt",
        currentPosition: "Senior Product Designer",
        industry: "Design & Technology",
        links: [{ platform: "Behance", url: "behance.net/ahmedhossam12" }],
      },
      activities: [],
      skills: [],
      certifications: [],
      experience: [],
      education: [],
      courses: [],
      cv: null,
    };
  };

  // Calculate profile completion dynamically
  const calculateCompletion = (profile: ProfileType): number => {
    let completed = 0;
    const total = 9;

    // About section
    if (profile.about && profile.about.trim() !== "") completed++;
    // Personal Info
    if (profile.personalInfo) completed++;
    // Skills
    if (profile.skills && profile.skills.length > 0) completed++;
    // Certifications
    if (profile.certifications && profile.certifications.length > 0) completed++;
    // Experience
    if (profile.experience && profile.experience.length > 0) completed++;
    // Education
    if (profile.education && profile.education.length > 0) completed++;
    // Courses
    if (profile.courses && profile.courses.length > 0) completed++;
    // CV
    if (profile.cv) completed++;
    // Activities
    if (profile.activities && profile.activities.length > 0) completed++;

    return Math.round((completed / total) * 100);
  };

  const handleEdit = (section: string, item?: any) => {
    setEditingSection(section);
    setSelectedItem(item || null);
  };

  const handleSave = (section: string, data: any) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const updated = { ...prev };
      switch (section) {
        case "about":
          updated.about = data;
          break;
        case "personalInfo":
          updated.personalInfo = data;
          break;
        case "skills":
          updated.skills = data;
          break;
        case "experience":
          if (selectedItem) {
            const index = updated.experience.findIndex(
              (e) => e.id === selectedItem.id,
            );
            if (index !== -1) {
              updated.experience[index] = data;
            }
          } else {
            updated.experience = [...updated.experience, data];
          }
          break;
        case "certifications":
          updated.certifications = data;
          break;
        case "education":
          updated.education = data;
          break;
        case "courses":
          updated.courses = data;
          break;
        case "cv":
          updated.cv = data;
          break;
        case "activities":
          updated.activities = data;
          break;
        default:
          break;
      }
      return updated;
    });
    setEditingSection(null);
    setSelectedItem(null);
  };

  const handleCloseModal = () => {
    setEditingSection(null);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8f9fc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#553be6] mx-auto"></div>
          <p className="mt-4 text-[#6b7280]">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12 bg-[#f8f9fc]">
        <p className="text-[#6b7280]">Profile not found</p>
      </div>
    );
  }

  // Calculate completion dynamically
  const completionPercentage = calculateCompletion(profile);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-[#f8f9fc]">
      {/* Profile Header - Full Width */}
      <div className="mb-4">
        <ProfileHeader profile={profile} />
      </div>

      {/* Progress Bar - Full Width */}
      <div className="mb-4">
        <ProgressBar completion={completionPercentage} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - 2/3 width (Main Content) */}
        <div className="lg:col-span-2 space-y-4">
          <AboutSection
            about={profile.about}
            onEdit={() => handleEdit("about")}
          />
          <ActivitiesSection
            activities={profile.activities}
            onEdit={() => handleEdit("activities")}
          />
          <CertificationsSection
            certifications={profile.certifications}
            onEdit={() => handleEdit("certifications")}
          />
          <ExperienceSection
            experience={profile.experience}
            onEdit={() => handleEdit("experience")}
          />
          <EducationSection
            education={profile.education}
            onEdit={() => handleEdit("education")}
          />
          <CoursesSection
            courses={profile.courses}
            onEdit={() => handleEdit("courses")}
          />
        </div>

        {/* Right Column - 1/3 width (Sidebar) */}
        <div className="lg:col-span-1 space-y-4">
          <PersonalInfoSection
            personalInfo={profile.personalInfo}
            onEdit={() => handleEdit("personalInfo")}
          />
          <SkillsSection
            skills={profile.skills}
            onEdit={() => handleEdit("skills")}
          />
          <CVSection cv={profile.cv} onEdit={() => handleEdit("cv")} />
        </div>
      </div>

      {/* Edit Modal */}
      {editingSection && (
        <EditModal
          isOpen={!!editingSection}
          onClose={handleCloseModal}
          section={editingSection}
          data={selectedItem || profile[editingSection as keyof ProfileType]}
          onSave={(data) => handleSave(editingSection, data)}
          profile={profile}
        />
      )}
    </div>
  );
};

export default Profile;