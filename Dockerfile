FROM node:argon

# RUN apt-get update && apt-get install -y \
#    curl \
#    s3cmd=1.1.* \
# && rm -rf /var/lib/apt/lists/*

# prepare install app dependencies
COPY package.json /usr/app/
# set working directory
WORKDIR /usr/app
# install app dependencies
RUN npm install --production

# Bundle app source
COPY ./src /usr/app/src

RUN groupadd -g 999 appuser && \
    useradd -r -u 999 -g appuser appuser -d /home/appuser && \
    chown -R appuser.appuser /usr/app

USER appuser

EXPOSE 8080

CMD [ "npm", "start" ]
