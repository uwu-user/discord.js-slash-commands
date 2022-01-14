
module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isCommand()) return;
    if (!interaction.inGuild()) return;
    if (interaction.deferred) return;
    if (!interaction.client.commands.has(interaction.commandName)) return;
    try {
      const { commandName } = interaction;
      if (!interaction.client.commands.has(commandName)) return;
      await interaction.client.commands
        .get(commandName)
        .execute(interaction.client, interaction);
    } catch (error) {
      await interaction.reply({ content: error.message, ephemeral: true });
    }
  },
};
