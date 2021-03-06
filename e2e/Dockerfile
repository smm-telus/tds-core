# The Dockerfile is the description of all the commands to run to assemble the image.
# Read about all the commands here: https://docs.docker.com/engine/reference/builder/

# We also have a docker-compose.yml file, which is used to build and run this Docker image.


# Start from the official Node 8 alpine image. https://hub.docker.com/_/node/
FROM node:8

# Disable update check
ENV NO_UPDATE_NOTIFIER=true

# Set the working directory for following commands.
ENV HOME=/tds-core
WORKDIR /tds-core

# Add a user so that we don't run as root:
#  https://github.com/telusdigital/reference-architecture/blob/3ff683dd68b247ac9a3febda828105fe52cd9390/delivery/docker.md#root-vs-user-mode
RUN set -ex && \
    adduser node root && \
    chmod g+w /

# Install Google Chrome, which is necessary for the e2e tests.
RUN apt-get update && apt-get install -y wget --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge --auto-remove -y curl \
    && rm -rf /src/*.deb

# Install git, which is necessary for the install process.
RUN apt-get update && \
  apt-get install git


# Copy only the files necessary to install dependencies into the working directory.
# Docker builds the image in layers and caches them. Because the app files change more often than the dependencies, we
#  copy the app files only after we install the dependencies.
COPY package.json package-lock.json lerna.json ./

# Install our dependendies
RUN npm ci

# Remove the previously copied lerna.json.
# This will be replaced by mounting the original under volumes. This allows for it to be properly accessed by our scripts.
RUN rm lerna.json

# Set the container's user to the newly created one.
USER node

# The entrypoint configures the container to be run as an executable.
# Arguments supplied on the command line will be forwarded onto the entrypoint.
ENTRYPOINT ["npm", "run", "test:e2e-direct", "--"]
