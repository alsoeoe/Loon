const modifiedResponse = {};
const responseBody = {
  non_subscriptions: {},
  request_date_ms: 1662599120248,
  request_date: "2022-02-02T02:02:02Z",
  other_purchases: {},
  subscriber: {
    first_seen: "2022-02-02T02:02:02Z",
    last_seen: "2022-02-02T02:02:02Z",
    original_application_version: "8",
    management_url: "https://apps.apple.com/account/subscriptions",
    subscriptions: {},
    original_purchase_date: "2022-02-02T02:02:02Z",
    original_app_user_id: "also",
  },
  entitlements: {},
  original_purchase_date: "2013-08-01T07:00:00Z",
  original_app_user_id: "Passer_by_yun",
};
if (!$response) {
  // 处理请求
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  modifiedResponse.headers = $request.headers;
} else if (responseBody && responseBody.subscriber) {
  // 处理响应
  const UA = $request.headers["user-agent"];
  const UAMappings = {
    "%E8%B0%9C%E5%BA%95%E6%97%B6%E9%92%9F": {
      name: "Entitlement.Pro",
      id: "tech.miidii.MDClock.subscription.year.v1",
    },
    Stress: { name: "StressWatch Pro", id: "stress_membership_yearly" },
    Spark: { name: "premium", id: "spark_5999_1y_1w0" },
    "Spark%20Desktop": { name: "premium", id: "spark_5999_1y_1w0" },
    MoneyThings: {
      name: "Premium",
      id: "com.lishaohui.cashflow.lifetime",
    },
    Decision: {
      name: "com.nixwang.decision.entitlements.pro",
      id: "com.nixwang.decision.pro",
    },
    ScannerPro: {
      name: "plus",
      id: "com.premium.yearly",
    },
  };
  const subscriptionData = {
    expires_date: "8888-08-08T08:08:08Z",
    original_purchase_date: "2022-02-02T02:02:02Z",
    purchase_date: "2022-02-02T02:02:02Z",
    ownership_type: "PURCHASED",
    store: "app_store",
  };

  for (const appName in UAMappings) {
    if (new RegExp(`^${appName}`, "i").test(UA)) {
      console.log("找到匹配: ", appName);
      const { name, id } = UAMappings[appName];
      responseBody.subscriber.subscriptions = { [id]: subscriptionData };
      responseBody.subscriber.entitlements = {
        [name]: { ...subscriptionData, product_identifier: id },
      };
      break;
    }
  }
  modifiedResponse.body = JSON.stringify(responseBody);
}

$done(modifiedResponse);

(cuttlefish = {
  Attention: "恭喜你抓到元数据！由墨鱼分享，请勿售卖或分享他人！",
  request_date_ms: 1662599120248,
  request_date: "2022-09-08T01:05:20Z",
  subscriber: {
    non_subscriptions: {},
    first_seen: "2022-09-08T01:04:03Z",
    original_application_version: "8",
    other_purchases: {},
    management_url: "https://apps.apple.com/account/subscriptions",
    subscriptions: {},
    entitlements: {},
    original_purchase_date: "2022-09-07T13:05:43Z",
    original_app_user_id: "$RCAnonymousID:ddgksf2013",
    last_seen: "2022-09-08T01:04:03Z",
  },
}),
  (ddgksf2013 = {
    is_sandbox: !1,
    ownership_type: "PURCHASED",
    billing_issues_detected_at: null,
    period_type: "normal",
    expires_date: "2099-12-18T01:04:17Z",
    grace_period_expires_date: null,
    unsubscribe_detected_at: null,
    original_purchase_date: "2022-09-08T01:04:18Z",
    purchase_date: "2022-09-08T01:04:17Z",
    store: "app_store",
  }),
  (ddgksf2021 = {
    grace_period_expires_date: null,
    purchase_date: "2022-09-08T01:04:17Z",
    product_identifier: "ddgksf2013_1y_128",
    expires_date: "2099-12-18T01:04:17Z",
  }),
  (obj = JSON.parse(JSON.stringify(cuttlefish)));
(ddgksf2021.product_identifier = "com.ddgksf2013.premium.yearly"),
  (obj.subscriber.subscriptions["com.ddgksf2013.premium.yearly"] = ddgksf2013);
const match = Object.keys(mapping).find((e) => ua.includes(e));
if (match) {
  let [e, s] = mapping[match];
  s &&
    ((ddgksf2021.product_identifier = s),
    (obj.subscriber.subscriptions[s] = ddgksf2013)),
    (obj.subscriber.entitlements[e] = ddgksf2021);
} else obj.subscriber.entitlements.pro = ddgksf2021;
$done({ body: JSON.stringify(obj) });
