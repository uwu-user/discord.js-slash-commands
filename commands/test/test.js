const { SlashCommandBuilder } = require("@discordjs/builders");
const data = new SlashCommandBuilder()
  .setName("test")
  .setDescription("text =3");

module.exports = {
  global: false,
  data: data,
  async execute(client, interaction) {
    let msg = "hi =3";
    await interaction.reply({ content: msg, ephemeral: true });
  }
};
