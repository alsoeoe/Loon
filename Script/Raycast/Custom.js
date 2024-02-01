var responseBody = JSON.parse($response.body);
responseBody.organizations = [];
responseBody.trial_limits = {
  commands_limit: 999,
  quicklinks_limit: 999,
  snippets_limit: 999,
};
$done({ body: JSON.stringify(responseBody) });
