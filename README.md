# next-ssr-fallback

![publish](https://github.com/crazyurus/next-ssr-fallback/actions/workflows/publish.yaml/badge.svg)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm](https://badgen.net/npm/v/next-ssr-fallback)](https://www.npmjs.com/package/next-ssr-fallback)
[![npm dependents](https://badgen.net/npm/dependents/next-ssr-fallback)](https://www.npmjs.com/package/next-ssr-fallback?activeTab=dependents)
[![npm downloads](https://badgen.net/npm/dt/next-ssr-fallback)](https://www.npmjs.com/package/next-ssr-fallback)

This library helps you to fallback to CSR more easily when using SSR to avoid **Next.js** app rendering failure.

## Introduction

We usually use `getServerSideProps` in Next.js to fetch the initial properties of SSR. If the acquisition fails due to server-side network problems, Next.js will return a status code of 500, which causes our app to fail to render normally.

In order to solve this problem, we need to add the fallback logic by CSR, and obtain properties on the client again when SSR acquisition fails, so as to improve the success rate of rendering.

This library is to help you do this, it only takes a few lines of code to complete.

## Supported Versions

`next-ssr-fallback` is tested with:

- **next**: `^12.0.0` and above

## Installation

First, install `next-ssr-fallback`:

```bash
$ npm install next-ssr-fallback

# OR

$ yarn add next-ssr-fallback

# OR

$ pnpm install next-ssr-fallback
```

## Usage

You need to make the following changes to the page components:

1. rename the `getServerSideProps` function to `getServerSidePropsOrigin`
2. import `next-ssr-fallback` and create a new `SSRFallback` instance

```js
import FallbackSSR from 'next-ssr-fallback';

const fallbackSSR = new FallbackSSR({
  getServerSideProps: getServerSidePropsOrigin,
});
```

3. modify the export of `getServerSideProps` by using `createGetServerSidePropsFunction`

```js
export const getServerSideProps = fallbackSSR.createGetServerSidePropsFunction();
```

4. Use higher-order component wrappers `withCSR` for page components

```js
export default fallbackSSR.withCSR(PageComponent);
```

That's all there is to it, your page will support fallback to CSR.

## Example

Here is a example [recruit-pc](https://github.com/crazyurus/recruit-pc) using this library. You can refer to how to use.

## License

[MIT](./LICENSE)
