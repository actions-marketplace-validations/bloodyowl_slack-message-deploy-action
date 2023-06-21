let { IncomingWebhook } = require("@slack/webhook");
import { getOctokit } from "@actions/github";

async function slackMessageRelease({
  githubRepository,
  token,
  version,
  env,
  slackWebhookUrl,
}) {
  let webhook = new IncomingWebhook(slackWebhookUrl);
  const octokit = getOctokit(token);

  let [org, repository] = githubRepository.split("/");

  const { data: release } = await octokit.request(
    "GET /repos/{owner}/{repo}/releases/tags/{tag}",
    {
      owner: org,
      repo: repository,
      tag: version,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  await webhook.send({
    mrkdwn: true,
    text: `*${repository} ${version}* has been released on ${env} ✨
${release.body
  .split("\n")
  .filter((item) => !item.startsWith("#") && !item.startsWith("**"))
  .join("\n")
  .trim()
  .split("\n")
  .map(
    (x) =>
      `> ${x
        .replace(/^-/, "•")
        .replace(
          /(https:\/\/github.com\/.+?\/.+?\/pull\/(\S+))/g,
          "[#$2]($1)"
        )}`
  )
  .join("\n")}
`,
  });
}

module.exports = slackMessageRelease;
