module.exports = {
    name: "deletemsg",
    description: "Delete some message",
    async execute(message, args) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You don't have `MANAGE_MESSAGES` permission");

        if (!args[0]) return message.reply("Please insert the amount of messages");
        if (isNaN(args[0])) return message.reply("Please insert number!");

        if (args[0] > 100) return message.reply("Can't delete more than 100 messages!");
        if (args[0] < 2) return message.reply("Can't delete less than 2 messages!");

        await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }
}