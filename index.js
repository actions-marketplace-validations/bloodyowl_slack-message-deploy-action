let core = require("@actions/core");
let slackMessageRelease = require("./slackMessageRelease.js");

slackMessageRelease({
  githubRepository: process.env.GITHUB_REPOSITORY,
  version: core.getInput("version"),
  env: core.getInput("env"),
  githubRunId: process.env.GITHUB_RUN_ID,
  slackWebhookUrl: core.getInput("slack_webhook_url"),
  token,
}).then(
  () => {
    console.log("Message successfully sent 💬");
  },
  (err) => {
    console.error("The following error occured");
    console.error(err);
    process.exit(1);
  }
);
