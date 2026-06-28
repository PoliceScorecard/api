**[↤ Developer Overview](../README.md)**

Deploy Update
===

> Here are the instructions on how to deploy updates to this website.

**IMPORTANT:** Before updating the website, you should run any updates to the API first.

Connect to SSH on Digital Ocean
---

1. Login to [Digital Ocean](https://digitalocean.com)
2. Switch to the `Police Scorecard` Team
3. Select the `police-scorecard-api` Droplet
4. Click the `Console` link to open Digital Oceans Web Console
5. Run one of the following scripts based on what you want to update

Run Scripts
---

```bash
# To update https://apidev.policescorecard.org using `develop` branch
/usr/local/bin/deploy-development

# To update https://api.policescorecard.org using `master` branch
/usr/local/bin/deploy-production
```
