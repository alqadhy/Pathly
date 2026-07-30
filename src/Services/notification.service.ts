class NotificationService {
  private permission: NotificationPermission = "default";

  async requestPermission() {
    if (!("Notification" in window)) return false;

    if (Notification.permission === "granted") {
      this.permission = "granted";
      return true;
    }

    if (Notification.permission === "denied") {
      this.permission = "denied";
      return false;
    }

    const permission =
      await Notification.requestPermission();

    this.permission = permission;

    return permission === "granted";
  }

  show(
    title: string,
    options?: NotificationOptions
  ) {
    if (!("Notification" in window)) return;

    if (Notification.permission !== "granted")
      return;

    new Notification(title, {
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      ...options,
    });
  }

  success(title: string, body: string) {
    this.show(title, {
      body,
      tag: "success",
    });
  }

  reminder(title: string, body: string) {
    this.show(title, {
      body,
      tag: "reminder",
    });
  }

  recommendation(
    title: string,
    body: string
  ) {
    this.show(title, {
      body,
      tag: "recommendation",
    });
  }

  course(title: string, body: string) {
    this.show(title, {
      body,
      tag: "course",
    });
  }

  // Course completed notification
  courseCompleted(
    title: string,
    body: string
  ) {
    this.show(title, {
      body,
      tag: "course-completed",
    });
  }

  job(title: string, body: string) {
    this.show(title, {
      body,
      tag: "job",
    });
  }

  profile(title: string, body: string) {
    this.show(title, {
      body,
      tag: "profile",
    });
  }

  community(
    title: string,
    body: string
  ) {
    this.show(title, {
      body,
      tag: "community",
    });
  }

  achievement(
    title: string,
    body: string
  ) {
    this.show(title, {
      body,
      tag: "achievement",
    });
  }
}

export const notificationService =
  new NotificationService();