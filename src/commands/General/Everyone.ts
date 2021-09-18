import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'everyone',
            description: 'Tags all users in group chat',
            aliases: ['all', 'tagall'],
            category: 'general',
            usage: `${client.config.prefix}everyone`,
            adminOnly: true
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        return void (await M.reply(
            `${M.groupMetadata?.subject || 'EVERYONE'}\n*[𝐓𝐀𝐆𝐒 𝐇𝐈𝐃𝐃𝐄𝐍]*`,
            undefined,
            undefined,
            M.groupMetadata?.participants.map((user) => user.jid)
        ).catch((reason: any) => M.reply(`an error occupered, Reason: ${reason}`)))
    }
}
