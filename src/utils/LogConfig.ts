import { logger } from 'react-native-logs';

export const log = logger.createLogger({
  levels: { info: 0, warn: 1, error: 2 }, // Định nghĩa các mức độ log
  transportOptions: {
    colors: {
      info: 'blue',
      warn: 'yellow',
      error: 'red',
    }
  }
});