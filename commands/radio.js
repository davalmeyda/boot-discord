const { SlashCommandBuilder } = require("@discordjs/builders");
const { createReadStream } = require("fs");
const { createAudioResource, StreamType, createAudioPlayer, joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder().setName("radio").setDescription("Iniciar Radio Music Okey"),
  // .addStringOption((option) => option.setName("song").setDescription("musica a tocar").setRequired(true))
  async execute(interaction) {
    const { voice } = interaction.member;
    if (!voice.channelId) {
      return interaction.reply("Tiene que estar en un canal de voz para poder usar este comando");
    }
    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();

    const resource = createAudioResource("http://play.musicokey.com:8048/stream");

    resource.volume = 1;

    connection.subscribe(player);

    player.play(resource);

    await interaction.reply("Iniciando Music Okey");
  },
};
