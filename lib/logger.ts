class Logger {
  private isDev = process.env.NODE_ENV === "development";

  log(message: string, ...args: any[]) {
    if (this.isDev) {
      console.log(`🔧 ${message}`, ...args);
    }
  }

  error(message: string, ...args: any[]) {
    if (this.isDev) {
      console.error(`❌ ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]) {
    if (this.isDev) {
      console.warn(`⚠️ ${message}`, ...args);
    }
  }
}

export const logger = new Logger();
