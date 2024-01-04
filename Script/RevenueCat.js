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
    "%E8%B0%9C%E5%BA%95%E6%97%B6%E9%92%9F": {
      name: "Entitlement.Pro",
      id: "tech.miidii.MDClock.subscription.year.v1",
    },
    Stress: { name: "StressWatch Pro", id: "stress_membership_yearly" },
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
    Spark: { name: "premium", id: "spark_5999_1y_1w0" },
    Sex: {
      name: "Premium Plus",
      id: "ru.sexactions.subscriptionPromo1",
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
