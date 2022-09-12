import { ConsoleLogger } from './out/console_logger/console_logger';
import { FfmegExecutor } from './commands/ffmpeg/ffmpeg.executor';
import { PromptService } from './core/prompt/prompt.service';

export class App {
  async run() {
    new FfmegExecutor(new ConsoleLogger()).execute();
  }
}

const app = new App();

app.run();
