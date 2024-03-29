import { Telegraf } from 'telegraf'
import { type IConfigService } from './src/config/config.interface'
import { ConfigService } from './src/config/config.service'
import { type IBotContext } from './src/context/context.interface'
import { type Command } from './src/commands/command.class'
import { StartCommand } from './src/commands/start.command'
import LocalSession from 'telegraf-session-local'

class Bot {
  bot: Telegraf<IBotContext>
  commands: Command[] = []

  constructor (private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'))
    this.bot.use(new LocalSession({ database: 'sessions.json' }).middleware())
  }

  init (): void {
    this.commands = [new StartCommand(this.bot)]
    for (const command of this.commands) {
      command.handle()
    }
    this.bot.launch()
  }
}

const bot = new Bot(new ConfigService())
bot.init()
