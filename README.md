# Geo Job Search - CodeClan week 5 project

This project can be run inside a docker container for development. Follw these steps for setup:

- Navigate to the top level directory (containing the docker-compose.yml file) and run this command:

    docker-compose run --service-ports client
  
- Once you a presented with a prompt, run the following commands:

    npm install
    
    npm start
    
- Open a browser tab at localhost:3001

# The project

This is a pub-sub project developed in vanilla JavaScript backed by an express server and postgres database. The app makes use of the Leaflet api to display locations on a map.
