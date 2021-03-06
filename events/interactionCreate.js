
module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isCommand()) return;
    if (!interaction.client.commands.has(interaction.commandName)) return;
    if (!interaction.inGuild()) {
      await interaction.reply({ content: "Error: This is not allowed in dm", ephemeral: true });
    }
    try {
      const { commandName } = interaction;
      if (!interaction.client.commands.has(commandName)) return;
      await interaction.client.commands
        .get(commandName)
        .execute(interaction.client, interaction);
    } catch (error) {
      await interaction.reply({ content: error.message || "Error", ephemeral: true });
    }
  },
};
