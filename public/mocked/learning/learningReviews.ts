export type LearningReview = {
  courseId: number;
  name: string;
  job: string;
  image: string;
  rating: number;
  comment: string;
};

export const learningReviews: LearningReview[] = [
  {
    courseId: 1,
    name: "Ahmed Hassan",
    job: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=31",
    rating: 5,
    comment:
      "This course completely changed the way I write Python. The explanations are simple, the projects are practical, and I finally feel confident building real applications.",
  },

  {
    courseId: 2,
    name: "Mariam Ali",
    job: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    comment:
      "One of the best Full Stack courses I've taken. Every section builds on the previous one, and the MERN project at the end was exactly what I needed for my portfolio.",
  },

  {
    courseId: 3,
    name: "Omar Mohamed",
    job: "React Developer",
    image: "https://i.pravatar.cc/150?img=33",
    rating: 5,
    comment:
      "Hooks, Context API and React Router were explained in a very practical way. I now understand how to structure large React applications professionally.",
  },

  {
    courseId: 4,
    name: "Sara Ibrahim",
    job: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=34",
    rating: 4,
    comment:
      "Excellent JavaScript course. Async programming and modern ES6 concepts became much easier after following the examples.",
  },

  {
    courseId: 5,
    name: "Mohamed Adel",
    job: "Backend Developer",
    image: "https://i.pravatar.cc/150?img=35",
    rating: 5,
    comment:
      "The API development section was outstanding. Authentication, Express and MongoDB were explained clearly with production-ready examples.",
  },

  {
    courseId: 6,
    name: "Nour Ahmed",
    job: "Data Analyst",
    image: "https://i.pravatar.cc/150?img=36",
    rating: 5,
    comment:
      "SQL became my favorite tool after this course. The real-world queries and database exercises were extremely useful.",
  },

  {
    courseId: 7,
    name: "Youssef Samir",
    job: "Business Analyst",
    image: "https://i.pravatar.cc/150?img=37",
    rating: 5,
    comment:
      "Creating dashboards with Power BI is much easier now. I especially loved the DAX and visualization sections.",
  },

  {
    courseId: 8,
    name: "Menna Ashraf",
    job: "AI Engineer",
    image: "https://i.pravatar.cc/150?img=38",
    rating: 5,
    comment:
      "Machine Learning concepts were simplified without losing depth. The projects helped me understand the algorithms much better.",
  },

  {
    courseId: 9,
    name: "Ali Mahmoud",
    job: "UI Designer",
    image: "https://i.pravatar.cc/150?img=39",
    rating: 5,
    comment:
      "Figma, Auto Layout and prototyping were explained perfectly. I now design interfaces much faster than before.",
  },

  {
    courseId: 10,
    name: "Habiba Mohamed",
    job: "Flutter Developer",
    image: "https://i.pravatar.cc/150?img=40",
    rating: 5,
    comment:
      "Amazing Flutter course. Building responsive mobile apps and integrating APIs became straightforward after completing it.",
  },

  {
    courseId: 11,
    name: "Karim Mostafa",
    job: "Cyber Security Student",
    image: "https://i.pravatar.cc/150?img=41",
    rating: 5,
    comment:
      "Great introduction to Cyber Security. The networking and penetration testing basics were explained in a beginner-friendly way.",
  },
];