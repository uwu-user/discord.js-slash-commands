module.exports = {
  name: "test",
  description: "idk :3",
  global: false,
  options: null,
  async execute(client, interaction, args) {
    let msg = "Hi =3";
    await interaction.reply({ content: msg, ephemeral: true });
  }
};
