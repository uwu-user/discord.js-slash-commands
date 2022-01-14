
const { Serverid, TOKEN } = require("../info.js");

const { Discord, Client, Intents, Collection } = require("discord.js");

const fs = require("fs");

module.exports = async function loadCommands(client) {
  const { REST } = require("@discordjs/rest");
  const { Routes } = require("discord-api-types/v9");
  const rest = new REST({ version: "9" }).setToken(TOKEN);

  const ascii = require("ascii-table");
  const table = new ascii("CommandHandler.js");
  
  table.setHeading("Command", "status", "Area");

  const Commands = [];
  const commands = [];
  let cmdnum = 0;

  client.commands = new Collection();

   try {
      const commandFiles = fs
        .readdirSync("./commands")
        .map((folder) =>
          fs
            .readdirSync(`./commands/${folder}`)
            .filter((file) => file.endsWith(".js"))
            .map((file) => `../commands/${folder}/${file}`)
        )
        .flat();
    
      if (!commandFiles == "") {
      for (const file of commandFiles) {
        const command = require(`${file}`);
        if (Object.keys(command).length === 0) continue;
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);

        await rest.put(
          Routes.applicationGuildCommands(client.user.id, Serverid),
          {
            body: commands,
          }
        );
        if (command.global == true) {
          await rest.put(Routes.applicationGuildCommands(client.user.id), {
            body: commands,
          });
        }

        if (command.data.name) {
          ++cmdnum;
          table.addRow(
            command.data.name,
            `[ ✔ ]`,
            `[${command.global ? "global" : "guild"}]`
          );
        } else {
          table.addRow(file, `[ ✖ ]`, `[Error]`);
        }
      }
    }
     if (commandFiles == "") {
       table.addRow("No Cmds", `[ ✖ ]`, `[Error]`);
     }
     
      if (!commandFiles == "") {
        let msg1 = "\n" + table.toString();
        let msg2 =
          "\n「 Commands 」|「 " +
          cmdnum +
          "/" +
          client.commands.size +
          " 」";
        console.log(msg1 + msg2);
      }
    } catch (error) {
      console.error(error.message);
    }
};
