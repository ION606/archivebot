//Server stuff
const express = require('express');
const app = express();
app.get("/", (req, res) => {
    res.send("Hello World, it's me, Archive Bot!")
})

app.listen(3000, () => {
    console.log('Archive Bot online!');
})

//Server stuff end


const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');
const token = process.env['token'];
const inst = process.env['instagram'];
const twit = process.env['twitter'];
const redd = process.env['reddit'];
const you = process.env['youtube'];
const oth = process.env['other'];
const nsfw = process.env['nsfw'];

const list = [inst, twit, redd, you, oth, nsfw]

const bot = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
});

const prefix = '/';
const emojiPrefix = "<:archive:";

const fs = require('fs');

// client.commands = new Discord.Collection();
// client.commNames = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

let i = 0;
const commands = bot.application.commands;
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    commands.create({
      name: command.name,
      description: command.description,
      options: command.options,
      dm_permission: false,
    });
    i ++;
}

client.on('interactionCreate', async interaction => {
    const { commandName } = interaction;

    if (commandName == 'archive') {
      const arch = require('./commands/archive.js');
      arch.execute(interaction, list, bot, Discord);
    } else {
      interaction.reply("Invalid Command!");
    }
});
// client.on('ready', () => {
//     console.log('Archive Bot online!');
// });


/*
client.on('messageCreate', (message) => {
    
    //COMMAND AREA
    //Check if the prefix exists
  let args;
  let command;
    if (message.content.startsWith(emojiPrefix)) {
      args = message.content.slice(30).split(' ');
      // args.splice(args.indexOf(''), 1);
      command = 'archive';
    } else if (!message.content.startsWith(prefix) || message.author.bot) return;
  else {
    args = message.content.slice(prefix.length).split(' ');
    command = args.shift().toLowerCase();
  }
    
    //Check if the user has sufficient permission
    //Performes the command
    switch(command) {
        case 'test': client.commands.get('Hello World').execute(message, args);
        break;

        case 'archive': client.commands.get('archive').execute(message, args, list, client, Discord);
        break;

        default: message.channel.send("'" + message.content + "' is not a command!");
    }
})
*/


//Last Line
bot.login(token);