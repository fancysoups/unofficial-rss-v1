# Unofficial RSS

A simple, free, and open source tool that lets paying subscribers access their podcasts in their favorite apps.

This is the source code for UnofficialRSS.com. It's easy to install on your local device or deploy to a private server.

## Requirements

- Node.js and Yarn
- A MongoDB instance (local or remote)

## Installation

```sh
# Clone Repository
git clone https://github.com/fancysoups/unofficial-rss.git
cd unofficial-rss

# Install Node dependencies
yarn install

# Copy the environment file and customize it
cp .env.example .env
nano .env

# Start app in dev mode
yarn dev

# Or build and start in production mode
yarn build && yarn start PORT=3000
```

## Original work

The majority of this code is adapted from [Unofficial RSS Feeds for Stitcher Premium](https://gitlab.com/stitcher-rss/stitcher-rss) created by [John Long](https://128.io).

## License

This project is licensed under the terms of the [MIT license](LICENSE.md).
