// ==========================================================
// BOT MESSENGER - QUẢN LÝ BỞI NICK CHÍNH (ADMIN)
// ==========================================================

const fs = require('fs');

// Cấu hình Bot
const config = {
  prefix: "/",
  botName: "Bot PTG",
  // 👑 ID Nick Chính (Chủ Bot) của bạn đã được gắn ở đây:
  adminIDs: ["61550118083766"] 
};

module.exports.onMessage = async function ({ api, event }) {
  const { body, threadID, messageID, senderID } = event;
  if (!body || !body.startsWith(config.prefix)) return;

  const args = body.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Kiểm tra xem người nhắn có phải là Nick Chính (Chủ bot) không
  const isAdmin = config.adminIDs.includes(senderID);

  switch (command) {
    // 1. LỆNH KICK (CHỈ NICK CHÍNH MỚI XÀI ĐƯỢC)
    case "kick": {
      if (!isAdmin) {
        return api.sendMessage("❌ Chỉ có NICK CHÍNH (Chủ bot) mới có quyền dùng lệnh này!", threadID, messageID);
      }
      try {
        let mention = Object.keys(event.mentions || {});
        if (event.type === "message_reply") {
          mention.push(event.messageReply.senderID);
        }
        if (mention.length === 0) {
          return api.sendMessage("⚠️ Vui lòng tag hoặc reply tin nhắn người cần xóa!", threadID, messageID);
        }
        for (let id of mention) {
          setTimeout(() => api.removeUserFromGroup(id, threadID), 1000);
        }
      } catch (e) {
        api.sendMessage("❌ Không thể xóa (Nick clone làm Bot cần có quyền Quản trị viên nhóm)!", threadID, messageID);
      }
      break;
    }

    // 2. LỆNH XEM THÔNG TIN CHỦ BOT
    case "admin":
    case "chubot": {
      return api.sendMessage(`👑 NICK CHÍNH (Chủ quản lý Bot):\nhttps://facebook.com/${config.adminIDs[0]}`, threadID, messageID);
    }

    // 3. LỆNH PING (KIỂM TRA KẾT NỐI)
    case "ping": {
      const timeStart = Date.now();
      api.sendMessage("🏓 Đang kiểm tra kết nối...", threadID, (err, info) => {
        const timeEnd = Date.now();
        api.sendMessage(`✅ Bot Clone đang hoạt động tốt!\n⏱ Độ trễ: ${timeEnd - timeStart}ms`, threadID, info.messageID);
      }, messageID);
      break;
    }

    // 4. LỆNH TRA CỨU PLAY TOGETHER
    case "ptg": {
      const subCommand = args[0];
      if (subCommand === "code") {
        api.sendMessage("🎁 Mã Coupon Play Together mới nhất:\n1. PTG2026HAPPY\n2. TOGETHERWITHYOU\n👉 Nhập tại: haegin.kr/playtogether/coupon", threadID, messageID);
      } else if (subCommand === "id") {
        const playerID = args[1];
        if (!playerID) return api.sendMessage("⚠️ Vui lòng nhập ID nhân vật!", threadID, messageID);
        api.sendMessage(`🔍 Đang kiểm tra thông tin ID: ${playerID}...`, threadID, messageID);
      } else {
        api.sendMessage("🎮 Cú pháp Play Together:\n• /ptg code : Lấy mã quà tặng\n• /ptg id [Mã_ID] : Tra cứu người chơi", threadID, messageID);
      }
      break;
    }

    // 5. LỆNH NÔNG TRẠI PLAY TOGETHER
    case "nongtrai": {
      const query = args.join(" ");
      if (!query) {
        return api.sendMessage("🌾 Vui lòng nhập tên hoặc ID nông trại cần xem!", threadID, messageID);
      }
      api.sendMessage(`🚜 Đang tra cứu nông trại cho: ${query}...`, threadID, messageID);
      break;
    }

    default:
      break;
  }
};
