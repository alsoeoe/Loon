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
};

function processRequest(request) {
  delete request.headers["x-revenuecat-etag"];
  delete request.headers["X-RevenueCat-ETag"];
  return { headers: request.headers };
}

function processResponse(response, request) {
  let matched = false;

  if (response && response.subscriber) {
    const userAgent = request.headers["user-agent"];
    const subscriptionData = {
      is_sandbox: !1,
      ownership_type: "PURCHASED",
      billing_issues_detected_at: null,
      period_type: "normal",
      expires_date: "2099-12-18T08:08:06Z",
      grace_period_expires_date: null,
      unsubscribe_detected_at: null,
      original_purchase_date: "2022-02-08T08:08:08Z",
      purchase_date: "2022-02-08T08:08:06Z",
      store: "app_store",
    };
    const entitlementData = {
      grace_period_expires_date: null,
      purchase_date: "2022-02-08T08:08:06Z",
      expires_date: "2099-12-18T08:08:06Z",
    };
    for (const appName in UAMappings) {
      if (userAgent.startsWith(appName)) {
        console.log(`找到匹配：${appName}`);
        const { name, id } = UAMappings[appName];
        response.subscriber = {
          non_subscriptions: {},
          first_seen: "2022-02-08T08:08:06Z",
          original_application_version: "8",
          other_purchases: {},
          management_url: "https://apps.apple.com/account/subscriptions",
          subscriptions: {},
          entitlements: {},
          original_purchase_date: "2022-02-06T08:08:06Z",
          original_app_user_id: "$RCAnonymousID:also",
          last_seen: "2022-02-08T01:04:03Z",
        };
        response.subscriber.subscriptions = { [id]: subscriptionData };
        response.subscriber.entitlements = {
          [name]: { ...entitlementData, product_identifier: id },
        };
        matched = true;

        break;
      }
    }
  }
  if (!matched) {
    console.log("未找到匹配，返回原始数据");
    return JSON.stringify(response); // 返回未修改的响应
  }
  return JSON.stringify(response);
}

const modifiedResponse = {};
if (!$request) {
  modifiedResponse.headers = processRequest($request);
} else {
  modifiedResponse.body = processResponse(responseBody, $request);
}

$done(modifiedResponse);
