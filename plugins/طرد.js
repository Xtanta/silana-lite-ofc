let handler = async (m, { conn, participants, text }) => {
  // تحقق أن الأمر داخل مجموعة
  if (!m.isGroup) throw '❌ هذا الأمر خاص بالمجموعات فقط!';

  // تحقق أن البوت أدمن
  if (!conn.user.jid.includes('@g.us') && !participants.find(p => p.id === conn.user.jid && p.admin))
    throw '❌ يجب أن أكون أدمن لطرد الأعضاء!';

  // تحقق أن المرسل أدمن
  if (!participants.find(p => p.id === m.sender && p.admin))
    throw '❌ هذا الأمر للأدمن فقط!';

  // الحصول على الرقم أو الوسم
  let target = m.mentionedJid[0] || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  if (!target) throw '⚠️ من فضلك قم بوسم (@) العضو الذي تريد طرده أو أدخل رقمه.';

  // لا تطرد نفسك ولا صاحب البوت
  if (target === conn.user.jid || target === m.sender) throw '🙅‍♂️ لا يمكن طرد نفسك أو البوت!';

  // تنفيذ الطرد
  await conn.groupParticipantsUpdate(m.chat, [target], 'remove')
    .then(() => m.reply('✅ تم طرد العضو.'))
    .catch(e => m.reply('⚠️ فشل في الطرد. هل أنا أدمن؟'));
};

handler.command = /^طرد$/i;
handler.group = true; // هذا الأمر فقط في القروبات
handler.admin = true; // يتطلب أن يكون المرسل أدمن
handler.botAdmin = true; // يتطلب أن يكون البوت أدمن

export default handler;
