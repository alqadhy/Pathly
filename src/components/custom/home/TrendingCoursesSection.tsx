import { Button } from "../../ui/button";
import { ArrowRight } from "lucide-react";
import type { Course } from "../../../types/courses.types";

import { courses } from "../../../constants/index";
import CourseCard from "../CourseCard";

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
          {courses.map((course: Course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              image={course.image}
              title={course.title}
              instructor={course.instructor}
              rating={course.rating}
              reviews={course.reviews}
              duration={course.duration}
              level={course.level}
              hasCertificate={course.hasCertificate}
              price={course.price}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Button
            variant="outline"
            className="border-primary cursor-pointer text-primary hover:bg-primary-light gap-1.5"
          >
            View All <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}