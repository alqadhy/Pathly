import {
  getLocalUsers,
  saveLocalUsers,
} from "../utils/storage.service";

export const initializeUsers =
  async () => {

    const localUsers =
      getLocalUsers();

    // already initialized
    if (
      localUsers.length > 0
    ) {
      return;
    }

    try {

      const response =
        await fetch(
          "/mocked/users.json"
        );

      const users =
        await response.json();

      saveLocalUsers(users);

      console.log(
        "Users initialized successfully"
      );

    } catch (error) {

      console.log(
        "Initialization failed",
        error
      );
    }
  };