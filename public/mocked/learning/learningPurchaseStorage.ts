const STORAGE_KEY = "learningPurchases";

export type LearningPurchase = {
  userEmail: string;
  courseId: number;
  purchaseDate: string;
  progress: number;
};

export const getLearningPurchases =
  (): LearningPurchase[] => {
    const data =
      localStorage.getItem(
        STORAGE_KEY
      );

    return data
      ? JSON.parse(data)
      : [];
  };

export const saveLearningPurchase = (
  purchase: LearningPurchase
) => {
  const purchases =
    getLearningPurchases();

  const exists =
    purchases.some(
      (item) =>
        item.userEmail ===
          purchase.userEmail &&
        item.courseId ===
          purchase.courseId
    );

  if (exists) {
    return false;
  }

  purchases.push(purchase);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(purchases)
  );

  return true;
};

export const hasPurchasedCourse =
  (
    email: string,
    courseId: number
  ) => {
    return getLearningPurchases().some(
      (item) =>
        item.userEmail ===
          email &&
        item.courseId ===
          courseId
    );
  };

export const getUserPurchases = (
  email: string
) => {
  return getLearningPurchases().filter(
    (item) =>
      item.userEmail === email
  );
};