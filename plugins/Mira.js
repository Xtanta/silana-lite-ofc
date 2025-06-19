let handler = async (m, { conn }) => {
  // رابط الصورة (يمكنك تغييره لأي صورة تريدها)
  let imageUrl = 'https://i.imgur.com/62PlFvc.jpeg';

  // إرسال الصورة كرد
  await conn.sendFile(m.chat, imageUrl, 'mira.jpg', '🧠 أنا ميرا، كيف أقدر أساعدك؟', m);
};

handler.command = /^mira$/i;
handler.tags = ['fun'];
handler.help = ['mira'];

export default handler;
