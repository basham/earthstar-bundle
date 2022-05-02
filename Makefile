version := 9.3.2
url := https://deno.land/x/earthstar@v${version}/mod.browser.ts
out := ./earthstar.bundle.js

bundle:
	deno bundle --no-check=remote ${url} ${out}
