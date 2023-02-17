FROM node:18-alpine
ARG REACT_APP_GRAPH_API
ENV REACT_APP_GRAPH_API $REACT_APP_GRAPH_API
WORKDIR /usr/src/app
RUN npm i -g serve create-react-app
COPY . .
RUN npm i
RUN npm run build
EXPOSE 3000
CMD serve -s build