import { useContext } from "react";

import { LearningPlayerContext } from "../Context/LearningPlayerContext";

const useLearningPlayerContext =
  () => {
    const context =
      useContext(
        LearningPlayerContext
      );

    if (!context) {
      throw new Error(
        "useLearningPlayerContext must be used inside LearningPlayerContext.Provider"
      );
    }

    return context;
  };

export default useLearningPlayerContext;