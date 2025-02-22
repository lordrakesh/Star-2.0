import { MessageType, Mimetype } from '@adiwajshing/baileys'
import { Sticker } from 'wa-sticker-formatter'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'sticker',
            description: 'Converts images/videos into stickers',
            category: 'utils',
            usage: `${client.config.prefix}sticker [(as caption | tag)[video | image]]`,
            dm: false,
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void> => {
        let buffer
        if (M.quoted?.message?.message?.imageMessage || M.quoted?.message?.message?.videoMessage)
            buffer = await this.client.downloadMediaMessage(M.quoted.message)
        if (M.WAMessage.message?.imageMessage || M.WAMessage.message?.videoMessage)
            buffer = await this.client.downloadMediaMessage(M.WAMessage)
        if (!buffer) return void M.reply(`You didn't provide any Image/Video to convert`)
        parsedArgs.flags.forEach((flag) => (parsedArgs.joined = parsedArgs.joined.replace(flag, '')))
        const pack = parsedArgs.joined.split('|')
        
        
      const crop:boolean = parsedArgs.flags.includes('--stretch') || parsedArgs.flags.includes('--s')
        const sticker = new Sticker(buffer, {
            pack: pack[1] || '𝐵𝑒𝑙𝑜𝑛𝑔𝑠 𝑡𝑜',
            author: pack[2] || '𝐿𝑜𝑟𝑑 𝑅𝑎𝑘𝑒𝑠ℎ',
            crop: crop
        })
        await sticker.build()
        await M.reply(await sticker.get(), MessageType.sticker, Mimetype.webp)
    }
}
