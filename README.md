# Avenset website

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/697d74df-79b7-4057-88d0-469984099974).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Static upload with FileZilla

Run locally with Node.js 22 or newer:

```sh
npm install
npm run build
```

`npm run build` always packages the website directly in `dist/`, including when
your terminal inherits Lovable environment settings. You do not upload `.output/`,
`dist/client/`, or `dist/server/`; upload the contents of `dist/`.

The project now includes **index.html**. Before the first build it is a build
instruction entry, not the finished website. A successful local `npm run build`
replaces it with a copy of the generated homepage for inspection. That root copy
still references the assets in the upload folder; deploy the contents of `dist`,
not the project-root file on its own.

The generated home document is **dist/index.html**. It is a complete rendered
page, not a placeholder; its styles, images, and interactions need the accompanying
assets. Upload **all contents of dist**, not just index.html, to your domain's web
root (for example `public_html`):

```text
dist/
  index.html
  assets/
  public/
  about/index.html
  product/index.html
  book/index.html
  contact/index.html
  privacy/index.html
  terms/index.html
  favicon.ico
  robots.txt
```

Page directories are intentional: Apache can open or refresh `/about/` and the
other pages using their own index.html, without a running Node server or SPA
rewrite configuration. Deploy at the domain root; subdirectory hosting is not
configured. Vite keeps root public-file copies for existing URLs and the exporter
also includes the requested `public/` folder. No `client/` or `server/` directory
is included in the local upload output.

**Contact form limitation:** a static host cannot execute the contact submission
server function. The page renders, but saving messages requires the hosted
application or a separately configured service. Appointment and demo links still
open https://login.avenset.com. Do not put private service keys into static files.

`npm run build:hosted` keeps the full-stack output for a server deployment.
Managed Lovable builds using Bun also preserve that output automatically.

Still awaiting supplied content: the demo video and genuine doctor/director
photos, names, positions, and specialties.
