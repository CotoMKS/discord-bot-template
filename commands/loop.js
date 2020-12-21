const { canModifyQueue } = require("../util/util");

module.exports = {
    name: "loop",
    description: "Mengulangi antrian",
    execute(message) {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.reply("Tidak ada lagu yang sedang dimainkan").catch(console.error);
        if (!canModifyQueue(message.member)) return;

        // toggle from false to true and reverse
        queue.loop = !queue.loop;
        return queue.textChannel.send(`Mengulangi Antrian : ${queue.loop ? "**on**" : "**off**"}`).catch(console.error);
    }
};