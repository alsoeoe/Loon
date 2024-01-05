const cookieName = "V2EX";
const cookieKey = "V2ex_Cookie";
const cookieVal = $persistentStore.read(cookieKey);

// 发送通知的函数
function sendNotification(title, subTitle, detail) {
  console.log(`${title}, ${subTitle}, ${detail}`);
  $notification.post(title, subTitle, detail);
}

function sign() {
  let url = {
    url: `https://www.v2ex.com/mission/daily`,
    headers: { Cookie: cookieVal },
  };

  $httpClient.get(url, (error, response, data) => {
    if (error) {
      sendNotification(cookieName, "签到结果: 请求失败", `错误详情: ${error}`);
      return;
    }

    if (data.indexOf("每日登录奖励已领取") >= 0) {
      sendNotification(cookieName, "签到结果: 签到跳过", "今天已经签过了");
    } else {
      // 提取签到代码并执行签到
      const codeMatch = data.match(
        /<input[^>]*\/mission\/daily\/redeem\?once=(\d+)[^>]*>/
      );
      if (codeMatch && codeMatch[1]) {
        signMission(codeMatch[1]);
      } else {
        sendNotification(cookieName, "签到结果: 签到失败", "无法提取签到代码");
      }
    }
  });
  $done({});
}

function signMission(code) {
  let url = {
    url: `https://www.v2ex.com/mission/daily/redeem?once=${code}`,
    headers: { Cookie: cookieVal },
  };

  $httpClient.get(url, (error, response, data) => {
    if (error) {
      sendNotification(cookieName, "签到结果: 请求失败", `错误详情: ${error}`);
      return;
    }

    if (data.indexOf("每日登录奖励已领取") >= 0) {
      sendNotification(cookieName, "签到结果: 签到成功", "");
    } else {
      sendNotification(cookieName, "签到结果: 签到失败", "详见日志");
    }
  });
}

sign({});
