import { Input, Markup } from 'telegraf'
import { Command } from './command.class'
import { LoggerService } from '../logger/logger.service'

export class StartCommand extends Command {
  handle (): void {
    this.bot.command('hi', (ctx) => {
      LoggerService.logger.info(ctx.session)
      ctx.reply('Hi,do you like this ?', Markup.inlineKeyboard([
        Markup.button.callback('Like', 'course_like'),
        Markup.button.callback('Dislike', 'course_dislike')
      ]))
    })

    this.bot.action('course_like', (ctx) => {
      ctx.session.courseLike = true
      ctx.replyWithPhoto(Input.fromLocalFile('./src/assets/123.png'), { caption: 'asasa' })
    })

    this.bot.action('course_dislike', (ctx) => {
      ctx.session.courseLike = false
      ctx.replyWithMarkdownV2('Ow')
    })
  }
}
