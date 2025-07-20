const { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionsBitField } = require("discord.js");
const fs = require("fs");
const config = require("../config.json");

module.exports = {
  name: "channel",
  description: "Définit le salon de réception des confessions.",
  botOwner: true,
  async executeSlash(client, interaction) {
    const salon = interaction.options.getChannel("salon");
    if (!salon || salon.type !== ChannelType.GuildText) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription("<:990not:1371830095391756379> Merci de fournir un salon textuel valide.")
            .setColor(0xFF0000),
        ],
        ephemeral: true,
      });
    }

    config.channel = salon.id;
    fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`<:990yyes:1371830093252399196> Le salon de confession a été défini sur <#${salon.id}>.`)
          .setColor(0x00FF00),
      ],
      ephemeral: true,
    });
  },

  get data() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addChannelOption(option =>
        option
          .setName("salon")
          .setDescription("Le salon où seront postées les confessions")
          .setRequired(true)
          .addChannelTypes(ChannelType.GuildText)
      );
  },
};
