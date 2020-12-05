#!/bin/bash
pids=()



# trap 'stop' EXIT SIGINT SIGTERM
trap 'kill $(jobs -pr)' SIGINT

# ctrlc_count=0


# function no_ctrlc()
# {
#   let ctrlc_count++;

#   echo
#   if [[ $ctrlc_count == 0 ]]; then

#       echo "Releasing resources..."
#       kill -9 "$pids"
#       # for pid in "${pids[@]}"
#       # do
#       #   echo "killing process with pid $pid"
#       #   kill -9 "$pid"
#       # done
#       #  echo "All node processes released. Press CTRL+C to quit"

#   else
#       exit
#   fi
# }

# trap no_ctrlc EXIT




cd lls-backend || exit
npm install
npm run dev &> server.log &
serverpid=$1

cd ../lls-frontend || exit
yarn install || npm install

npm start  &> client.log &
clientpid=$1

cd .. || exit



tail -n 100 -F lls-backend/server.log -F lls-frontend/client.log 

