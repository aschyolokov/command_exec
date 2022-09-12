export class FfmegBuilder {
  private _inputPath: string;

  private _options: Map<string, string> = new Map();

  setInputPath(inputPath: string): this {
    this._inputPath = inputPath;
    return this;
  }

  setCodec(codec = 'libx264'): this {
    this._options.set('-c:v', codec);
    return this;
  }

  setVideoSize(width = 1920, height = 1080): this {
    this._options.set('-s', `${width}x${height}`);
    return this;
  }

  setOutputPath(outputPath = '/video.mp4') {
    if (!this._inputPath) {
      throw new Error('Не задан путь до файла!');
    }

    const args = ['-i', this._inputPath];

    this._options.forEach((value, key) => args.push(key, value));

    args.push(outputPath);

    return args;
  }
}
