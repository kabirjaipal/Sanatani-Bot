import { Colors } from "discord.js";

const settings = {
  TOKEN:
    process.env.TOKEN ||
    "MTA1NTA3ODUwMTgzNDgyOTg4NA.GeWMAq._RGcvdi4nGki_iJhrcu7U4wbn8J9tVcs8ZRftA",
  PREFIX: "!",
  Owners: ["OwnersId", "OwnersId"],
  Slash: {
    Global: false,
    GuildID: process.env.GuildID || "903532162236694539",
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
