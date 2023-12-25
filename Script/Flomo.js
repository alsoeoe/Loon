// const modifiedResponse = {};
// const responseBody = JSON.parse($response ? $response.body : null);
// responseBody.data.pro_expired_at = "2088-08-08 08:08:08";
// responseBody.data.referee_pro_days = "8888";
// modifiedResponse.body = JSON.stringify(responseBody);
// $done(modifiedResponse);
// 定义一个函数来处理响应

function handleResponse(url, responseBody) {
  if (url === "https://flomoapp.com/api/v1/user/me") {
    // 对第一个URL执行的操作
    responseBody.data.pro_expired_at = "2088-08-08 08:08:08";
    responseBody.data.referee_pro_days = "8888";
  } else if (url === "https://flomoapp.com/api/v1/memo/notify_of_today") {
    // 对第二个URL执行的操作
    responseBody.message = "";
    responseBody.code = 0;
  }

  return responseBody;
}

// 假设 $request.url 包含当前请求的URL
const modifiedResponse = {};
const responseBody = JSON.parse($response ? $response.body : null);

// 调用函数并传入URL和响应体
const newResponseBody = handleResponse($request.url, responseBody);

modifiedResponse.body = JSON.stringify(newResponseBody);
$done(modifiedResponse);
