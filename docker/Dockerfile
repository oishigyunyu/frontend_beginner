FROM ubuntu:20.04

RUN apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
  sudo curl wget apt-transport-https gnupg \
  ca-certificates \
  gcc build-essential git  nodejs npm

RUN npm install n -g && n stable \
  apt-get purge -y nodejs npm 

RUN npm i -g firebase-tools
ARG username=user
ARG wkdir=/home/${username}/work
RUN echo "root:root" | chpasswd && \
    mkdir -p /etc/sudoers.d && \
    adduser --disabled-password --gecos "" "${username}" && \
    echo "${username}:${username}" | chpasswd && \
    echo "%${username}    ALL=(ALL)   NOPASSWD:    ALL" >> /etc/sudoers.d/${username} && \
    chmod 0440 /etc/sudoers.d/${username} 
    
WORKDIR ${wkdir}
RUN chown ${username}:${username} ${wkdir}
USER ${username}

CMD ["bash"]