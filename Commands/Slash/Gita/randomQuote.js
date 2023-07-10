import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Scommand}
 */
export default {
  name: "randomquote",
  description: "Get Random Quote From Bhagvat Gita",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Gita",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    // Code
    const randomquote = client.gita.getRandomQuote();

    return client.send(interaction, {
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
