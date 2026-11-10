<div align="center">

<img src="app/assets/PixivNow.svg" alt="PixivNow Logo" width="200"/>

PixivNow - Now, everyone can enjoy Pixiv!

</div>

## Deploy

### Docker (Recommended)

```bash
git clone https://github.com/FreeNowOrg/PixivNow.git
cd PixivNow
docker compose up -d
```

The service will start at `http://localhost:3000`.

Rebuild after code updates:

```bash
git pull && docker compose up -d --build
```

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FFreeNowOrg%2FPixivNow&demo-title=PixivNow)

Click the button above to deploy with one click, or fork the repo and import the project in Vercel.

If you plan to make your deployment public, watch your billing carefully. PixivNow could be abused to bulk-download images, causing traffic spikes and high costs.

### Manual Build

Requires [Node.js](https://nodejs.org/) LTS and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm build
node .output/server/index.mjs
```

## Environment Variables

| Variable                          | Description                          | Default |
| --------------------------------- | ------------------------------------ | ------- |
| `NUXT_PUBLIC_PXIMG_BASEURL_I`     | Proxy address for i.pximg.net images | `/-/`   |
| `NUXT_PUBLIC_PXIMG_BASEURL_S`     | Proxy address for s.pximg.net images | `/~/`   |
| `NUXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Google Analytics ID                  | —       |
| `NUXT_UA_BLACKLIST`               | Blocked UA patterns (JSON array)     | —       |

For Docker deployments, you can add `environment` configuration in `docker-compose.yml`.

## API

> Request format and examples for the AJAX API: [pixiv-web-api.md](docs/pixiv-web-api.md)

### Authentication

Pass the user token for authentication via either of the following:

- Header `Authorization`
- Cookie `PHPSESSID`

Responses for request paths `/ajax/*` behave the same as `https://pixiv.net/ajax/*`.

### `/api/illust/random`

Returns random images (syntactic sugar for `/ajax/illust/discovery`).

| Parameter | Type                       | Description                                                                          |
| --------- | -------------------------- | ------------------------------------------------------------------------------------ |
| `max`     | `number`                   | Number of images to return                                                           |
| `mode`    | `'all' \| 'safe' \| 'r18'` | `r18` requires login with an account that allows it                                  |
| `format`  | `'image' \| 'json'`        | Defaults to `image` when `Accept` includes `image`; image mode returns a redirect   |

### `/api/ranking`

Redirect for `/ranking.php`.

### `/api/user`

Helper endpoint that returns the current logged-in user info (globalData->userData) from the provided token.

## UI Style Guide

[Neubrutalism](https://neubrutalism.com/)

[Design Guide](docs/design-guide.md)

---

_For communication and learning only._

**All data & pictures from query:** &copy;pixiv Inc. & original authors

> Source code licensed under the [Apache License 2.0](LICENSE).
>
> The PixivNow logo and brand assets are licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) — not the Apache License. See [app/assets/LICENSE](app/assets/LICENSE) for details.
>
> "Pixiv" is a trademark of pixiv Inc. This project is not affiliated with, endorsed by, or sponsored by pixiv Inc.
