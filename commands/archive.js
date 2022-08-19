module.exports = {
    name: "archive",
    description: "Archives the links from any website to discord",
    async execute(message, args, list, client, Discord) {

      //FUNCTION SECTION START

      function findName(name) {
          return (name == 'instagram' || name == 'twitter' || name == 'reddit' || name == 'youtube' || name == 'other' || name == 'nsfw');
      }

      //FUNCTION SECTION END
      
      if (args[0] == "help") {
          message.channel.send("Command Format:\n/archive (link) [thread]\nFormat: (required)[optional]");
      }
      else if (args.length < 1) {
          message.channel.send("ERROR!\nYou are missing arguments!");
          return;
      }

    
      let website = args[0];
      let channelName = website.split("//")[1];
      if (channelName == 0) {
        message.channel.send("Please provide a valid link!");
        return;
      }
      let namesList = ['instagram', 'twitter', 'reddit', 'youtube','other', 'nsfw'];
      let channelNum;
      
      //Check if there is a www
      if (channelName[0] == 'w') {
        channelName = channelName.split(".")[1];
      }

      //Get the name
      channelName = channelName.split(".")[0];

      //Check for NSFW
      let subch ='General';
      let nsfw = ((channelName.indexOf("porn") != -1) || (channelName.indexOf("hentai") != -1));
      
      //Channel Name Section
      if (findName(channelName)) {
        channelNum = '' + list[namesList.indexOf(channelName)];
      } else {
        if (nsfw) {
          subch = channelName;
          channelName = 'nsfw';
          channelNum = '' + list[namesList.indexOf('nsfw')];
        } else {
          subch = channelName;
          channelNum = '' + list[namesList.indexOf('other')];
        }
      }

      const channel = client.channels.cache.get(channelNum);

      //Check if the channel already exists
      if (channel) {
        //Thread section
        let threadName;

        //Get the channel name or default
        if (args.length > 1) {
          threadName = args[1];
        } else {
          threadName = subch;
        }

        //Un-archive the thread (if archived)
        const thread = channel.threads.cache.find(x => x.name === threadName);
        // await thread.setArchived(false);
        if (thread == undefined) { console.log(threadName); }
        
        if (thread == undefined) {
          let ID = message.member.id;
          const thread = await channel.threads.create({
            name: threadName,
            autoArchiveDuration: 60,
            //message.client.users.fetch(ID);
            reason: 'N/A',
          });
          thread.send(args[0]);
        
          console.log(`Created thread: ${thread.name}`);
        } else {
          const thread = channel.threads.cache.find(x => x.name === threadName);
          //await thread.setArchived(false); //Unarchive
          thread.send(args[0]);
        }
      } else {
        message.channel.send("Uh oh, looks like this channel doesn't exist yet!");
      }
  }
}