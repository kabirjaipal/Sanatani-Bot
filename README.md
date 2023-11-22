## Sanatan Discord Bot 🕉️

Hi, I'm Kabir, a Discord Bot Developer, and welcome to the Sanatan Discord Bot – a bot designed to help users read Bhagavad Gita and Vedas, generated with AI using Chat GPT.

## Installation | How to use the Bot

Sanatan Discord Bot helps users explore scriptures in Hindi and English. Follow these steps to set up and use the bot:

1. Fill in the required details in **`settings/config.js`**.

### _Modify - config.js_

```javascript
import { Colors } from "discord.js";

const settings = {
  TOKEN: process.env.TOKEN || "BOT_TOKEN",
  PREFIX: process.env.PREFIX || "BOT_PREFIX",
  Owners: ["OwnersId", "OwnersId"],
  Slash: {
    Global: false,
    GuildID: process.env.GuildID || "GUILD_ID",
  },
};

export default settings;
```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the bot:

   ```bash
   node index.js
   ```

## Bot Features

- For Sanatan Dharma enthusiasts
- Read scriptures in Hindi and English
- Currently supports Bhagavad Gita; more scriptures to be included in the future
- Contribute to make it even better!

## Feedback

If you have any feedback or suggestions, please join our [Discord Server](https://discord.gg/PcUVWApWN3).

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

## Thanks For Using Sanatan Discord Bot! 🌟

If you encounter any bugs or have suggestions, feel free to open a pull request.

Happy spiritual exploration! 🙏
