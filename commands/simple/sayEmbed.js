const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const data = new SlashCommandBuilder()
  .setName("sayembed")
  .setDescription("say Embed cmd :3")
  .addStringOption(option =>
    option
      .setName("text")
      .setDescription("write something =3")
      .setRequired(true)
  );

module.exports = {
  global: false,
  data: data,
  async execute(client, interaction) {
    let msg = interaction.options._hoistedOptions[0].value;
    let Embed = new MessageEmbed().setDescription(msg);
    await interaction.reply({ embeds: [Embed], ephemeral: true });
  }
};
