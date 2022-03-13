# Earthstar bundles

[Earthstar](https://earthstar-project.org/) suggests importing the browser bundle from a CDN.

```html
<script type="module">
  import * as Earthstar from "https://cdn.earthstar-project.org/js/earthstar.bundle.v8.2.4.js";
</script>
```

However, I would like to install the bundle locally, so my build environment ([Snowpack](https://www.snowpack.dev/)) can include it and my PWA library ([Workbox](https://developers.google.com/web/tools/workbox)) can cache it. Since Earthstar does not include their browser bundle in the npm packages, this repo serves to provide an alternative option.

Include this repo as a npm dependency in `package.json`. Tagged versions of this repo will correspond with Earthstar versions.

```json
{
  "dependencies": {
    "earthstar-bundle": "basham/earthstar-bundle#v8.2.4"
  }
}
```

Then import the bundle from the `node_modules` folder, like normal.

```js
import * as Earthstar from 'earthstar'
```

## Updating the bundle

1. Update the Earthstar version in `Makefile` and `package.json`.
2. Make the bundle (`make bundle`).
3. Commit.
4. Tag the commit (`git tag v#.#.#`).
5. Push to GitHub (`git push --tags`).
