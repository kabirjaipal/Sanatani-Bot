import { Colors } from "discord.js";

const settings = {
  TOKEN: process.env.TOKEN || "Bot_Token",
  PREFIX: "!",
  Owners: ["OwnersId", "OwnersId"],
  Slash: {
    Global: false,
    GuildID: process.env.GuildID || "GuildId",
  },
  embed: {
    color: "#F4C430",
    wrongColor: Colors.Red,
  },
  emoji: {
    success: "✅",
    error: "❌",
  },

  footer: {
    text: `Made By Kabir Jaipal | Jai Shree Ram`,
    // iconURL: "",
  },
};

export default settings;
