import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ComponentType,
  EmbedBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from "discord.js";

/**
 * @type {import("../../../index.js").Scommand}
 */
export default {
  name: "gita-chapter",
  description: "Read a Specific Chapter Of Bhagvat Geeta",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Gita",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "chapter",
      description: `Provide Chapter Index Between 1-18`,
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    // Code
    const index = interaction.options.get("chapter", true)?.value;

    if (!index) {
      return client.send(interaction, {
        content: `Provide Chapter Index Between 1-18`,
        ephemeral: true,
      });
    }

    const chapter = client.gita.getChapter(index - 1);

    const selectMenus = [];
    const selectMenusIds = [];
    const totalOptions = chapter.verse_count;
    const maxOptionsPerMenu = 24;
    let menuIndex = 1;

    let startIndex = 0;
    let endIndex = maxOptionsPerMenu;

    while (startIndex < totalOptions) {
      const options = chapter.verses.slice(startIndex, endIndex);

      const row = new ActionRowBuilder().addComponents([
        new StringSelectMenuBuilder()
          .setCustomId(`verse_menu-${menuIndex}`)
          .setPlaceholder(
            `Read All Verse Of Chapter ${chapter.chapter_number} ${chapter.chapter_name}`
          )
          .addOptions(
            options.map((verse) => {
              return {
                label: `Verse ${verse.verse}`,
                description: `Click to Read Verse ${verse.verse}`,
                value: `chapter-${chapter.chapter_number}-verse-${verse.verse}`,
                emoji: "🗒️",
              };
            })
          ),
      ]);
      selectMenus.push(row);
      selectMenusIds.push(`verse_menu-${menuIndex}`);
      menuIndex++;
      startIndex = endIndex;
      endIndex += maxOptionsPerMenu;
    }

    const msg = await interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.embed.color)
          .setTitle(`Read Chapter ${chapter.chapter_number} of Bhagvat Gita`)
          .setFooter(client.config.footer),
      ],
      components: selectMenus,
      ephemeral: true,
    });

    const collector = await msg.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      filter: (i) => i.user.id === interaction.user.id,
    });

    collector.on("collect", async (i) => {
      await i.deferUpdate().catch((e) => {});
      await i.deferReply().catch((e) => {});

      const isExist = selectMenusIds.find((id) => id === i.customId);
      if (isExist) {
        const value = i.values.at(0);
        const data = GetDataFromValue(value);

        const verse = client.gita.getVerse(
          data.chapter_number,
          data.verse_number
        );

        return i.followUp({
          embeds: [
            new EmbedBuilder()
              .setColor(client.config.embed.color)
              .setTitle(`Verse - Bhagvat Gita`)
              .setDescription(
                `Chapter \`${chapter.chapter_number} - ${chapter.chapter_name}\` Verse \`${verse.verse}\``
              )
              .addFields([
                {
                  name: `Hindi`,
                  value: `\`\`\`\n${verse.hindi}\`\`\``,
                },
                {
                  name: `English`,
                  value: `\`\`\`\n${verse.english}\`\`\``,
                },
              ])
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

  const chapter_number = parseInt(splitstring[1]) - 1;
  const verse_number = parseInt(splitstring[3]) - 1;

  return {
    chapter_number,
    verse_number,
  };
};
