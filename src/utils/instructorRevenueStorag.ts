export interface InstructorRevenue {
  instructorEmail: string;
  totalRevenue: number;
}


const KEY = "instructor.revenue";


export const getInstructorRevenue = (
  email: string
) => {

  const data = JSON.parse(
    localStorage.getItem(KEY) || "[]"
  );


  return (
    data.find(
      (item: InstructorRevenue) =>
        item.instructorEmail === email
    )
    ??
    {
      instructorEmail: email,
      totalRevenue: 0,
    }
  );
};



export const addInstructorRevenue = (
  email: string,
  amount: number
) => {

  const revenues =
    JSON.parse(
      localStorage.getItem(KEY) || "[]"
    );


  const existing =
    revenues.find(
      (item: InstructorRevenue) =>
        item.instructorEmail === email
    );


  if (existing) {

    existing.totalRevenue += amount;

  } else {

    revenues.push({
      instructorEmail: email,
      totalRevenue: amount,
    });

  }


  localStorage.setItem(
    KEY,
    JSON.stringify(revenues)
  );
};