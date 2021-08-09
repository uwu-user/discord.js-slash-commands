const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "sayembed",
  description: "Say Embed Command :3",
  global: false,
  options: [
    {
      name: "text",
      description: "write something =3",
      type: 3,
      required: true
    }
  ],
  async execute(client, interaction, args) {
    let msg = args._hoistedOptions[0].value;
    let Embed = new MessageEmbed()
    .setDescription(msg);
    await interaction.reply({ embeds: [Embed] });
    
  }
};
