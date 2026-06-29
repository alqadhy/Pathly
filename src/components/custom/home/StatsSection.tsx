interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "50,000+", label: "Graduates Onboarded" },
  { value: "2,400+",  label: "Job Matches Made" },
  { value: "94%",     label: "Report Improved Profile ATS Score" },
  { value: "180+",    label: "Partner Companies" },
];

export default function StatsSection() {
  return (
    <section className="w-full py-20 px-4 bg-primary-darker">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="text-center px-6 py-4">
              <p className="font-bold text-white tracking-tight text-2xl md:text-3xl lg:text-4xl">
                {stat.value}
              </p>
              <p className="text-white/60 mt-2 font-medium text-sm md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}