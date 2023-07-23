async function channelMembershipCheck(ctx, bot, next) {
  let isMember = false;

  const status = (
    await bot.api.getChatMember("@english_dictionary_m", ctx.message.chat.id)
  ).status;
  isMember =
    status === "administrator" || status === "creator" || status === "member"
      ? true
      : false;

  return isMember;
}

exports.MembershipCheck = channelMembershipCheck;
