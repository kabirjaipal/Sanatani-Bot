import {
  ActionRowBuilder,
  ComponentType,
  EmbedBuilder,
  PermissionFlagsBits,
  StringSelectMenuBuilder,
} from "discord.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "gita-summary",
  description: "Read Summary of a Specific Chapter Of Bhagvat Geeta",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Gita",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    // Code

    const chapterSummary = client.gita.getSummary();

    const row = new ActionRowBuilder().addComponents([
      new StringSelectMenuBuilder()
        .setCustomId(`chapters_menu`)
        .setPlaceholder(`Read Summary All Chapters`)
        .addOptions(
          chapterSummary.map((chapter) => {
            return {
              label: `${chapter.chapter} ${chapter.title}`,
              description: `Click to Read Summary`,
              value: `summary-${chapter.title}`,
              emoji: "📁",
            };
          })
        ),
    ]);

    const msg = await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.embed.color)
          .setTitle(`Read Summary of Bhagvat Gita`)
          .setFooter(client.config.footer),
      ],
      components: [row],
    });

    const collector = await msg.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      filter: (i) => i.user.id === message.author.id,
    });

    collector.on("collect", async (interaction) => {
      await interaction.deferUpdate().catch((e) => {});
      await interaction.deferReply().catch((e) => {});
      if (interaction.customId === "chapters_menu") {
        const value = interaction.values.at(0);
        const chapter_name = GetDataFromValue(value);

        const summary = client.gita.getSummary();

        const chapter = summary.find(
          (chapter) => chapter.title === chapter_name
        );

        return interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setColor(client.config.embed.color)
              .setAuthor({
                name: `Bhagvat Gita 🕉️`,
                iconURL: client.user.displayAvatarURL(),
              })
              .setDescription(chapter.summary)
              .setFooter(client.config.footer),
          ],
          ephemeral: true,
        });
      }
    });
  },
};

const GetDataFromValue = (string) => {
  const splitstring = string.split("-");

  const chapter_name = splitstring[1];

  return chapter_name;
};
