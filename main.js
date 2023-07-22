const TOKEN = "6323657826:AAFnYlDoGFhCYZWtUp3EAciX4kjQh5SJoA8";
const translate = require("translation-google");
const { Bot } = require("grammy");
const bot = new Bot(TOKEN);
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

bot.on("message", async (ctx) => {
  if (!botProperty.isActive)
    return ctx.reply(`
    Siz 🤖 botni faolsizlantirgansiz ❌\n\nBotni ishga tushirish uchun /start buyrug'ini yuboring
    `);
  const status = (
    await bot.api.getChatMember("@english_dictionary_m", ctx.chat.id)
  ).status;

  if (
    status === "member" ||
    status === "administrator" ||
    status === "creator"
  ) {
    const message = ctx.update.message?.text;

    if (!message)
      return await ctx.reply(
        "Eslatma ❗️❗️❗️\n\nBotga matn yuboring hozirgi vaqtda boshqa formatdagi ma'lumotlar qabul qilmaydi ❌"
      );
    await bot.api.sendChatAction(ctx.chat.id, "typing");
    translate(message, { to: "en" })
      .then(async (res) => {
        await ctx.reply(res.text);
      })
      .catch((err) => {
        console.log("message errors --", err);
      });
  } else {
    await ctx.reply(`
    Eslatma ❗️❗️❗️ \n\n🤖 Botdan foydalanish uchun\n t.me/english_dictionary_m kanaliga a'zo bo'lishingiz kerek\n\nSo'ng qayta /start buyrug'ini bering
    `);
  }
});

bot.start();
