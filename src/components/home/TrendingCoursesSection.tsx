import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Star, Clock, GraduationCap, ShoppingCart, ArrowRight } from "lucide-react";
import webDevImg     from "@/assets/imgs/coursesSection1.png";
import pythonImg     from "@/assets/imgs/CoursesSection2.png";
import reactImg      from "@/assets/imgs/CoursesSection3.png";
import javascriptImg from "@/assets/imgs/CoursesSection4.png";

const courseImages = {
  webDev:     webDevImg,
  python:     pythonImg,
  react:      reactImg,
  javascript: javascriptImg,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  reviews: string;
  duration: string;
  level: string;
  hasCertificate: boolean;
  price: number;
  image: string;
}

const courses: Course[] = [
  { 
    id: 1, 
    title: "Web Development Bootcamp", 
    instructor: "Mohamad karim",
    rating: 4, 
    reviews: "3.2k", 
    duration: "12 weeks", 
    level: "Beginner", 
    hasCertificate: true,
    price: 1500, 
    image: courseImages.webDev 
  },
  { 
    id: 2, 
    title: "Data Science & AI Mastery", 
    instructor: "Sara Ahmed",
    rating: 4.8, 
    reviews: "1.8k", 
    duration: "16 weeks", 
    level: "Intermediate", 
    hasCertificate: true,
    price: 1499, 
    image: courseImages.python 
  },
  { 
    id: 3, 
    title: "Advanced React.js Strategies", 
    instructor: "John Doe",
    rating: 4.7, 
    reviews: "950", 
    duration: "8 weeks", 
    level: "Advanced", 
    hasCertificate: false,
    price: 1299, 
    image: courseImages.react 
  },
  { 
    id: 4, 
    title: "Javascript Mastery", 
    instructor: "Dr. Emily",
    rating: 5, 
    reviews: "3.1k", 
    duration: "6 weeks", 
    level: "All Levels", 
    hasCertificate: true,
    price: 2499, 
    image: courseImages.javascript 
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={
            i <= Math.floor(rating)
              ? "fill-warning text-warning"
              : i - 0.5 <= rating
              ? "fill-warning/50 text-warning"
              : "fill-light-active text-light-active"
          }
        />
      ))}
    </div>
  );
}

export default function TrendingCoursesSection() {
  return (
    <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-bold tracking-widest uppercase text-primary mb-2">
              Trending Courses
            </p>
            <h2 className="font-bold text-darker text-3xl md:text-4xl">
              Curated paths for modern careers
            </h2>
          </div>
            <Button
            variant="ghost"
            className="text-primary cursor-pointer font-semibold hover:text-primary-hover hover:bg-primary-light gap-1.5 hidden md:flex"
          >
            View All <ArrowRight size={16} />
          </Button>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="group border   border-light-active rounded-2xl overflow-hidden shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-300 bg-card flex flex-col p-0  "
            >
          
              <div className="relative h-44 w-full overflow-hidden bg-[#0B182F] rounded-t-2xl">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

            
              <CardContent className=" flex flex-col grow p-5">
                
              
                <h3 className="font-bold text-darker leading-snug mb-2 text-body-md">
                  {course.title}
                </h3>

                <div className="flex items-center gap-2 text-normal text-sm mb-2">
                  <User size={16} className="text-info" />
                  <span>{course.instructor}</span>
                </div>

             
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={course.rating} />
                  <span className="text-sm font-semibold text-darker">
                    {course.rating}
                  </span>
                  <span className="text-xs text-normal">
                    ({course.reviews} Students)
                  </span>
                </div>

             
                <div className="flex items-center gap-4 text-normal text-sm mb-2">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-normal" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-light-active"></div>
                  <span>{course.level}</span>
                </div>

              
                <div className="flex items-center gap-2 text-normal text-sm mb-4">
                  <GraduationCap size={14} className="text-normal" />
                  <span>{course.hasCertificate ? "Certificate" : "No Certificate"}</span>
                </div>

                <div className="flex items-center mt-auto">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary-hover cursor-pointer text-white  font-medium h-10"
                  >
                    View Details
                  </Button>
                  <div className="h-10 px-3 flex items-center justify-center text-primary rounded-r-lg bg-white font-bold text-sm border-l border-primary-light">
                    {course.price} EGP
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

      
        <div className="mt-8 flex justify-center md:hidden">
          <Button 
            variant="outline" 
            className="border-primary cursor-pointer text-primary hover:bg-primary-light gap-1.5"
          >
            View All <ArrowRight size={16}  />
          </Button>
        </div>
      </div>
    </section>
  );
}