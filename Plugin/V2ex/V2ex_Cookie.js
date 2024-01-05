const cookieName = "V2EX";
const cookieKey = "chavy_cookie_v2ex";
const cookieVal = $request.headers["Cookie"] || $request.headers["cookie"];

if (cookieVal) {
  const existingCookieVal = $persistentStore.read(cookieKey);
  // 检查是否已有cookie值
  if (!existingCookieVal) {
    // 如果没有现有的cookie值，则写入并发送通知
    let cookie = $persistentStore.write(cookieVal, cookieKey);
    if (cookie) {
      let msg = "Cookie写入成功";
      console.log(`${cookieName}: ${msg}`);
      console.log("新的Cookie值: " + cookieVal);
      $notification.post(cookieName, msg, "详见日志");
    }
  } else if (cookieVal !== existingCookieVal) {
    // 如果新的cookie值与存储中的值不同，更新但不发送通知
    $persistentStore.write(cookieVal, cookieKey);
    console.log(`${cookieName}: Cookie更新成功`);
    console.log("更新后的Cookie值: " + cookieVal);
  } else {
    // 如果新的cookie值与存储中的值相同，只记录在日志中，不发送通知
    console.log(`${cookieName}: 重复的Cookie值，不更新`);
    console.log("重复的Cookie值: " + cookieVal);
  }
}

$done({});
