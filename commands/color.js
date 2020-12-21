const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: "color",
    description: "Memberi warna pada kehidupan",
    execute(message, args) {
        const colorRoleChannel = message.guild.channels.cache.find(channel => channel.name === "🎨color-role🎨");

        if (message.channel != colorRoleChannel) {
            message.channel.send(`Command ini hanya bisa digunakan di channel ${colorRoleChannel}`);
        } else {
            if (!args[0]) {

                let Yukina = message.guild.roles.cache.find(c => c.name === "Yukina");
                let Sayo = message.guild.roles.cache.find(c => c.name === "Sayo");
                let Lisa = message.guild.roles.cache.find(c => c.name === "Lisa");
                let Ako = message.guild.roles.cache.find(c => c.name === "Ako");
                let Rinko = message.guild.roles.cache.find(c => c.name === "Rinko");

                let colorListEmbed = new Discord.MessageEmbed()
                    .setColor("#32aabe")
                    .setTitle("Color role List")
                    .setDescription(`Silahkan pilih warna yang anda inginkan\n\n- **${Yukina}**\n- **${Sayo}**\n- **${Lisa}**\n- **${Ako}**\n- **${Rinko}**\n\n\n_Color Role tidak memberikan Permission Tambahan. Color Role hanya memberikan warna pada Nickname kalian_`)
                    .setFooter("Hikawa Sayo | Made By : CotoMKS27#9361");

                message.channel.send(colorListEmbed);

            } else {
                if (args[0] === "Yukina") {
                    let color = message.guild.roles.cache.find(c => c.name === "Yukina");
                    if (message.member.roles.cache.find(c => c.name === "Yukina")) return message.channel.send("Anda sudah memiliki color role ini!");

                    let client = message.author;

                    let userTarget = message.guild.members.cache.get(client.id);
                    userTarget.roles.add(color.id), message.channel.send(`${client} telah mengambil color role **${color}**`);
                } else if (args[0] === "Sayo") {
                    let color = message.guild.roles.cache.find(c => c.name === "Sayo");
                    if (message.member.roles.cache.find(c => c.name === "Sayo")) return message.channel.send("Anda sudah memiliki color role ini!");

                    let client = message.author;

                    let userTarget = message.guild.members.cache.get(client.id);
                    userTarget.roles.add(color.id), message.channel.send(`${client} telah mengambil color role **${color}**`);
                } else if (args[0] === "Lisa") {
                    let color = message.guild.roles.cache.find(c => c.name === "Lisa");
                    if (message.member.roles.cache.find(c => c.name === "Lisa")) return message.channel.send("Anda sudah memiliki color role ini!");

                    let client = message.author;

                    let userTarget = message.guild.members.cache.get(client.id);
                    userTarget.roles.add(color.id), message.channel.send(`${client} telah mengambil color role **${color}**`);
                } else if (args[0] === "Ako") {
                    let color = message.guild.roles.cache.find(c => c.name === "Ako");
                    if (message.member.roles.cache.find(c => c.name === "Ako")) return message.channel.send("Anda sudah memiliki color role ini!");

                    let client = message.author;

                    let userTarget = message.guild.members.cache.get(client.id);
                    userTarget.roles.add(color.id), message.channel.send(`${client} telah mengambil color role **${color}**`);
                } else if (args[0] === "Rinko") {
                    let color = message.guild.roles.cache.find(c => c.name === "Rinko");
                    if (message.member.roles.cache.find(c => c.name === "Rinko")) return message.channel.send("Anda sudah memiliki color role ini!");

                    let client = message.author;

                    let userTarget = message.guild.members.cache.get(client.id);
                    userTarget.roles.add(color.id), message.channel.send(`${client} telah mengambil color role **${color}**`);
                } else if (args[0] === "remove") {
                    if (!args[1]) return message.channel.send("Masukkan color role yang ingin di hapus!");

                    if (args[1] === "Yukina") {
                        let color = message.member.roles.cache.find(c => c.name === "Yukina");
                        let client = message.author;

                        let userTarget = message.guild.members.cache.get(client.id);
                        if (!color) return message.channel.send("Anda tidak memiliki color role ini!");
                        userTarget.roles.remove(color.id), message.channel.send(`${client} telah menghapus color role **${color}**`);
                    } else if (args[1] === "Sayo") {
                        let color = message.member.roles.cache.find(c => c.name === "Sayo");
                        let client = message.author;

                        let userTarget = message.guild.members.cache.get(client.id);
                        if (!color) return message.channel.send("Anda tidak memiliki color role ini!");
                        userTarget.roles.remove(color.id), message.channel.send(`${client} telah menghapus color role **${color}**`);
                        return;
                    } else if (args[1] === "Lisa") {
                        let color = message.member.roles.cache.find(c => c.name === "Lisa");
                        let client = message.author;

                        let userTarget = message.guild.members.cache.get(client.id);
                        if (!color) return message.channel.send("Anda tidak memiliki color role ini!");
                        userTarget.roles.remove(color.id), message.channel.send(`${client} telah menghapus color role **${color}**`);
                    } else if (args[1] === "Ako") {
                        let color = message.member.roles.cache.find(c => c.name === "Ako");
                        let client = message.author;

                        let userTarget = message.guild.members.cache.get(client.id);
                        if (!color) return message.channel.send("Anda tidak memiliki color role ini!");
                        userTarget.roles.remove(color.id), message.channel.send(`${client} telah menghapus color role **${color}**`);
                    } else if (args[1] === "Rinko") {
                        let color = message.member.roles.cache.find(c => c.name === "Rinko");
                        let client = message.author;

                        let userTarget = message.guild.members.cache.get(client.id);
                        if (!color) return message.channel.send("Anda tidak memiliki color role ini!");
                        userTarget.roles.remove(color.id), message.channel.send(`${client} telah menghapus color role **${color}**`);
                    }
                } else {
                    message.channel.send("Tidak dapat menemukan color role tersebut");
                }
            }
        }
    }
}