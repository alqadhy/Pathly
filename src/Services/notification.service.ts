class NotificationService {
  private permission: NotificationPermission = "default";

  async requestPermission() {
    if (!("Notification" in window)) {
      return false;
    }

    if (Notification.permission === "granted") {
      this.permission = "granted";
      return true;
    }

    if (Notification.permission === "denied") {
      this.permission = "denied";
      return false;
    }

    const permission = await Notification.requestPermission();
    this.permission = permission;

    return permission === "granted";
  }

  show(title: string, options?: NotificationOptions) {
    if (!("Notification" in window)) return;

    if (Notification.permission !== "granted") return;

    new Notification(title, {
      icon: "/favicon.ico",
      ...options,
    });
  }
}

export const notificationService = new NotificationService();