## Project Description

This report presents an innovative and cutting-edge solution for ticket booking in the transportation industry - ”TicketADDA,” a blockchain-based ticket booking system. It is a project designed for bus transport services to simplify the ticket booking process for passengers and providers alike. It facilitates the seamless and secure booking of tickets for bus transport services. It is built using a decentralized architecture that ensures data privacy, security, and transparency.

## Dependencies

- OS Support - Ubuntu 16.04 LTE or above
- Docker
- NodeJS(v19.9.0 preferred)
    - ReactJS(Frontend Language)
    - Express(Web Application Framework)
- npm(v9.6.4 preferred)

## Usage Instructions

- Navigate to ./Ticket ADDA/ticketadda/javascript folder
- Execute startFabric.sh file to set up the organizations and deploy chaincode on it
    
    ```bash
    ./startFabric.sh
    ```
    
- Next, navigate to the ./Ticket ADDA/server folder
- Execute “npm install” to install all node modules(NodeJS is required)
    
    ```bash
    npm install
    ```
    
- Execute “npm run dev” command to start the server which collects the reponse and sends to the respective path
    
    ```bash
    npm run dev
    ```
    
- Next, navigate to the ./Ticket ADDA/client
- Execute “npm install” to install all node modules(NodeJS is required)
    
    ```bash
    npm install
    ```
    
- Execute “npm start” to run the frontend development server. This will open the webpage in your default browser
    
    ```bash
    npm start
    ```
    
- To shutdown the network, navigate to ./Ticket ADDA/ticketadda/javascript folder and execute networkDown.sh file
    
    ```bash
    ./networkDown.sh
    ```
    

##