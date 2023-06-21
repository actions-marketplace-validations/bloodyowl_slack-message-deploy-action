# Slack deploy message

<img src="./icon-rounded.png" width="128" height="128" alt="" />

> A GitHub Action to push a slack webhook

This action suits the **deploy on new tag workflow**.

On your release workflow, this action will post to Slack the version, a link to the workflow and the changelog ([if your changelog follows this format](./HISTORY.md)).

## Preview

<img width="382" alt="Screen Shot 2021-06-10 at 13 41 15" src="https://user-images.githubusercontent.com/1688645/121519085-90e28e00-c9f1-11eb-9d8a-8efedcc71647.png">

## On Slack

Go to [Slack's app manager](https://api.slack.com/apps/), create a new app with an incoming webhook for the channel you want, copy the URL, that's your `slack_webhook_url`. If you want to make it pretty, [there's an icon in this repository](./icon.png) you can give to your app.

## Changelog

The changelog will be fetched using the associated GitHub Release.

## Inputs

### version

The version you're releasing (e.g. v1.0.1, 1.0.1)

### env

Environment on which you deploy

### slack_webhook_url

Your slack webhook URL

### token

Your GitHub token

## Example

```yaml
- name: Notify on Slack
  uses: bloodyowl/slack-message-deploy-action@v1.0.0
  with:
    version: v1.0.0
    env: production
    slack_webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
    token: ${{ secrets.GITHUB_TOKEN }}
```
