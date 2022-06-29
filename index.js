const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Token/client id
require("dotenv").config();
const token = process.env.FORZA_TOKEN
const clientId = process.env.CLIENT_ID

// Commands
const commands = [{
  name: 'car',
  description: 'Gives you a car from Forza'
}];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      // Routes.applicationGuildCommands(clientId, guildId), // For devlopment, register commands to guild immediately
      Routes.applicationCommands(clientId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const axios = require('axios');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'car') {
    axios.get("https://forza-api.tk/").then((response) => {
      image = response.data.image;
      const embed = new MessageEmbed().setImage(image).setDescription('Here is a car from Forza:');
      interaction.reply({
        embeds: [embed],
        ephemeral: false
      });
    });
  }
});

client.login(token);