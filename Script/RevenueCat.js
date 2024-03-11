const modifiedResponse = {};
const responseBody = JSON.parse(
  (typeof $response != "undefined" && $response.body) || null
);

function normalizeHeaders(headers) {
  console.log(
    `在我们开始之前，让我们看看这些神秘的请求头部：\n${JSON.stringify(headers)}`
  ); // 打印原始请求头
  if (headers["User-Agent"]) {
    headers["user-agent"] = headers["User-Agent"];
    delete headers["User-Agent"];
  }
  delete headers["x-revenuecat-etag"];
  delete headers["X-RevenueCat-ETag"];
  console.log(
    `经过一番魔法处理，请求头现在干净多了: \n${JSON.stringify(headers)}`
  ); // 打印正规化后的请求头
  return headers;
}

function modifyResponseBody(body) {
  console.log(`看看我们拿到的宝贝是什么: \n${JSON.stringify(body)}`); // 打印原始响应体

  // 定义UA映射和订阅数据
  const UAMappings = {
    // 谜底时钟
    // https://apps.apple.com/cn/app/id1536358464
    "%E8%B0%9C%E5%BA%95%E6%97%B6%E9%92%9F": {
      name: "Entitlement.Pro",
      id: "tech.miidii.MDClock.subscription.year.v1",
    },

    // 谜底黑胶
    // https://apps.apple.com/cn/app/id1606306441
    "%E8%B0%9C%E5%BA%95%E9%BB%91%E8%83%B6": {
      name: "Entitlement.Pro",
      id: "tech.miidii.MDClock.subscription.year.v1",
    },

    // stresswatch
    // https://apps.apple.com/us/app/id6444737095
    Stress: { name: "StressWatch Pro", id: "stress_membership_yearly" },

    // MoneyThings
    // https://apps.apple.com/cn/app/id1549694221
    MoneyThings: {
      name: "Premium",
      id: "com.lishaohui.cashflow.lifetime",
    },

    // 小决定
    // https://apps.apple.com/cn/app/id1338769645
    Decision: {
      name: "com.nixwang.decision.entitlements.pro",
      id: "com.nixwang.decision.pro",
    },

    // ScannerPro
    // https://apps.apple.com/cn/app/id333710667
    ScannerPro: {
      name: "plus",
      id: "com.premium.yearly",
    },

    // Spark邮箱
    // https://apps.apple.com/cn/app/id997102246
    Spark: { name: "premium", id: "spark_5999_1y_1w0" },

    // 性爱游戏
    // https://apps.apple.com/cn/app/id1133512669
    Sex: {
      name: "Premium Plus",
      id: "ru.sexactions.subscriptionPromo1",
    },

    // Cookie记账
    // https://apps.apple.com/cn/app/id1559943673
    cookie: {
      name: "allaccess",
      id: "app.ft.Bookkeeping.lifetime",
    },

    // Moze
    // https://apps.apple.com/cn/app/id1460011387
    MOZE: {
      name: "MOZE_PREMIUM_SUBSCRIPTION",
      id: "MOZE_PRO_SUBSCRIPTION_YEARLY_BASIC",
    },

    // 小熊记账
    // https://apps.apple.com/us/app/id6448206280
    money_manager: {
      name: "premium",
      id: "com.happy.fastdiet.forever",
    },

    // 小熊轻断食
    // https://apps.apple.com/cn/app/id1624214488
    fastdiet: {
      name: "premium",
      id: "com.happy.fastdiet.forever",
    },

    // 花样文字
    // https://apps.apple.com/cn/app/id1438854446
    UTC: {
      name: "Entitlement.Pro",
      id: "tech.miidii.MDClock.subscription.year.v1",
    },

    // OffScreen
    // https://apps.apple.com/cn/app/id1474340105
    OffScreen: {
      name: "Entitlement.Pro",
      id: "tech.miidii.MDClock.subscription.year.v1",
    },
  };
  
      Grow: {
      name: "grow.pro",
      id: "grow_lifetime"",
    },
  };

  const subscriptionData = {
    // 订阅数据
    is_sandbox: !1,
    ownership_type: "PURCHASED",
    billing_issues_detected_at: null,
    period_type: "normal",
    expires_date: "2099-09-09T09:09:09Z",
    grace_period_expires_date: null,
    unsubscribe_detected_at: null,
    original_purchase_date: "2022-09-09T09:09:10Z",
    purchase_date: "2022-09-09T09:09:09Z",
    store: "app_store",
  };

  const entitlementData = {
    // 权益数据
    grace_period_expires_date: null,
    purchase_date: "2022-09-09T09:09:09Z",
    expires_date: "2099-09-09T09:09:09Z",
  };

  if (body && body.subscriber) {
    const UA = $request.headers["user-agent"] || $request.headers["User-Agent"];
    console.log(`嗯，这个User-Agent闻起来像... \n${UA}`); // 打印检测到的User-Agent
    Object.keys(UAMappings).forEach((appName) => {
      if (new RegExp(`^${appName}`, "i").test(UA)) {
        console.log(`哇塞，我们钓到一只大鱼: \n${appName}`); // 打印匹配到的应用
        const { name, id } = UAMappings[appName];
        body.subscriber.subscriptions[id] = subscriptionData;
        body.subscriber.entitlements[name] = {
          ...entitlementData,
          product_identifier: id,
        };
      }
    });
  }

  console.log(`魔法施展后，宝贝现在变成了: \n${JSON.stringify(body)}`); // 打印修改后的响应体
  return body;
}

if (responseBody && responseBody.subscriber) {
  console.log("精灵和魔法师们，开始我们的表演吧！");
  $request.headers = normalizeHeaders($request.headers);
  const UA = $request.headers["user-agent"];
  modifiedResponse.body = JSON.stringify(modifyResponseBody(responseBody));
} else {
  console.log("精灵和魔法师们，开始我们的表演吧！");
  modifiedResponse.headers = normalizeHeaders($request.headers);
}
console.log("精灵和魔法师们，开始我们的表演吧！");
$done(modifiedResponse);
