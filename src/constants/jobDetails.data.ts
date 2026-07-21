import type { Job, JobDetail } from "../types/jobs.types";
import { matchingJobs, recommendedJobs } from "./jobs.data";
import { internships } from "./internships.data";


interface CompanyProfile {
  about: string;
  hiringContactName: string;
}


const companyProfiles: Record<string, CompanyProfile> = {
  ABB: {
    about:
      "ABB is a global technology leader that energizes the transformation of society and industry to achieve a more productive, sustainable future. By connecting software to its electrification, robotics, automation and motion portfolio, ABB pushes the boundaries of technology to drive performance to new levels.",
    hiringContactName: "Ali Hassan",
  },
  Sony: {
    about:
      "Sony is a creative entertainment company with a solid foundation of technology. From gaming and music to movies and electronics, Sony's purpose is to fill the world with emotion through the power of creativity and technology.",
    hiringContactName: "Mona Fathy",
  },
  LG: {
    about:
      "LG Electronics is a global innovator in technology and consumer electronics, with a presence in almost every country in the world. LG focuses on advanced technologies in home appliances, mobile, and displays to make life better for people everywhere.",
    hiringContactName: "Youssef Adel",
  },
  Philips: {
    about:
      "Philips is a health technology company focused on improving people's health and well-being through meaningful innovation. Philips aims to make the world healthier and more sustainable through innovation in diagnosis, treatment, and personal health.",
    hiringContactName: "Nourhan Samir",
  },
  HP: {
    about:
      "HP creates technology that makes life better for everyone, everywhere. Through its product and service portfolio of personal systems, printers, and 3D printing solutions, HP engineers experiences that amaze.",
    hiringContactName: "Kareem Nabil",
  },
  Samsung: {
    about:
      "Samsung inspires the world and shapes the future with transformative ideas and technologies. Samsung is redefining the worlds of TVs, smartphones, wearable devices, tablets, digital appliances, and more.",
    hiringContactName: "Rana Tarek",
  },
  Nokia: {
    about:
      "Nokia is a global leader in creating the technology at the heart of our connected world, providing network infrastructure, software, and services. Nokia is committed to innovation and technology leadership across mobile, fixed, and cloud networks.",
    hiringContactName: "Omar Khaled",
  },
};


interface RoleContent {
  roleAbout: (title: string) => string;
  strengths: string[];
  gaps: string[];
  responsibilities: string[];
  benefits: string[];
}

const genericBenefits = [
  "Comprehensive Wellbeing: Enjoy peace of mind with our private medical insurance and life cover.",
  "Work-Life Balance: Achieve optimal well-being with our hybrid work environment, generous leave policy, and regular team-building events.",
  "Continuous Development: Expand your horizons through our commitment to learning and development opportunities.",
];

const seniorContent: RoleContent = {
  roleAbout: (title) =>
    `We are seeking a ${title} to drive the design efforts for our digital products. This role will involve crafting intuitive user interfaces and delivering seamless user experiences across various platforms. You'll need a meticulous approach to create wireframes and functional specifications promptly for complex designs.`,
  strengths: [
    "3+ years of experience in product design",
    "Strong UX/UI design experience (web & mobile)",
    "Proficient in Figma, prototyping, and design systems",
    "Good understanding of user-centered design & usability principles",
    "Experience in end-to-end product design flow",
    "Solid portfolio with real projects (freelance / products)",
    "Ability to collaborate with product & dev teams",
  ],
  gaps: [
    "Limited experience in senior leadership / mentoring designers",
    "Less exposure to large-scale enterprise or complex systems",
    "Limited ownership of full product strategy at business level",
  ],
  responsibilities: [
    "Ability to take design decisions based on a strategic design roadmap or personal design expertise and reasoning",
    "Create documentation and guidelines for effective usage of design system components",
    "Manage the entire design workflow, from initial wireframes and prototype to final delivery to developers",
    "Collaborate closely with development teams for seamless integration of design components",
    "Collaborate with cross-functional teams to ensure design consistency and usability",
    "Gather and evaluate user requirements in collaboration with Product managers and Engineers",
    "Present and defend designs and key milestone deliverables to peers and executive level stakeholders",
  ],
  benefits: genericBenefits,
};

const leadContent: RoleContent = {
  roleAbout: (title) =>
    `We are looking for a ${title} to own the design vision across a portfolio of products. You will set design standards, mentor a team of designers, and partner directly with leadership to shape product strategy.`,
  strengths: [
    "5+ years of experience with at least 1 year in a leadership role",
    "Track record of shipping design systems at scale",
    "Strong stakeholder management and communication skills",
    "Experience mentoring and reviewing the work of other designers",
    "Deep understanding of end-to-end product strategy",
  ],
  gaps: [
    "Limited exposure to hardware or embedded product design",
    "Less experience working across multiple time zones",
  ],
  responsibilities: [
    "Define and own the design vision and roadmap across multiple product lines",
    "Mentor and grow a team of product designers",
    "Partner with leadership on product strategy and prioritization",
    "Establish and evolve design systems and documentation standards",
    "Represent design in executive-level product reviews",
  ],
  benefits: genericBenefits,
};

const juniorContent: RoleContent = {
  roleAbout: (title) =>
    `We are looking for a ${title} to join our design team and grow their craft on real products. You'll work closely with senior designers to learn end-to-end product design while contributing to live projects.`,
  strengths: [
    "0-2 years of experience in UI/UX design",
    "Solid fundamentals in visual design and typography",
    "Comfortable working with Figma and basic prototyping",
    "Eagerness to learn and take feedback well",
  ],
  gaps: [
    "Limited experience with complex, multi-flow products",
    "Still building experience working directly with engineering teams",
    "Limited exposure to research and usability testing",
  ],
  responsibilities: [
    "Support senior designers on wireframes, mockups, and prototypes",
    "Apply and maintain consistency with the existing design system",
    "Participate in design critiques and iterate based on feedback",
    "Assist in preparing design handoff documentation for developers",
  ],
  benefits: genericBenefits,
};

const researcherContent: RoleContent = {
  roleAbout: (title) =>
    `We are seeking a ${title} to uncover user insights that shape product decisions. You'll plan and run studies, synthesize findings, and partner with designers and product managers to translate insights into action.`,
  strengths: [
    "Experience planning and conducting qualitative and quantitative research",
    "Strong skills in synthesizing findings into clear, actionable insights",
    "Comfortable presenting research findings to cross-functional teams",
    "Familiarity with usability testing and survey tools",
  ],
  gaps: [
    "Limited experience with large-scale quantitative studies",
    "Less exposure to international / multi-market research",
  ],
  responsibilities: [
    "Plan and conduct user research studies across the product lifecycle",
    "Synthesize qualitative and quantitative findings into actionable insights",
    "Partner with designers and PMs to embed research into the product process",
    "Maintain a repository of research findings and personas",
  ],
  benefits: genericBenefits,
};

const internContent: RoleContent = {
  roleAbout: (title) =>
    `As a ${title}, you'll work alongside our product design team on real projects, gaining hands-on experience with the end-to-end design process while being mentored by senior designers.`,
  strengths: [
    "Currently pursuing or recently completed a design-related degree",
    "Basic familiarity with Figma or similar design tools",
    "Strong eagerness to learn and grow in a fast-paced environment",
    "A design portfolio with academic or personal projects",
  ],
  gaps: [
    "No professional design experience yet",
    "Limited exposure to production design systems",
  ],
  responsibilities: [
    "Assist the design team with wireframes, mockups, and prototypes",
    "Participate in design critiques and team brainstorming sessions",
    "Learn and apply the company's design system guidelines",
    "Support user research sessions and note-taking",
  ],
  benefits: [
    "Mentorship: Learn directly from senior product designers throughout the internship.",
    "Real Projects: Contribute to live product work, not just simulations.",
    "Flexible Schedule: Hybrid or remote options depending on the role.",
  ],
};

function getRoleContent(title: string): RoleContent {
  const t = title.toLowerCase();
  if (t.includes("intern")) return internContent;
  if (t.includes("lead")) return leadContent;
  if (t.includes("junior")) return juniorContent;
  if (t.includes("researcher")) return researcherContent;
  return seniorContent;
}

function getMatchPercentage(job: Job): number {
  const base = 65 + (job.id * 7) % 30; 
  return Math.min(base, 96);
}

function buildTags(job: Job): string[] {
  const isIntern = job.title.toLowerCase().includes("intern");
  return [job.workType, isIntern ? "Internship" : "Full time", "Cairo"];
}

function buildJobDetail(job: Job): JobDetail {
  const profile = companyProfiles[job.company];
  const role = getRoleContent(job.title);

  return {
    ...job,
    tags: buildTags(job),
    qualificationMatch: {
      percentage: getMatchPercentage(job),
      strengths: role.strengths,
      gaps: role.gaps,
    },
    hiringContact: profile
      ? {
          name: profile.hiringContactName,
          role: "Hiring Team",
            avatar: "",
        }
      : undefined,
    companyAbout: profile?.about ?? `${job.company} is a global company operating across multiple industries.`,
    roleAbout: role.roleAbout(job.title),
    responsibilities: role.responsibilities,
    benefits: role.benefits,
  };
}

const allBaseJobs: Job[] = [...matchingJobs, ...recommendedJobs, ...internships];

export const jobDetails: Record<number, JobDetail> = allBaseJobs.reduce(
  (acc, job) => {
    acc[job.id] = buildJobDetail(job);
    return acc;
  },
  {} as Record<number, JobDetail>
);