from node:9.4.0
WORKDIR /usr/src/app
COPY . .
RUN /bin/bash -c 'yarn --pure-lockfile && yarn build'

EXPOSE 5000

CMD [ "yarn", "start" ]

