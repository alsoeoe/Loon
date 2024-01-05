const cookieName = "V2EX";
const cookieKey = "V2ex_Cookie";
const cookieVal = $request.headers["Cookie"] || $request.headers["cookie"];

if (cookieVal) {
  const existingCookieVal = $persistentStore.read(cookieKey);
  if (cookieVal !== existingCookieVal) {
    // 如果新的cookie值与存储中的值不同
    let cookie = $persistentStore.write(cookieVal, cookieKey);
    if (cookie) {
      let msg = `${cookieName}`;
      $notification.post(msg, "Cookie写入成功", "详见日志");
      console.log(msg);
      console.log("新的Cookie值: " + cookieVal);
    }
  } else {
    // 如果新的cookie值与存储中的值相同，则只记录在日志中，不发送通知
    let msg = `${cookieName}: 重复的Cookie值，不更新`;
    console.log(msg);
    console.log("重复的Cookie值: " + cookieVal);
  }
}

$done({});
