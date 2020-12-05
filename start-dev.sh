#!/bin/bash
pids=()



# trap 'stop' EXIT SIGINT SIGTERM
trap 'kill $(jobs -pr)' SIGINT

cd lls-backend || exit
npm install
npm run dev &> server.log &

cd ../lls-frontend || exit
yarn install || npm install

npm start  &> client.log &

cd .. || exit



tail -n 100 -F lls-backend/server.log -F lls-frontend/client.log 

