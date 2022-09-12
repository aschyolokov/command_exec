import { PromptInput } from './prompt.types';
import inquirer from 'inquirer';

export class PromptService {
  public async input<T>(message: string, type: PromptInput = 'input') {
    const { result } = await inquirer.prompt<{ result: T }>([
      {
        type,
        message,
        name: 'result',
      },
    ]);

    return result;
  }
}
