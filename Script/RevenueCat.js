const modifiedResponse = {};
const responseBody = JSON.parse($response ? $response.body : null);

if (!$response) {
  // 处理请求
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  modifiedResponse.headers = $request.headers;
} else if (responseBody && responseBody.subscriber) {
  // 处理响应
  const UA = $request.headers["user-agent"];
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

  const subscriptionData = {
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
    grace_period_expires_date: null,
    purchase_date: "2022-09-09T09:09:09Z",
    expires_date: "2099-09-09T09:09:09Z",
  };

  for (const appName in UAMappings) {
    if (new RegExp(`^${appName}`, "i").test(UA)) {
      console.log(`找到匹配：${appName}\n`);
      const { name, id } = UAMappings[appName];
      responseBody.subscriber = {
        non_subscriptions: {},
        first_seen: "2022-09-09T09:09:08Z",
        original_application_version: "8",
        other_purchases: {},
        management_url: "https://apps.apple.com/account/subscriptions",
        subscriptions: {},
        entitlements: {},
        original_purchase_date: "2022-09-08T08:08:08Z",
        original_app_user_id: "$RCAnonymousID:also",
        last_seen: "2022-09-09T01:04:03Z",
      };
      responseBody.subscriber.subscriptions = { [id]: subscriptionData };
      responseBody.subscriber.entitlements = {
        [name]: { ...entitlementData, product_identifier: id },
      };
      break;
    }
  }
  modifiedResponse.body = JSON.stringify(responseBody);
}

$done(modifiedResponse);
