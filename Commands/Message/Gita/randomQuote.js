import { Colors, EmbedBuilder, PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "randomquote",
  description: "Get Random Quote From Bhagvat Gita",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Gita",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    // Code
    const randomquote = client.gita.getRandomQuote();

    return client.send(message, {
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.embed.color)
          .setTitle(`Random Quote - Bhagvat Gita`)
          .setDescription(
            `Chapter \`${randomquote.chapterIndex} - ${randomquote.chapter}\` Verse \`${randomquote.verse}\``
          )
          .addFields([
            {
              name: `Hindi`,
              value: `\`\`\`\n${randomquote.hindi}\`\`\``,
            },
            {
              name: `English`,
              value: `\`\`\`\n${randomquote.english}\`\`\``,
            },
          ])
          .setFooter(client.config.footer),
      ],
    });
  },
};
