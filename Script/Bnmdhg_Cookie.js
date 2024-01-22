const key = "bnmdhg";

function captureMemberId() {
  if (
    $request &&
    $request.url.indexOf("https://cloud.banu.cn/api/member/statistic") >= 0
  ) {
    let regex = /member_id=([a-zA-Z0-9]+)/;
    let match = $request.url.match(regex);
    if (match && match[1]) {
      let memberId = match[1];
      let storedMemberId = $persistentStore.read(key);
      if (memberId === storedMemberId) {
        console.log("已存在的 member_id: " + memberId + "，无需更新。");
      } else {
        $persistentStore.write(memberId, key);
        $notification.post("获取成功", "member_id 已存储", memberId);
        console.log("新的 member_id: " + memberId + " 已存储。");
      }
    } else {
      $notification.post("获取失败", "无法从 URL 中提取 member_id", "");
    }
  }

  // 确保调用 $done() 并传递原始请求对象
  $done($request);
}

captureMemberId();
