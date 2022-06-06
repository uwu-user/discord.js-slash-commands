const { Serverid, TOKEN } = require("./info.js");

const { Client, Intents, GatewayIntentBits, Partials, Collection } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  /*intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.GuildPresences,
  ],*/
  // ws: { properties: { $browser: "Discord ios" }},
});

const fs = require("fs");

//-------------------------------------------------------------
// login ?
//-------------------------------------------------------------

client.login(TOKEN).catch(function (error) {
  console.log(error.message);
});

//-------------------------------------------------------------
// Bot Ready (add commands) :)
//-------------------------------------------------------------

const ascii = require("ascii-table");
const table = new ascii("Handler's.js");

let Handlersnum = 0;

client.on("ready", async () => {
  try {
    // handler's
    const handlersFiles = fs
      .readdirSync("./handlers")
      .filter((file) => file.endsWith(".js"));

    for (const file of handlersFiles) {
      const handlers = require(`./handlers/${file}`);
      if (!handlersFiles == "") {
        ++Handlersnum;
        table.addRow(`[ ✔ ] - ${file}`);
      }
    }
    if (handlersFiles == "") {
      table.addRow(`[ ✖ ] - NaN-404`);
    }

    // nodejs
    const nodejs = `Node.js: [ ${process.version} ]`;
    // npmjs
    let npmjsv;

    try {
      npmjsv = require("./package.json").engines.npm;
    } catch (error) {
      npmjsv = undefined;
    }

    const npmjs = `npm.js: [ v${npmjsv} ]`;
    // djs
    const { version: discordjsVersion } = require("discord.js");
    const djs = `Discord.js: [ v${discordjsVersion} ]`;

    // time
    var currentTime = new Date(),
      hours12 = currentTime.getHours() + 3,
      hours24 = currentTime.getHours() + 3,
      minutes = currentTime.getMinutes(),
      seconds = currentTime.getSeconds(),
      years = currentTime.getFullYear(),
      month = currentTime.getMonth() + 1,
      day = currentTime.getDate(),
      week = currentTime.getDay(),
      Suffix = "AM";

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (hours12 >= 12) {
      Suffix = "PM";
      hours12 = hours12 - 12;
    }

    if (handlersFiles) {
      let Time12 = `「 ${years}/${month}/${day} 」|「 ${hours12}:${minutes}:${seconds} ${Suffix} 」`;
      let Time24 = `「 ${years}/${month}/${day} 」|「 ${hours24}:${minutes}:${seconds} 」`;
      let msg1 = `\n\n\n[✔ | Loading...]\n\n${nodejs}\n${npmjs}\n${djs}\n\n${Time12}\n${Time24}\n`;
      let msg2 = table.toString();
      let msg3 = "\n「 Handler's 」|「 " + Handlersnum + " 」";
      console.log(msg1 + msg2 + msg3);
    }
    for (const file of handlersFiles) {
      require(`./handlers/${file}`)(client);
    }
  } catch (error) {
    console.error(error.message);
  }
});
