module.exports = (bot) => {
    console.log(`${bot.user.tag} is Online!`);
    bot.user.setActivity("Visual Studio Code", { type: 'PLAYING' });
}