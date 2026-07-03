import React, { useState, useEffect } from "react";
import type { Profile as ProfileType } from "../../types/profile";
import {
  loadProfile,
  saveStoredProfile,
  normalizeProfile,
  getCurrentUser,
} from "../../components/custom/Profile/crud/profileStorage";
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
  AddModal,
  DeleteConfirmationModal,
  ProgressBar,
} from "../../components/custom/Profile";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [addingSection, setAddingSection] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    section: string;
    item: any;
  }>({ isOpen: false, section: "", item: null });

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      saveStoredProfile(profile);
    }
  }, [profile]);

  const fetchProfile = async () => {
    try {
      // FIRST: Check for stored profile in localStorage to preserve CRUD changes
      const storedProfile = loadProfile(null);
      if (storedProfile) {
        console.log("Loading stored profile from localStorage");
        setProfile(storedProfile);
        return;
      }

      // SECOND: If no stored profile, check for currentUser and create profile from it
      const currentUser = getCurrentUser();
      console.log("Current user from localStorage:", currentUser);
      
      if (currentUser) {
        console.log("Creating new profile from currentUser");
        // Create a profile from the user data
        const userProfile: ProfileType = {
          id: `user-${currentUser.id}`,
          name: currentUser.fullName,
          title: "",
          followers: 0,
          location: "",
          industry: "",
          about: "",
          personalInfo: {
            username: currentUser.email.split("@")[0],
            email: currentUser.email,
            phone: currentUser.phone,
            location: "",
            currentPosition: "",
            industry: "",
            links: [],
          },
          activities: [],
          skills: [],
          certifications: [],
          experience: [],
          education: [],
          courses: [],
          cv: null,
          coverImage: { url: "", alt: "" },
          avatarImage: { url: "", alt: currentUser.fullName },
        };

        const normalizedProfile = normalizeProfile(userProfile);
        saveStoredProfile(normalizedProfile);
        setProfile(normalizedProfile);
        return;
      }

      // No profile found - user needs to log in
      console.log("No profile found - user not logged in");
      setProfile(null);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
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
    if (profile.certifications && profile.certifications.length > 0)
      completed++;
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

  const handleAdd = (section: string) => {
    setAddingSection(section);
  };

  const handleSave = (section: string, data: any) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const updated = normalizeProfile({ ...prev });
      switch (section) {
        case "about":
          updated.about = data;
          break;
        case "personalInfo":
          updated.personalInfo = data;
          break;
        case "skills":
          const skillNames = (
            Array.isArray(data)
              ? data
              : Array.isArray(data?.skills)
                ? data.skills
                : []
          )
            .map((skill: any) =>
              typeof skill === "string" ? skill : skill?.name,
            )
            .filter(Boolean)
            .map((skill: string) => skill.trim());

          if (addingSection === "skills") {
            const existingNames = updated.skills.map((skill) => skill.name);
            const mergedNames = [...existingNames, ...skillNames].filter(
              (skill, index, allSkills) =>
                skill &&
                allSkills.findIndex(
                  (item) => item.toLowerCase() === skill.toLowerCase(),
                ) === index,
            );

            updated.skills = mergedNames.map((skillName: string) => ({
              id: `skill-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
              name: skillName,
            }));
          } else {
            updated.skills = skillNames.map((skillName: string) => ({
              id: `skill-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
              name: skillName,
            }));
          }
          break;
        case "experience": {
          const current = updated.experience;

          if (selectedItem) {
            const index = current.findIndex((e) => e.id === selectedItem.id);
            if (index !== -1) {
              current[index] = data;
            }
            updated.experience = current;
          } else {
            updated.experience = [
              ...current,
              { ...data, id: data.id || `experience-${Date.now()}` },
            ];
          }
          break;
        }
        case "certifications":
          if (selectedItem) {
            const index = updated.certifications.findIndex(
              (c) => c.id === selectedItem.id,
            );
            if (index !== -1) {
              updated.certifications[index] = data;
            }
          } else {
            updated.certifications = [
              ...updated.certifications,
              { ...data, id: data.id || `certification-${Date.now()}` },
            ];
          }
          break;
        case "education":
          if (selectedItem) {
            const index = updated.education.findIndex(
              (e) => e.id === selectedItem.id,
            );
            if (index !== -1) {
              updated.education[index] = data;
            }
          } else {
            updated.education = [
              ...(updated.education || []),
              { ...data, id: data.id || `education-${Date.now()}` },
            ];
          }
          break;
        case "courses":
          if (selectedItem) {
            const index = updated.courses.findIndex(
              (c) => c.id === selectedItem.id,
            );
            if (index !== -1) {
              updated.courses[index] = data;
            }
          } else {
            updated.courses = [
              ...(updated.courses || []),
              { ...data, id: data.id || `course-${Date.now()}` },
            ];
          }
          break;
        case "cv":
          updated.cv = data;
          break;
        case "activities":
          if (selectedItem) {
            const index = updated.activities.findIndex(
              (a) => a.id === selectedItem.id,
            );
            if (index !== -1) {
              updated.activities[index] = data;
            }
          } else {
            updated.activities = [
              ...updated.activities,
              { ...data, id: data.id || `activity-${Date.now()}` },
            ];
          }
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

  const handleAvatarChange = (imageUrl: string) => {
    setProfile((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        avatarImage: {
          url: imageUrl,
          alt: prev.name || "Profile picture",
        },
      };
    });
  };

  const handleCoverChange = (imageUrl: string) => {
    setProfile((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        coverImage: {
          url: imageUrl,
          alt: prev.name || "Cover image",
        },
      };
    });
  };

  const handleDeleteClick = (section: string, item: any) => {
    setDeleteModal({ isOpen: true, section, item });
  };

  const handleDeleteConfirm = () => {
    setProfile((prev) => {
      if (!prev) return prev;
      const updated = { ...prev };

      switch (deleteModal.section) {
        case "experience":
          updated.experience = (updated.experience || []).filter(
            (e) => e.id !== deleteModal.item.id,
          );
          break;
        case "education":
          updated.education = (updated.education || []).filter(
            (e) => e.id !== deleteModal.item.id,
          );
          break;
        case "certifications":
          updated.certifications = (updated.certifications || []).filter(
            (c) => c.id !== deleteModal.item.id,
          );
          break;
        case "courses":
          updated.courses = (updated.courses || []).filter(
            (c) => c.id !== deleteModal.item.id,
          );
          break;
        case "activities":
          updated.activities = (updated.activities || []).filter(
            (a) => a.id !== deleteModal.item.id,
          );
          break;
        case "cv":
          updated.cv = null;
          break;
        default:
          break;
      }

      return updated;
    });

    setDeleteModal({ isOpen: false, section: "", item: null });
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
        <ProfileHeader
          profile={profile}
          onAvatarChange={handleAvatarChange}
          onCoverChange={handleCoverChange}
        />
      </div>

      {/* Progress Bar - Full Width */}
      {completionPercentage < 100 && (
        <div className="mb-4">
          <ProgressBar completion={completionPercentage} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - 2/3 width (Main Content) */}
        <div className="lg:col-span-2 space-y-4">
          <AboutSection
            about={profile.about}
            onEdit={() => handleEdit("about")}
          />
          <ActivitiesSection
            activities={profile.activities}
            onEdit={(activity) => handleEdit("activities", activity)}
            onDelete={(activity) => handleDeleteClick("activities", activity)}
            onAdd={() => handleAdd("activities")}
            profileName={profile.name}
            profileTitle={profile.title}
            profileImage={profile.avatarImage?.url}
          />
          <ExperienceSection
            experience={profile.experience}
            onEdit={(exp) => handleEdit("experience", exp)}
            onDelete={(exp) => handleDeleteClick("experience", exp)}
            onAdd={() => handleAdd("experience")}
          />
          <EducationSection
            education={profile.education}
            onEdit={(edu) => handleEdit("education", edu)}
            onDelete={(edu) => handleDeleteClick("education", edu)}
            onAdd={() => handleAdd("education")}
          />
          <CoursesSection
            courses={profile.courses}
            onEdit={(course) => handleEdit("courses", course)}
            onDelete={(course) => handleDeleteClick("courses", course)}
            onAdd={() => handleAdd("courses")}
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
            onAdd={() => handleAdd("skills")}
          />
          <CertificationsSection
            certifications={profile.certifications}
            onEdit={(cert) => handleEdit("certifications", cert)}
            onAdd={() => handleAdd("certifications")}
            onDelete={(cert) => handleDeleteClick("certifications", cert)}
          />
          <CVSection
            cv={profile.cv}
            onAdd={() => handleAdd("cv")}
            onDelete={() => handleDeleteClick("cv", profile.cv)}
          />
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

      {/* Add Modal */}
      {addingSection && (
        <AddModal
          isOpen={!!addingSection}
          onClose={() => setAddingSection(null)}
          section={addingSection}
          onSave={(data) => handleSave(addingSection, data)}
          profile={profile}
          existingSkills={
            addingSection === "skills" ? profile.skills : undefined
          }
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, section: "", item: null })
        }
        onConfirm={handleDeleteConfirm}
        title={`Delete ${deleteModal.section}`}
        message={`Are you sure you want to delete this ${deleteModal.section}?`}
        itemName={
          deleteModal.item?.fileName ||
          deleteModal.item?.title ||
          deleteModal.item?.name ||
          ""
        }
      />
    </div>
  );
};

export default Profile;
