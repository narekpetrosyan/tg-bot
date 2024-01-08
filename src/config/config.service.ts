import { config, type DotenvParseOutput } from 'dotenv'
import { type IConfigService } from './config.interface'

export class ConfigService implements IConfigService {
  private readonly config: DotenvParseOutput

  constructor () {
    const { error, parsed } = config()
    if (error) {
      throw new Error('.env not found')
    }

    if (!parsed) {
      throw new Error('.env file is empty')
    }

    this.config = parsed
  }

  get (key: string): string {
    const res = this.config[key]
    if (!res) {
      throw new Error('Config not found')
    }
    return res
  }
}
