module.exports = {
    name: 'play',
    description: "Primary music bot command",
    async execute(message, serverQueue, queue) { 
        const args = message.content.split(" ");

        const voiceChannel = message.member.voice.channel; 
        if(!voiceChannel) {
            return message.channel.send(
                "You must be in a voice channel to play music!"
            );
        }
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return message.channel.send(
                "Insufficient permissions!"
            ); 
        }

        const songInfo = await ytdl.getInfo(args[1]);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url, 
        }; 

        if(!serverQueue) {
            const queueConstruct = {
                textChannel = message.channel,
                voiceChannel = voiceChannel, 
                connection: null, 
                songs: [],
                volume: 5,
                playing: true
            };

            queue.set(message.guild.id, queueConstruct); 
            queueConstruct.songs.push(song); 

            try {
                var connection = await voiceChannel.join(); 
                queueConstruct.connection = connection; 
                play(message.guild.id, queueConstruct.songs[0]);
            } catch (err) {
                console.log(err); 
                queue.delete(message.guild.id); 
                return message.channel.send(err); 
            }
        } else {
            serverQueue.songs.push(song); 
            return message.channel.send(`${song.title} has been added to the queue.`)
        }
    }
}