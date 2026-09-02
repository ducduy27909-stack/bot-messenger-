module.exports.config = {
  name: "kick",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Bot PTG",
  description: "Xóa thành viên khỏi nhóm chat",
  commandCategory: "Quản trị viên",
  usages: "[tag/reply]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  try {
    let mention = Object.keys(event.mentions);
    if (event.type == "message_reply") {
      mention.push(event.messageReply.senderID);
    }
    if (mention.length == 0) return api.sendMessage("⚠️ Vui lòng tag hoặc reply tin nhắn của người cần xóa khỏi nhóm!", event.threadID, event.messageID);
    
    for (let id of mention) {
      setTimeout(() => {
        api.removeUserFromGroup(id, event.threadID);
      }, 1000);
    }
  } catch (e) {
    return api.sendMessage("❌ Không thể xóa thành viên này (Bot cần quyền Quản trị viên nhóm)!", event.threadID, event.messageID);
  }
};
