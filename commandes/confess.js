const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../config.json");
const encours = new Set();

module.exports = {
  name: "confession",
  description: "Envoyer une confession anonyme.",
  async executeSlash(client, interaction) {
    if (encours.has(interaction.user.id))
      return interaction.reply({ embeds: [new EmbedBuilder().setDescription("<:990not:1371830095391756379> Tu as déjà une confession en cours. Termine la avant d'en commencer une autre.").setColor(0xFFAA00)], ephemeral: true });

    encours.add(interaction.user.id);

    try {
      await interaction.user.send({
        embeds: [
          new EmbedBuilder()
            .setTitle("Confession anonyme")
            .setDescription(`Bonjour ${interaction.user} !\n\nTape ta confession ici en DM, elle sera envoyée anonymement.\nTu as 5 minutes pour répondre.`)
            .setColor(0x0099FF),
        ],
      });
    } catch {
      encours.delete(interaction.user.id);
      return interaction.reply({ embeds: [new EmbedBuilder().setDescription("<:990not:1371830095391756379> Je ne peux pas t'envoyer de DM.").setColor(0xFF0000)], ephemeral: true });
    }

    await interaction.reply({ embeds: [new EmbedBuilder().setDescription("<:990yyes:1371830093252399196> DM envoyé, réponds-y pour envoyer ta confession.").setColor(0x00FF00)], ephemeral: true });

    try {
      const dm = await interaction.user.createDM();
      const collected = await dm.awaitMessages({
        filter: (m) => m.author.id === interaction.user.id,
        max: 1,
        time: 5 * 60 * 1000,
        errors: ["time"],
      });

      const msg = collected.first(), content = msg.content || "", attachment = msg.attachments.first();
      const confession = content || (attachment ? "*Image envoyée.*" : "");

      const msg1 = confession.toLowerCase();
      if (["https://", "http://", "www.", "discord.gg/", "discord.com/", "discordapp.com/", ".gg/", "gg/", ". gg", "https", "http", "://", ".gg", "discord.gg", ". gg/", ";gg", ". gg", ". g g", ".fr", "::", "; g g", "; gg", ".io", ".xyz"].some(x => msg1.includes(x))) {
        await interaction.user.send("<:990not:1371830095391756379> Pas de pub autorisée petit fils de pute !");
        const log = await client.channels.fetch(config.log).catch(() => null);
        if (log) {
          log.send({
            embeds: [
              new EmbedBuilder()
                .setTitle("`🚨`・Publicité détectée")
                .setColor(0xFF0000)
                .setDescription(`\`👤\`・Utilisateur : ${interaction.user} | \`${interaction.user.id}\`\n\n\`📢\`・Message :\n\`\`\`${confession.length > 1900 ? confession.slice(0, 1897) + "..." : confession}\`\`\``)
            ]
          });
        }
        return;
      }

      const channel = await client.channels.fetch(config.channel).catch(() => null);
      if (!channel) return interaction.user.send("<:990not:1371830095391756379> Salon de confession inaccessible.").finally(() => encours.delete(interaction.user.id));

      await channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle("Nouvelle confession anonyme")
            .setDescription(`Je cite : ${confession}`)
            .setImage(attachment?.url || null)
            .setColor(0xff69b4)
            .setFooter({ text: "Utilise /confession pour envoyer une confession !" })
            .setTimestamp(),
        ],
      });

      const logChannel = await client.channels.fetch(config.log).catch(() => null);
      if (logChannel) {
        await logChannel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("📨 Confession envoyée")
              .setColor(0x00AE86)
              .setDescription(`\`👤\`・Utilisateur : <@${interaction.user.id}> | \`${interaction.user.id}\`\n\`🕒\`・Date : <t:${Math.floor(Date.now() / 1000)}:F>\n\n\`📝\`・Confession :\n\`\`\`${confession.length > 1900 ? confession.slice(0, 1897) + "..." : confession}\`\`\``)
              .setImage(attachment?.url || null)
              .setFooter({ text: "developpeur1337" })
          ]
        });
      }

      await interaction.user.send({ embeds: [new EmbedBuilder().setDescription(`<:990yyes:1371830093252399196> Votre confession a été envoyée dans <#${config.channel}> avec succès !`).setColor(0x00FF00)] });
    } catch (err) {
    console.error("Erreur lors de la collecte du message :", err);
    await interaction.user.send({ embeds: [new EmbedBuilder().setDescription("<:990not:1371830095391756379> Temps écoulé, confession annulée.").setColor(0xFF0000)] }).catch(() => null);
    }
    finally {
      encours.delete(interaction.user.id);
    }
  },

  get data() {
    return new SlashCommandBuilder().setName(this.name).setDescription(this.description);
  },
};
