const { Serverid, TOKEN } = require("./info.js");
const { Discord, Client, APIMessage, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const fs = require("fs");
const ascii = require("ascii-table");
const table = new ascii("slash Commands");
const Commands = [];
table.setHeading("Command", "status", "Area");

//-------------------------------------------------------------
// login
//-------------------------------------------------------------

client.login(TOKEN).catch(function(error) {
  console.log(error.message);
});

//-------------------------------------------------------------
// Delete commands (automatic) :)
//-------------------------------------------------------------

// It works without problems. delete /* */ if you want to delete all commands from your server and Global...

/*
client.on("ready", async () => {
  let Globalcmds = await client.api.applications(client.user.id).commands.get();
  let Guildcmds = await client.api
    .applications(client.user.id)
    .guilds(Serverid)
    .commands.get();
  Globalcmds.forEach(cmd => {
    client.api
      .applications(client.user.id)
      .commands(cmd.id)
      .delete();
    console.log(
      "Deleted Global command { name: " + cmd.name + ", ID: " + cmd.id + " }"
    );
  });
  Guildcmds.forEach(cmds => {
    client.api
      .applications(client.user.id)
      .guilds(Serverid)
      .commands(cmds.id)
      .delete();
    console.log(
      "Deleted Guild command { name: " + cmds.name + ", ID: " + cmds.id + " }"
    );
  });
});
*/

//-------------------------------------------------------------
// Bot Ready (add commands) :)
//-------------------------------------------------------------

client.on("ready", async () => {
  const commandFiles = fs
    .readdirSync("./commands")
    .filter(file => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    Commands.push(command);
    client.api
      .applications(client.user.id)
      .guilds(Serverid)
      .commands.post({
        data: {
          name: command.name,
          description: command.description,
          options: command.options
        }
      });
    if (command.global == true) {
      client.api.applications(client.user.id).commands.post({
        data: {
          name: command.name,
          description: command.description,
          options: command.options
        }
      });
    }
    if (command.name) {
      table.addRow(file, `[ ✔ ]`, `[${command.global ? "global" : "guild"}]`);
    } else {
      table.addRow(file, `[ ✖ ]`, `[Error]`);
    }
  }
  // nodejs
  const nodejs = `Node.js: [ ${process.version} ]`;
  // npmjs
  const npmjsv = require("./package.json").engines.npm || "Error";
  const npmjs = `npm.js: [ ${npmjsv} ]`;
  // djs
  const { version: discordjsVersion } = require("discord.js");
  const djs = `Discord.js: [ ${discordjsVersion} ]`;
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

  if (commandFiles == "")
    return console.log(
      "✖ | There are no commands added!\nwhy not add one or more =3?"
    );
  if (!commandFiles == "") {
    let Time12 = `「 ${years}/${month}/${day} 」|「 ${hours12}:${minutes}:${seconds} ${Suffix} 」`;
    let Time24 = `「 ${years}/${month}/${day} 」|「 ${hours24}:${minutes}:${seconds} 」`;
    console.log(
      `\n\n\n[✔ | Loading...]\n\n${nodejs}\n${npmjs}\n${djs}\n\n${Time12}\n${Time24}\n` +
        table.toString()
    );
  }
});

//-------------------------------------------------------------
// Interaction
//-------------------------------------------------------------

client.on("interactionCreate", async interaction => {
  try {
    const file = Commands.find(
      cmd => cmd.name.toLowerCase() === interaction.commandName.toLowerCase()
    );
    if (file) file.execute(client, interaction, interaction.options);
    //                                   client  interaction    args
  } catch (error) {
    interaction.reply({ content: error.message, ephemeral: true });
  }
});
