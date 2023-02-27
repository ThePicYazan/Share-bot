const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const { Client } = require('discord.js');
const client = new Client({ partials: ["CHANNEL"], intents: 32767 });
const db = require('pro.db');
const ms = require('ms');

client.on('ready',async () => {
  await console.log(client.user.tag);
})

//share By YAZAN#1411 ID 487190339543629824
//Ra3d's Studio : https://discord.gg/ra3d / https://discord.gg/hBY5NAe3C9

client.on('messageCreate',async message => {
  if(!message.guild || message.author.bot) return;
  if(message.content === 'ping') {
    await message.reply({content : 'pong.'});
  }
})

client.on('messageCreate',async (message) => {
    if (message.author.bot) return;
    if (message.channel.type == 'DM') {
      
    let share = await client.channels.cache.get('channel id');//شات ل ينشر فيه السيرفر
    let args = await message.content.split(' ');
    let cool = await db.get(`cool_${message.author.id}`);

    if(!share) return console.log('Channel Share Not Working..');
    if (cool > Date.now()) {
        return await message.author.send({content : 'Wait 6 hours to try to use the command'}).catch(async (err) => {
            await message.channel.send({content : `${message.author} Wait 6 hours to try to use the command`})
        }).catch(err => undefined);
    }
    let time = await Date.now() + ms("6h");//الكول داون تقدر تعدل بكيفك
    try {
    await client.fetchInvite(args[0]).then(async (invite) => {
        await db.set(`cool_${message.author.id}`,time);
        await share.send({content: `${invite}\n\`By\` ${message.author}`});
        await message.channel.send({content : `> **The link has been posted ${share}**`}).catch(async (err) => {
            await message.channel.send({content : `> **${message.author} The link has been posted ${share}**`});
        })
    }).catch(async (err) => {
        await message.channel.send({content: '> **:x: | Please insert valid url discord invite !**'});
    })
   } catch (err) {
       return;
    }}
})

process.on("unhandledRejection",async (error) => {
  return await console.log(`Erorr : ${error}`);
});

client.login(process.env.token).catch(err => console.log('Token Not invite..'));