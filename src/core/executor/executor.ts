import { ChildProcessWithoutNullStreams } from 'child_process';
import { IStreamLogger } from '../handlers/stream_logger.interface';
import { ExecutorType } from './executor.type';
export abstract class Executor<T> {
  constructor(
    private _logger: IStreamLogger,
  ) { }

  public async execute() {
    const input = await this.prompt();
    const command = this.build(input);
    const stream = this.spawn(command);

    this.processStream(stream, this._logger);
  }

  protected abstract prompt(): Promise<T>;

  protected abstract build(input: T): ExecutorType;

  protected abstract spawn(command: ExecutorType): ChildProcessWithoutNullStreams;

  protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;
}
