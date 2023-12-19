const modifiedResponse = {};
const responseBody = {
  non_subscriptions: {},
  request_date_ms: 1643767322000,
  request_date: "2022-02-02T02:02:02Z",
  other_purchases: {},
  subscriber: {
    first_seen: "2022-02-02T02:02:02Z",
    last_seen: "2022-02-02T02:02:02Z",
    original_application_version: "8",
    management_url: "https://apps.apple.com/account/subscriptions",
    subscriptions: {},
    entitlements: {},
  },
  original_purchase_date: "2022-02-02T02:02:02Z",
  original_app_user_id: "also",
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
      console.log("找到匹配: ");
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
