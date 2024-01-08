import pino, { type Logger } from 'pino'

export class LoggerService {
  static logger: Logger<never> = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  })
}
