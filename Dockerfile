
FROM buildpack-deps

# Get up to date, install the bare necessities
# Create "strongloop" user
# DANGEROUS: this is a dev convenience container, everyone has sudo access
RUN DEBIAN_FRONTEND=noninteractive sh -c '( \
    apt-get update -q && \
    apt-get install -y -q curl wget vim man-db ssh bash-completion sudo && \
    apt-get clean && apt-get autoclean)' > /dev/null && \
    useradd -ms /bin/bash strongloop && \
    chown -R strongloop /usr/local && \
    echo "ALL	ALL = (ALL) NOPASSWD: ALL" >> /etc/sudoers

# Set up some semblance of an environment
WORKDIR /home/strongloop
ENV HOME /home/strongloop
USER strongloop

# sha1 points to the v0.10.38-release branch from joyent/node
ENV NODE_SHA1 0b5731a63cc40c4fe9275c79158fe0a5dd4d1609

RUN curl -SLO "https://github.com/strongloop-forks/node/archive/$NODE_SHA1.tar.gz" \
        && mkdir -p /usr/local/src/node \
        && tar -xzf "$NODE_SHA1.tar.gz" -C /usr/local/src/node --strip-components=1 \
        && (cd /usr/local/src/node && ./configure && make -j4 V= install) \
        && rm -rf /usr/local/src/node \
        && npm install -g npm \
        && npm install -g strongloop \
        && npm cache clear \
        && slc --version

# Default to a login shell
# CMD ["/bin/bash", "--login"]


# It is common to copy your current
ADD . /home/strongloop/app
WORKDIR /home/strongloop/app
RUN npm install
run bower install
ENV NODE_ENV production
EXPOSE  3000 3001 3002 3003 52700

CMD [ "PORT=52700", "slc", "arc"]


