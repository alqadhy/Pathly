import type { Profile } from "../../../../types/profile";

const PROFILE_STORAGE_KEY = "pathly.profile";

const asArray = <T>(value: unknown): T[] => {
  return Array.isArray(value) ? (value as T[]) : [];
};

const asRecord = <T extends object>(value: unknown): T | null => {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as T) : null;
};

const asText = (value: unknown): string => {
  return typeof value === "string" ? value : "";
};

// Type guard helpers
const isNonNull = <T>(value: T | null): value is T => {
  return value !== null;
};

const normalizeSkills = (value: unknown): Profile["skills"] => {
  return asArray(value)
    .map((item, index) => {
      if (typeof item === "string") {
        const name = item.trim();
        return name ? { id: `skill-${index}-${name}`, name } : null;
      }

      const skill = asRecord<{ id?: unknown; name?: unknown; category?: unknown }>(item);
      if (!skill) return null;
      
      const name = asText(skill?.name).trim();
      if (!name) return null;

      return {
        id: asText(skill?.id) || `skill-${index}-${name}`,
        name,
        category: asText(skill?.category) || undefined,
      };
    })
    .filter(isNonNull);
};

const normalizeCertifications = (value: unknown): Profile["certifications"] => {
  return asArray(value)
    .map((item, index) => {
      const cert = asRecord<{ 
        id?: unknown; 
        name?: unknown; 
        issuer?: unknown; 
        issuedDate?: unknown; 
        expiryDate?: unknown; 
        credentialId?: unknown; 
        credentialUrl?: unknown 
      }>(item);
      
      if (!cert) return null;
      
      const name = asText(cert?.name).trim();
      if (!name) return null;

      const result = {
        id: asText(cert?.id) || `cert-${index}-${name}`,
        name,
        issuer: asText(cert?.issuer),
        issuedDate: asText(cert?.issuedDate),
      };

      // Only add optional fields if they exist
      const expiryDate = asText(cert?.expiryDate);
      const credentialId = asText(cert?.credentialId);
      const credentialUrl = asText(cert?.credentialUrl);

      if (expiryDate) Object.assign(result, { expiryDate });
      if (credentialId) Object.assign(result, { credentialId });
      if (credentialUrl) Object.assign(result, { credentialUrl });

      return result;
    })
    .filter(isNonNull);
};

const normalizeExperience = (value: unknown): Profile["experience"] => {
  return asArray(value)
    .map((item, index) => {
      const exp = asRecord<{ 
        id?: unknown; 
        title?: unknown; 
        company?: unknown; 
        employmentType?: unknown; 
        startDate?: unknown; 
        endDate?: unknown; 
        location?: unknown; 
        description?: unknown; 
        companyLogo?: unknown 
      }>(item);
      
      if (!exp) return null;
      
      const title = asText(exp?.title).trim();
      const company = asText(exp?.company).trim();
      if (!title && !company) return null;

      const result = {
        id: asText(exp?.id) || `experience-${index}-${title || company || 'unknown'}`,
        title,
        company,
        employmentType: asText(exp?.employmentType),
        startDate: asText(exp?.startDate),
        endDate: asText(exp?.endDate),
        description: Array.isArray(exp?.description)
          ? (exp?.description as string[]).filter(Boolean)
          : [],
      };

      // Only add optional fields if they exist
      const location = asText(exp?.location);
      const companyLogo = asText(exp?.companyLogo);

      if (location) Object.assign(result, { location });
      if (companyLogo) Object.assign(result, { companyLogo });

      return result;
    })
    .filter(isNonNull);
};

const normalizeEducation = (value: unknown): Profile["education"] => {
  return asArray(value)
    .map((item, index) => {
      const edu = asRecord<{ 
        id?: unknown; 
        institution?: unknown; 
        degree?: unknown; 
        fieldOfStudy?: unknown; 
        startDate?: unknown; 
        endDate?: unknown; 
        gpa?: unknown; 
        institutionLogo?: unknown 
      }>(item);
      
      if (!edu) return null;
      
      const institution = asText(edu?.institution).trim();
      if (!institution) return null;

      const result = {
        id: asText(edu?.id) || `education-${index}-${institution}`,
        institution,
        degree: asText(edu?.degree),
        fieldOfStudy: asText(edu?.fieldOfStudy),
        startDate: asText(edu?.startDate),
        endDate: asText(edu?.endDate),
      };

      // Only add optional fields if they exist
      const gpa = asText(edu?.gpa);
      const institutionLogo = asText(edu?.institutionLogo);

      if (gpa) Object.assign(result, { gpa });
      if (institutionLogo) Object.assign(result, { institutionLogo });

      return result;
    })
    .filter(isNonNull);
};

const normalizeCourses = (value: unknown): Profile["courses"] => {
  return asArray(value)
    .map((item, index) => {
      const course = asRecord<{ 
        id?: unknown; 
        name?: unknown; 
        provider?: unknown; 
        completionDate?: unknown; 
        skills?: unknown; 
        courseLogo?: unknown 
      }>(item);
      
      if (!course) return null;
      
      const name = asText(course?.name).trim();
      if (!name) return null;

      const result = {
        id: asText(course?.id) || `course-${index}-${name}`,
        name,
        provider: asText(course?.provider),
        completionDate: asText(course?.completionDate),
        skills: asArray(course?.skills).map((skill) => asText(skill)).filter(Boolean),
      };

      // Only add optional fields if they exist
      const courseLogo = asText(course?.courseLogo);
      if (courseLogo) Object.assign(result, { courseLogo });

      return result;
    })
    .filter(isNonNull);
};

export const normalizeProfile = (profile: Profile): Profile => {
  const personalInfo = asRecord<Profile["personalInfo"]>(profile.personalInfo);

  return {
    ...profile,
    personalInfo: {
      ...(profile.personalInfo || {}),
      ...(personalInfo || {}),
      links: asArray(profile.personalInfo?.links)
        .map((link) => {
          const obj =
            link && typeof link === "object" && !Array.isArray(link)
              ? (link as any)
              : null;

          const platform = typeof obj?.platform === "string" ? obj.platform : "";
          const url = typeof obj?.url === "string" ? obj.url : "";

          if (!platform || !url) return null;
          return { platform, url };
        })
        .filter((v): v is { platform: string; url: string } => v !== null),
    },
    activities: asArray(profile.activities).filter((v): v is Profile["activities"][number] => v != null),
    skills: normalizeSkills(profile.skills),
    certifications: normalizeCertifications(profile.certifications),
    experience: normalizeExperience(profile.experience),
    education: normalizeEducation(profile.education),
    courses: normalizeCourses(profile.courses),
    cv: asRecord(profile.cv),
    coverImage: {
      ...(profile.coverImage || {}),
    },
    avatarImage: {
      ...(profile.avatarImage || {}),
    },
  };
};

const hasLocalStorage = (): boolean => {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
};

export const getStoredProfile = (): Profile | null => {
  if (!hasLocalStorage()) return null;

  const rawProfile = window.localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!rawProfile) return null;

  try {
    return normalizeProfile(JSON.parse(rawProfile) as Profile);
  } catch {
    window.localStorage.removeItem(PROFILE_STORAGE_KEY);
    return null;
  }
};

export const saveStoredProfile = (profile: Profile): void => {
  if (!hasLocalStorage()) return;

  window.localStorage.setItem(
    PROFILE_STORAGE_KEY,
    JSON.stringify(normalizeProfile(profile)),
  );
};

export const clearStoredProfile = (): void => {
  if (!hasLocalStorage()) return;

  window.localStorage.removeItem(PROFILE_STORAGE_KEY);
};

export const getCurrentUser = (): { id: number; fullName: string; email: string; phone: string ; role: string } | null => {
  if (!hasLocalStorage()) return null;

  try {
    const currentUserJson = window.localStorage.getItem("currentUser");
    if (!currentUserJson) return null;

    const currentUser = JSON.parse(currentUserJson);
    
    // Return only the fields we need
    return {
      id: currentUser.id,
      fullName: currentUser.fullName,
      email: currentUser.email,
      phone: currentUser.phone,
      role: currentUser.role // Include role if needed
    };
  } catch {
    return null;
  }
};

export const clearCurrentUser = (): void => {
  if (!hasLocalStorage()) return;

  try {
    window.localStorage.removeItem("currentUser");
    window.localStorage.removeItem("pathly.community.follows");
    window.localStorage.removeItem("pathly.profile");
    window.localStorage.removeItem("saved-items");
  } catch {
    // Silently fail
  }
};

export const loadProfile = (fallbackProfile: Profile | null): Profile | null => {
  const storedProfile = getStoredProfile();
  if (storedProfile) return storedProfile;

  if (fallbackProfile) {
    const normalizedProfile = normalizeProfile(fallbackProfile);
    saveStoredProfile(normalizedProfile);
    return normalizedProfile;
  }

  return null;
};
