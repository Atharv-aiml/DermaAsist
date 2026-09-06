import { SkinAssessmentModel } from './ai.interface';
import { MockAIService } from './mock.service';
import { config } from '../../config';

export function createAIService(): SkinAssessmentModel {
  const provider = config.aiProvider;
  switch (provider) {
    case 'mock':
      return new MockAIService();
    case 'fastapi':
      throw new Error(`AI provider '${provider}' is not yet implemented. Configure AI_PROVIDER=mock for development.`);
    case 'huggingface':
      throw new Error(`AI provider '${provider}' is not yet implemented.`);
    case 'external_api':
      throw new Error(`AI provider '${provider}' is not yet implemented.`);
    case 'custom_model':
      throw new Error(`AI provider '${provider}' is not yet implemented.`);
    default:
      console.warn(`Unknown AI provider '${provider}', falling back to mock`);
      return new MockAIService();
  }
}
