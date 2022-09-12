import { ExecutorType } from '../../core/executor/executor.type';

export type Ffmpeg = {
  width: number;
  height: number;
  codec: string;
  path: string;
  name: string;
};

export type FfmpegExecutorType = {
  output: string;
} & ExecutorType;
