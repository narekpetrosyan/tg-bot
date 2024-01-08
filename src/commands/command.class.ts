import { type Telegraf } from 'telegraf'
import { type IBotContext } from '../context/context.interface'

export abstract class Command {
  constructor (public bot: Telegraf<IBotContext>) {}

  abstract handle (): void
}
