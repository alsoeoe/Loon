const modifiedResponse = {};
let responseBody = JSON.parse($response ? $response.body : null);

// 动态ID映射
const productIDMap = {
  "com.sugarmo.ScrollClip": {
    name: "picsewV3.9.4",
    product_id: "com.sugarmo.ScrollClip.pro",
    mark: 1,
  },
  "net.shinyfrog.bear-iOS": {
    name: "bear",
    product_id: "net.shinyfrog.bear_iOS.pro_yearly_subscription_bis",
    mark: 0,
  },
  "com.paha.CapyMood": {
    name: "CapyMood",
    product_id: "com.paha.CapyMood.year",
    mark: 0,
  },
  "com.kobaltlab.HashPhotos": {
    name: "HashPhotos",
    product_id: "com.kobaltlab.HashPhotos.iap.pro1year",
    mark: 0,
  },
  "com.stress.test.record": {
    name: "fishfun",
    product_id: "com.stress.test.record.yearly",
    mark: 0,
  },
};

// 固定部分
if (!$response) {
  // 处理请求
  // 这里可以添加删除或修改请求头的代码
} else if (responseBody && responseBody.receipt) {
  // console.log(`修改前：${JSON.stringify(responseBody)}\n`);

  // 处理响应
  const bundleID = responseBody.receipt.bundle_id;
  const mapping = productIDMap[bundleID];

  const inAppData = {
    product_id: mapping.product_id,
    quantity: "1",
    expires_date: "2099-12-18 23:59:59 Etc/GMT",
    expires_date_pst: "2099-12-18 23:59:59 America/Los_Angeles",
    expires_date_ms: "4101292799000",
    is_in_intro_offer_period: "false",
    transaction_id: "100000000000000",
    is_trial_period: "false",
    original_transaction_id: "100000000000000",
    purchase_date_ms: "1701705599000",
    purchase_date: "2023-12-04 23:59:59 Etc/GMT",
    purchase_date_pst: "2023-12-04 23:59:59 America/Los_Angeles",
    original_purchase_date: "2023-12-04 23:59:59 Etc/GMT",
    original_purchase_date_pst: "2023-12-04 23:59:59 America/Los_Angeles",
    original_purchase_date_ms: "1701705599000",
    in_app_ownership_type: "PURCHASED",
    web_order_line_item_id: "100000000000000",
  };

  if (mapping.mark) {
    delete inAppData.expires_date;
    delete inAppData.expires_date_ms;
    delete inAppData.expires_date_pst;
  } else {
    responseBody.latest_receipt_info = [inAppData];
    responseBody.latest_receipt = "also";
    responseBody.pending_renewal_info = [
      {
        product_id: mapping.product_id,
        original_transaction_id: "100000000000000",
        auto_renew_product_id: mapping.product_id,
        auto_renew_status: "1",
      },
    ];
  }
  responseBody.receipt.in_app = [inAppData];
}

// console.log(`修改后：${JSON.stringify(responseBody)}\n`);

modifiedResponse.body = JSON.stringify(responseBody);

$done(modifiedResponse);
