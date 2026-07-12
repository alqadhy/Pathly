import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Profile } from "../../types/profile";
import {
  ProfileHeader,
  AboutSection,
  ActivitiesSection,
  PersonalInfoSection,
  SkillsSection,
  TracksSection,
  CertificationsSection,
  ExperienceSection,
  EducationSection,
  CoursesSection,
  CVSection,
} from "../../components/custom/Profile";

const PublicProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/mocked/Community/profile-details.json`);
        if (!response.ok) {
          throw new Error("Failed to load profile data");
        }
        const data = await response.json();
        const profileData = data.profiles[id || ""];

        if (profileData) {
          setProfile(profileData);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id]);

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
        <button
          onClick={() => navigate("/student/community")}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
        >
          Back to Community
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 max-sm:px-0 py-6 bg-[#f8f9fc]">
      {/* Profile Header - Full Width */}
      <div className="mb-4">
        <ProfileHeader profile={profile} isPublicView={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - 2/3 width (Main Content) */}
        <div className="lg:col-span-2 space-y-4">
          <AboutSection about={profile.about} isPublicView={true} />
          <ActivitiesSection
            activities={profile.activities}
            isPublicView={true}
            profileName={profile.name}
            profileTitle={profile.title}
            profileImage={profile.avatarImage?.url}
          />
          <ExperienceSection
            experience={profile.experience}
            isPublicView={true}
          />
          <EducationSection education={profile.education} isPublicView={true} />
          <CoursesSection courses={profile.courses} isPublicView={true} />
        </div>

        {/* Right Column - 1/3 width (Sidebar) */}
        <div className="lg:col-span-1 space-y-4">
          <PersonalInfoSection
            personalInfo={profile.personalInfo}
            isPublicView={true}
          />
          <SkillsSection skills={profile.skills} isPublicView={true} />
          <TracksSection tracks={profile.tracks} isPublicView={true} />
          <CertificationsSection
            certifications={profile.certifications}
            isPublicView={true}
          />
          <CVSection cv={profile.cv} isPublicView={true} />
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
