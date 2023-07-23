const TOKEN = "6323657826:AAFnYlDoGFhCYZWtUp3EAciX4kjQh5SJoA8";

const { Bot } = require("grammy");
const bot = new Bot(TOKEN);
const { translate } = require("@vitalets/google-translate-api");
const { MembershipCheck } = require("./middleware/channelMembershipCheck");
const botProperty = {
  count: 0,
  isActive: true,
};

bot.command(`start`, (ctx) => {
  if (botProperty.count == 0) {
    ctx.reply(`
            😊 Assalomu alaykum hurmatli foydalanuvchi! Botimizga xush kelibsiz\n\nBot  🇺🇿 o'zbek,  🇷🇺 Rus,  🇨🇳 Xitoy,  🇰🇷 Korea va yana bir qancha tillaridagi matnni 🇬🇧 ingliz tiliga tez va aniq tarjima qilib bera oladi\n\nBotdan foydalanish uchun t.me/english_dictionary_m kanaliga a'zo bo'lishingiz shart aks holda botdan foydalana olmaysiz\n\n🔎 Tarjima qilishingiz kerak bo'lgan matnni menga yuboring : `);
  } else {
    ctx.reply(`
             Siz 🤖 botni qayta ishga tushirdingiz ✅\n\nBotdan foydalanish uchun t.me/english_dictionary_m kanaliga a'zo bo'lishni unitmadingiz deb o'ylayman\n\n🔎 Tarjima qilishingiz kerak bo'lgan matnni menga yuboring : `);
  }
  botProperty.count++;
  botProperty.isActive = true;
});

bot.command("stop", (ctx) => {
  ctx.reply(
    "Siz 🤖 botni faolsizlantirdingiz ❌\n\nQayta ishga tushirish uchun /start buyrug'ini yuboring"
  );
  botProperty.isActive = false;
});
bot.command("help", (ctx) => {
  ctx.reply(
    "/start - Botni ishga tushirish ✅\n/stop - Botni faolsizlantirish ❌"
  );
});

bot.on("message:text", async (ctx) => {
  const isMember = await MembershipCheck(ctx, bot);
  const message = ctx.update.message.text;
  const chatId = ctx.chat.id;
  if (!isMember)
    return await ctx.reply(`
   Eslatma ❗️❗️❗️ \n\n🤖 Botdan foydalanish uchun\n t.me/english_dictionary_m kanaliga a'zo bo'lishingiz kerek\n\nSo'ng qayta /start buyrug'ini bering
   `);

  if (!botProperty.isActive) {
    return ctx.reply(`Siz 🤖 botni faolsizlantirgansiz ❌\n\nBotni ishga tushirish uchun /start buyrug'ini yuboring
`);
  } else {
    await bot.api.sendChatAction(chatId, "typing");
    const translateText = (await translate(message, { to: "en" })).text;
    ctx.reply(translateText);
  }
});

bot.start();
