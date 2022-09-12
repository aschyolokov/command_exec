import { IStreamLogger } from './../../core/handlers/stream_logger.interface';

export class ConsoleLogger implements IStreamLogger {
  private static _instance: ConsoleLogger;

  constructor() {
    if (typeof ConsoleLogger._instance === 'object') {
      return ConsoleLogger._instance;
    }

    ConsoleLogger._instance = this;

    return this;
  }

  log(...args: any[]) {
    console.log(...args);
  }

  error(...args: any[]) {
    console.log(...args);
  }

  end() {
    console.log('Готово');
  }
}
