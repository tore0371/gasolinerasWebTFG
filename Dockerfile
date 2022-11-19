FROM ubuntu:22.04

RUN apt update -y
RUN apt upgrade -y
RUN apt install curl -y

RUN apt-get install gcc g++ make -y
RUN apt-get install yarn -y
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash
RUN apt-get install -y nodejs
RUN npm install -g create-react-app
RUN apt install git -y