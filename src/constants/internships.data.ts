import type { Internship } from "../types/jobs.types";

import philipsLogo from "@/assets/imgs/companies/phillips.png";
import hpLogo      from "@/assets/imgs/companies/hp.png";
import samsungLogo from "@/assets/imgs/companies/samsung.png";
import nokiaLogo   from "@/assets/imgs/companies/nokia.png";
import sonyLogo    from "@/assets/imgs/companies/sony.png";
import abbLogo     from "@/assets/imgs/companies/abb.png";

const companyLogos = {
  philips: philipsLogo,
  hp: hpLogo,
  samsung: samsungLogo,
  nokia: nokiaLogo,
  sony: sonyLogo,
  abb: abbLogo,
};

export const internships: Internship[] = [
  {
    id: 101,
    title: "UX/UI Design Intern",
    company: "Philips",
    companyLogo: companyLogos.philips,
    location: "Cairo, Egypt",
    workType: "Hybrid",
    isViewed: true,
    postedAt: "1 week ago",
    duration: "3 Months",
  },
  {
    id: 102,
    title: "UX/UI Design Intern",
    company: "HP",
    companyLogo: companyLogos.hp,
    location: "Cairo, Egypt",
    workType: "Hybrid",
    isViewed: true,
    mutualConnectionsCount: 2,
    postedAt: "1 week ago",
    duration: "3 Months",
  },
  {
    id: 103,
    title: "UX/UI Design Intern",
    company: "Samsung",
    companyLogo: companyLogos.samsung,
    location: "Cairo, Egypt",
    workType: "Hybrid",
    isViewed: false,
    postedAt: "1 week ago",
    duration: "3 Months",
  },
  {
    id: 104,
    title: "UX/UI Design Intern",
    company: "Nokia",
    companyLogo: companyLogos.nokia,
    location: "Cairo, Egypt",
    workType: "Hybrid",
    isViewed: false,
    mutualConnectionsCount: 1,
    postedAt: "1 week ago",
    duration: "3 Months",
  },
  {
    id: 105,
    title: "Product Design Intern",
    company: "Sony",
    companyLogo: companyLogos.sony,
    location: "Cairo, Egypt",
    workType: "Remote",
    isViewed: false,
    postedAt: "4 days ago",
    duration: "6 Months",
  },
  {
    id: 106,
    title: "UI Design Intern",
    company: "ABB",
    companyLogo: companyLogos.abb,
    location: "Cairo, Egypt",
    workType: "Onsite",
    isViewed: true,
    mutualConnectionsCount: 1,
    postedAt: "6 days ago",
    duration: "2 Months",
  },
];