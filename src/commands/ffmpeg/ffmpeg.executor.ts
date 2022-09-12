import { FfmegBuilder } from './ffmpeg.builder';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { Executor } from '../../core/executor/executor';
import { FileService } from '../../core/files/file.service';
import { IStreamLogger } from '../../core/handlers/stream_logger.interface';
import { PromptService } from '../../core/prompt/prompt.service';
import { Ffmpeg, FfmpegExecutorType } from './ffmpeg.type';
import { StreamHandler } from '../../core/handlers/stream.handler';

export class FfmegExecutor extends Executor<Ffmpeg> {
  private fileService: FileService = new FileService();
  private promptService: PromptService = new PromptService();

  constructor(logger: IStreamLogger) {
    super(logger);
  }

  protected async prompt(): Promise<Ffmpeg> {
    const width = await this.promptService.input<number>('Ширина', 'number');
    const height = await this.promptService.input<number>('Высота', 'number');
    const codec = await this.promptService.input<string>('Кодек');
    const path = await this.promptService.input<string>('Путь до файла');
    const name = await this.promptService.input<string>('Имя файла');

    return {
      width,
      height,
      codec,
      path,
      name,
    };
  }

  protected build({ width, height, path, name, codec }: Ffmpeg): FfmpegExecutorType {
    const output = this.fileService.getFilePath(path, name, 'mp4');
    const args = (new FfmegBuilder)
      .setCodec(codec)
      .setVideoSize(width, height)
      .setInputPath(path)
      .setOutputPath(output);

    return {
      command: 'ffmpeg',
      args,
      output,
    };
  }

  protected spawn({ output, command, args }: FfmpegExecutorType): ChildProcessWithoutNullStreams {
    this.fileService.deletFileIfExist(output);

    return spawn(command, args);
  }

  protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }
}
