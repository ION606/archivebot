module.exports = {
    name: "archive",
    description: "Archives the links from any website to discord",
    execute(message, args, Discord) {
        if (args[0] == "help") {
            message.channel.send("Command Format:\n/archive (link) [thread]\nFormat: (required) [optional]");
        }
        else if (args.length() < 2) {
            message.channel.send("ERROR!\nYou are missing arguments!");
            return;
        }
        let website = args[0];
    }
}