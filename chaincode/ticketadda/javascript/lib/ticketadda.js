
'use strict';

const { Contract } = require('fabric-contract-api');

class TicketAdda extends Contract{

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        console.info('============= END : Initialize Ledger ===========');
    }

    async passengerExists(ctx, passengerId) {
        const buffer = await ctx.stub.getState(passengerId);

        if( buffer && buffer.length > 0){
          const passenger = JSON.parse(buffer.toString());
          if(passenger.type!= 'passenger')
          {
              return false;
          } 
          else return true;
        }
        else return false;
      }  

    async createPassenger(ctx, passengerID, name, age, gender, isPublic) {
        // Check if the passenger already exists
        passengerID = passengerID
        const exists = await this.passengerExists(ctx, passengerID);
        if (exists) {
            throw new Error(`The passenger ${passengerID} already exists`);
        }
    
        // Create a new passenger object
        const passenger = {
            ID: passengerID,
            Name: name,
            Age: age,
            Gender: gender,
            IsPublic: isPublic || false,
            type : 'passenger'
        };
    
        // Convert the passenger object to a buffer and save to the ledger
        const passengerBuffer = Buffer.from(JSON.stringify(passenger));
        await ctx.stub.putState(passengerID, passengerBuffer);
    
        // Emit an event to indicate that a new passenger has been created
        const eventPayload = `New passenger created with ID: ${passengerID}`;
        await ctx.stub.setEvent('CreatePassengerEvent', Buffer.from(eventPayload));
    
        // Return the newly created passenger object
        return passenger;
    }

    async deletePassenger(ctx, passengerID) {
        // Check if the passenger exists
        const exists = await this.passengerExists(ctx, passengerID);
        if (!exists) {
            throw new Error(`The passenger ${passengerID} does not exist`);
        }
    
        // Delete the passenger from the ledger
        await ctx.stub.deleteState(passengerID);
    
        // Emit an event to indicate that a passenger has been deleted
        const eventPayload = `Passenger deleted with ID: ${passengerID}`;
        await ctx.stub.setEvent('DeletePassengerEvent', Buffer.from(eventPayload));
    }

    async updatePassenger(ctx, passengerID, name, age, gender, isAnonymous) {
        // Check if the passenger exists
        const passengerBuffer = await ctx.stub.getState(passengerID);
        if (!passengerBuffer || passengerBuffer.length === 0) {
          throw new Error(`Passenger ${passengerID} does not exist`);
        }
      
        // Update the passenger object
        const passenger = JSON.parse(passengerBuffer.toString());
        passenger.Name = name;
        passenger.Age = age;
        passenger.Gender = gender;
        passenger.IsAnonymous = isAnonymous;
      
        // Convert the passenger object to a buffer and save to the ledger
        const updatedPassengerBuffer = Buffer.from(JSON.stringify(passenger));
        await ctx.stub.putState(passengerID, updatedPassengerBuffer);
      
        // Emit an event to indicate that the passenger has been updated
        const eventPayload = `Passenger ${passengerID} has been updated`;
        await ctx.stub.setEvent('UpdatePassengerEvent', Buffer.from(eventPayload));
      
        // Return the updated passenger object
        return passenger;
      }
    
    async getPassengerDetails(ctx, passengerID) {
        const passengerAsBytes = await ctx.stub.getState(passengerID); // get the passenger from chaincode state
        if (!passengerAsBytes || passengerAsBytes.length === 0) {
          throw new Error(`${passengerID} does not exist`);
        }
        const passenger = JSON.parse(passengerAsBytes.toString());
        return passenger;
      }

    async transporterExists(ctx, transporterID) {
        const transporterBuffer = await ctx.stub.getState(transporterID);

        if( transporterBuffer && transporterBuffer.length > 0){
          const transporter = JSON.parse(transporterBuffer.toString());
          if(transporter.type!= 'transporter')
          {
              return false;
          } 
          else return true;
        }
        return false;
      }
            
    async transportExists(ctx, transportID) {
        const transportBuffer = await ctx.stub.getState(transportID);

        
        if( transportBuffer && transportBuffer.length > 0){
          const transport = JSON.parse(transportBuffer.toString());
          if(transport.type!= 'transport')
          {
              return false;
          } 
          else return true;
        }
        else return false;
      }
            
    async createModeOfTransport(ctx, ProviderID, name, capacity, speed, source, destination) {
        // Check if the mode of transport already exists
        const transportID = ProviderID + name;
        const exists = await this.transporterExists(ctx, ProviderID);

        if (!exists) {
            throw new Error(`Transporter ${ProviderID} does not exists`);
        }
        const exists2 = await this.transportExists(ctx, transportID);
        
        if (exists2) {
          throw new Error(`The mode of transport ${transportID} already exists`);
        }

        
        // Create a new mode of transport object
        const modeOfTransport = {
            ID: transportID,      
            Name: name,
            Capacity: capacity,
            Speed: speed,
            Source: source,
            Destination: destination,
            type: 'transport',
            SeatsBooked: 0
        };
    
        // Convert the mode of transport object to a buffer and save to the ledger
        const transportBuffer = Buffer.from(JSON.stringify(modeOfTransport));
        await ctx.stub.putState(transportID, transportBuffer);
    
        // Emit an event to indicate that a new mode of transport has been created
        const eventPayload = `New mode of transport created with ID: ${transportID}`;
        await ctx.stub.setEvent('CreateModeOfTransportEvent', Buffer.from(eventPayload));


        
        // To make search using source and destination
        
        const compositeKey = ctx.stub.createCompositeKey('transport', [source, destination]);
        // Convert the transport object to a buffer
        const transportBuffer2 = Buffer.from(JSON.stringify(modeOfTransport));
    
        const existingTransportBuffer = await ctx.stub.getState(compositeKey);
        if (existingTransportBuffer && existingTransportBuffer.length > 0) {
          // Deserialize the existing buffer to an array of transport objects
          const existingTransportObjects = JSON.parse(existingTransportBuffer.toString());
      
          if (Array.isArray(existingTransportObjects)) {
              // Append the new mode of transport object to the existing array
              existingTransportObjects.push(modeOfTransport);
      
              // Serialize the updated array back to a buffer
              const updatedTransportBuffer = Buffer.from(JSON.stringify(existingTransportObjects));
      
              // Save the updated buffer back to the ledger
              await ctx.stub.putState(compositeKey, updatedTransportBuffer);
          } else {
              // If the existing value is not an array, create a new array containing both the existing and new mode of transport objects
              const updatedTransportObjects = [JSON.parse(existingTransportBuffer.toString()), modeOfTransport];
      
              // Serialize the updated array back to a buffer
              const updatedTransportBuffer = Buffer.from(JSON.stringify(updatedTransportObjects));
      
              // Save the updated buffer back to the ledger
              await ctx.stub.putState(compositeKey, updatedTransportBuffer);
          }
          } else {
              // If no existing value, save the new buffer as the value for the composite key
              await ctx.stub.putState(compositeKey, transportBuffer);
          }
    
        // Return the newly created mode of transport object
        return modeOfTransport;
    }
    

    async deleteModeOfTransport(ctx, transportID) {
        // Check if the mode of transport exists
        const exists = await this.transportExists(ctx, transportID);
        if (!exists) {
          throw new Error(`The mode of transport ${transportID} does not exist`);
        }
      
        // Delete the mode of transport from the ledger
        await ctx.stub.deleteState(transportID);
      
        // Emit an event to indicate that a mode of transport has been deleted
        const eventPayload = `Mode of transport with ID: ${transportID} has been deleted`;
        await ctx.stub.setEvent('DeleteModeOfTransportEvent', Buffer.from(eventPayload));
      }
    
    async getTransportation(ctx, transportID) {
        const transportAsBytes = await ctx.stub.getState(transportID); // get the transportation from chaincode state
        if (!transportAsBytes || transportAsBytes.length === 0) {
          throw new Error(`${transportID} does not exist`);
        }
        const transport = JSON.parse(transportAsBytes.toString());
        return transport;
      }
    
    async updateTransportationDetails(ctx, transportID, name, capacity, speed, source, destination) {
        // Check if the mode of transport exists
        const exists = await this.transporterExists(ctx, transportID);
        if (!exists) {
            throw new Error(`The mode of transport ${transportID} does not exist`);
        }
    
        // Retrieve the current mode of transport object
        const transportBuffer = await ctx.stub.getState(transportID);
        const modeOfTransport = JSON.parse(transportBuffer.toString());
    
        // Update the mode of transport object with the new details
        if (name) {
            modeOfTransport.Name = name;
        }
        if (capacity) {
            modeOfTransport.Capacity = capacity;
        }
        if (speed) {
            modeOfTransport.Speed = speed;
        }
        if (source) {
            modeOfTransport.Source = source;
        }
        if (destination) {
            modeOfTransport.Destination = destination;
        }
    
        // Convert the updated mode of transport object to a buffer and save to the ledger
        const updatedTransportBuffer = Buffer.from(JSON.stringify(modeOfTransport));
        await ctx.stub.putState(transportID, updatedTransportBuffer);
    
        // Emit an event to indicate that the mode of transport has been updated
        const eventPayload = `Mode of transport updated with ID: ${transportID}`;
        await ctx.stub.setEvent('UpdateTransportationDetailsEvent', Buffer.from(eventPayload));
    
        // Return the updated mode of transport object
        return modeOfTransport;
    }


    // async transportProviderExists(ctx, providerID) {
    //   const providerBuffer = await ctx.stub.getState(providerID);
    //   return providerBuffer && providerBuffer.length > 0;
    // }

    async createTransportProvider(ctx, providerID, name, address, contact) {
        // Check if the transportation provider already exists
        
        const exists = await this.transporterExists(ctx, providerID);
        if (exists) {
            throw new Error(`The transportation provider ${providerID} already exists`);
        }    
        // Create a new transportation provider object
        const transportProvider = {
            ID: providerID,
            Name: name,
            Address: address,
            Contact: contact,
            type : 'transporter'
        };
    
        // Convert the transportation provider object to a buffer and save to the ledger
        const providerBuffer = Buffer.from(JSON.stringify(transportProvider));
        await ctx.stub.putState(providerID, providerBuffer);
    
        // Emit an event to indicate that a new transportation provider has been created
        const eventPayload = `New transportation provider created with ID: ${providerID}`;
        await ctx.stub.setEvent('CreateTransportProviderEvent', Buffer.from(eventPayload));
    
        // Return the newly created transportation provider object
        return transportProvider;
    }

    async deleteTransportProvider(ctx, providerID) {
        // Check if the transportation provider exists
        // const exists = await this.transportProviderExists(ctx, providerID);
        const exists = await this.transporterExists(ctx, providerID);
        if (!exists) {
           return "The transportation provider " +providerID+" does not exist";
        }
    
        // Delete the transportation provider from the ledger
        await ctx.stub.deleteState(providerID);
    
        // Emit an event to indicate that a transportation provider has been deleted
        const eventPayload = `Transportation provider with ID ${providerID} has been deleted`;
        await ctx.stub.setEvent('DeleteTransportProviderEvent', Buffer.from(eventPayload));

        return "Transportation provider with ID " + providerID+ " has been deleted";
    }

    async calculateTicketPrice(ctx, transportID) {
        // Retrieve the mode of transport from the ledger
        const transportBuffer = await ctx.stub.getState(transportID);
        if (!transportBuffer || transportBuffer.length === 0) {
            throw new Error(`The mode of transport ${transportID} does not exist`);
        }
    
        // Parse the mode of transport object
        const modeOfTransport = JSON.parse(transportBuffer.toString());
    
        // Define the base price and the price factors
        let basePrice = 50;
        let capacityFactor = 1000;
        let speedFactor = 0.05;
        let typeFactor = 0.2;
        
        // Determine the type factor based on the type of transport
        // if (modeOfTransport.Type === "Bus") {
        //     typeFactor = 0.2;
        // } else if (modeOfTransport.Type === "Train") {
        //     typeFactor = 0.3;
        // } else if (modeOfTransport.Type === "Flight") {
        //     typeFactor = 0.5;
        // }
    
        // Calculate the final ticket price based on the factors
        let ticketPrice = basePrice;
        ticketPrice += capacityFactor / (modeOfTransport.Capacity - modeOfTransport.SeatsBooked);
        ticketPrice += speedFactor * modeOfTransport.Speed;
        ticketPrice += typeFactor * basePrice;
    
        // Return the calculated ticket price
        return ticketPrice;
    }
    
      
    async bookTicket(ctx, passengerID, transportID, noSeats) {
        // Check if the passenger and mode of transport exist
        const passengerExists = await this.passengerExists(ctx, passengerID);
        if (!passengerExists) {
          throw new Error(`The passenger ${passengerID} does not exist`);
        }
      
        const transportExists = await this.transportExists(ctx, transportID);
        if (!transportExists) {
          throw new Error(`The mode of transport ${transportID} does not exist`);
        }
      
        // Check if there are available seats on the mode of transport
        const transportBuffer = await ctx.stub.getState(transportID);
        const modeOfTransport = JSON.parse(transportBuffer.toString());
        let tempSeatsBooked = parseInt(modeOfTransport.SeatsBooked);
        let tempCapacity = parseInt(modeOfTransport.Capacity);
        let tempnoSeats = parseInt(noSeats);

        const seatsAvailable = tempCapacity - tempSeatsBooked;
        if (seatsAvailable < tempnoSeats) {
          throw new Error(`There are no available seats on the mode of transport ${typeof noSeats}`);
        }
      
        // Increment the number of seats booked on the mode of transport
        tempSeatsBooked += tempnoSeats;
        modeOfTransport.SeatsBooked = tempSeatsBooked;
        const updatedTransportBuffer = Buffer.from(JSON.stringify(modeOfTransport));
        await ctx.stub.putState(transportID, updatedTransportBuffer);
      
        // Generate a unique ID for the ticket
        const ticketID = ctx.stub.getTxID();
      
        // Create a new ticket object
        const ticket = {
          ID: ticketID,
          PassengerID: passengerID,
          TransportID: transportID,
          Price: null,
          Status: 'Booked',
          DateBooked: new Date().toISOString(),
          SeatsBooked: noSeats,
          Type: 'booking'
        };
      
        // Calculate the ticket price dynamically based on the mode of transport and update the ticket object
        // const price = await this.calculateTicketPrice(ctx, transportID);
        const price = await this.calculateTicketPrice(ctx, transportID);
        ticket.Price = price;
      
        // Save the ticket object to the ledger
        const ticketBuffer = Buffer.from(JSON.stringify(ticket));
        await ctx.stub.putState(ticketID, ticketBuffer);
      
        // Emit an event to indicate that a new ticket has been booked
        const eventPayload = `New ticket booked with ID: ${ticketID}`;
        await ctx.stub.setEvent('BookTicketEvent', Buffer.from(eventPayload));
      
        // Return the newly created ticket object
        return ticket;
    }
    
    async bookingExists(ctx, bookingID) {
      const bookingBuffer = await ctx.stub.getState(bookingID);
      return bookingBuffer && bookingBuffer.length > 0;
    }
    
    async validateTicket(ctx, bookingID) {
      const bookingBuffer = await ctx.stub.getState(bookingID);
      if (bookingBuffer && bookingBuffer.length > 0) return 1;
      else return 0;
    }
    
    async cancelBooking(ctx, userID, bookingID) {
        // Check if the booking exists
        const exists = await this.bookingExists(ctx, bookingID);
        if (!exists) {
            throw new Error(`The booking ${bookingID} does not exist`);
        }
    
        // Retrieve the current booking object
        const bookingBuffer = await ctx.stub.getState(bookingID);
        const booking = JSON.parse(bookingBuffer.toString());
        
        // Check for correct passenger
        if(booking.PassengerID != userID){
          throw new Error(`Unauthorised ${bookingID}`);
        }

        // Update the seatsbooked value for the corresponding transportation
        const transportID = booking.TransportID;
        const transportBuffer = await ctx.stub.getState(transportID);
        const transport = JSON.parse(transportBuffer.toString());
        transport.SeatsBooked -= booking.SeatsBooked;
        const updatedTransportBuffer = Buffer.from(JSON.stringify(transport));
        await ctx.stub.putState(transportID, updatedTransportBuffer);
    
        // Delete the booking object from the ledger
        await ctx.stub.deleteState(bookingID);

        // Check if the state has been deleted
        const deletedBuffer = await ctx.stub.getState(bookingID);
        console.log(`Deleted buffer: ${deletedBuffer}`);
        
        // Emit an event to indicate that the booking has been cancelled
        const eventPayload = `Booking cancelled with ID: ${bookingID}`;
        await ctx.stub.setEvent('CancelBookingEvent', Buffer.from(eventPayload));
    }
      
    async findAvailableSeats(ctx, transportID) {
        const transportBuffer = await ctx.stub.getState(transportID);
        if (!transportBuffer || transportBuffer.length === 0) {
          throw new Error(`Mode of transport ${transportID} does not exist`);
        }
        const modeOfTransport = JSON.parse(transportBuffer.toString());
        const seatsBooked = modeOfTransport.SeatsBooked;
        const availableSeats = modeOfTransport.Capacity - seatsBooked;
        return availableSeats;
    }
    
    async getAllBookingsForPassenger(ctx, passengerID) {
        const queryString = {
          selector: {
            Type: "booking",
            PassengerID: passengerID,
          },
        };
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const results = [];
        let res = await iterator.next();
        while (!res.done) {
          const booking = JSON.parse(res.value.value.toString('utf8'));
          results.push(booking);
          res = await iterator.next();
        }
        return results;
      }
      
    async findAvailableTransport(ctx, source, destination) {
      // Retrieve all mode of transport objects from the ledger
      const compositeKey = ctx.stub.createCompositeKey('transport', [source, destination]);

      // Query the state for the composite key
      const transportBytes = await ctx.stub.getState(compositeKey);
  
      // Check if transport exists in the ledger
      if (!transportBytes || transportBytes.length === 0) {
          throw new Error(`Transport not found for date ${date}, source ${source}, destination ${destination}`);
      }
  
      // Parse the transport object from the state
      const transport = JSON.parse(transportBytes.toString());
  
      // Return the transport object
      return transport;
      }
}

module.exports = TicketAdda;