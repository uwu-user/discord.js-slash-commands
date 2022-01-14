const { Discord, Client, Intents, Collection } = require("discord.js");

const fs = require("fs");

module.exports = function loadEvents(client) {
  const ascii = require("ascii-table");
  const table = new ascii("EventHandler.js");

  table.setHeading("Event Name", "status");

  let Eventnum = 0;
  try {
    const eventFiles = fs
      .readdirSync("./events")
      .filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
      const event = require(`../events/${file}`);
      if (!eventFiles == "") {
        if (event.once) {
          ++Eventnum;
          table.addRow(event.name, `[ ✔ ]`);
          client.once(event.name, (...args) => event.execute(...args, client));
        } else {
          ++Eventnum;
          table.addRow(event.name, `[ ✔ ]`);
          client.on(event.name, (...args) => event.execute(...args, client));
        }
      }
    }

    if (eventFiles == "") {
      table.addRow(`[ ✖ ] - No Events`);
    }

    if (!eventFiles == "") {
      let msg1 = "\n" + table.toString();
      let msg2 = "\n「 Events 」|「 " + Eventnum + " 」";
      console.log(msg1 + msg2);
    }
  } catch (error) {
    console.error(error.message);
  }
};
