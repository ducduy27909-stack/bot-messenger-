module.exports.config = {
  name: "nongtrai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Bot PTG",
  description: "Xem thông tin nông trại Play Together",
  commandCategory: "Game",
  usages: "[tên nông trại/ID]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const query = args.join(" ");
  if (!query) return api.sendMessage("🌾 Vui lòng nhập tên hoặc ID nông trại cần tra cứu!", event.threadID, event.messageID);
  
  return api.sendMessage(`🚜 Đang tra cứu thông tin nông trại cho: ${query}...\n(Tính năng đang kết nối dữ liệu Play Together)`, event.threadID, event.messageID);
};
