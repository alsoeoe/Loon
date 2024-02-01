var responseBody = JSON.parse($response.body);

// 设置所有属性为 true
const attributes = [
  "eligible_for_pro_features",
  "has_active_subscription",
  "eligible_for_ai",
  "eligible_for_gpt4",
  "eligible_for_ai_citations",
  "eligible_for_developer_hub",
  "eligible_for_application_settings",
  "publishing_bot",
  "has_pro_features",
  "has_better_ai",
  "can_upgrade_to_pro", // 注意这个属性是 false
  "admin",
];

// 应用属性值
attributes.forEach((attr) => {
  responseBody[attr] = attr !== "can_upgrade_to_pro";
});

// 设置特定属性值
responseBody["can_upgrade_to_pro"] = false;

$done({ body: JSON.stringify(responseBody) });
