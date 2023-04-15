
'use strict';

const { Contract } = require('fabric-contract-api');

class TicketAdda extends Contract{

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        console.info('============= END : Initialize Ledger ===========');
    }

    async passengerExists(ctx, passengerId) {
        const buffer = await ctx.stub.getState(passengerId);
        return (!!buffer && buffer.length > 0);
    }

    async createPassenger(ctx, passengerID, name, age, gender, isPublic) {
        // Check if the passenger already exists
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

    async transportExists(ctx, transportID) {
        const transportBuffer = await ctx.stub.getState(transportID);
        return transportBuffer && transportBuffer.length > 0;
      }
            
    
    async createModeOfTransport(ctx, transportID, name, capacity, speed, source, destination, type) {
        // Check if the mode of transport already exists
        const exists = await this.transportExists(ctx, transportID);
        if (exists) {
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
            Type: type,
            SeatsBooked: 0
        };
    
        // Convert the mode of transport object to a buffer and save to the ledger
        const transportBuffer = Buffer.from(JSON.stringify(modeOfTransport));
        await ctx.stub.putState(transportID, transportBuffer);
    
        // Emit an event to indicate that a new mode of transport has been created
        const eventPayload = `New mode of transport created with ID: ${transportID}`;
        await ctx.stub.setEvent('CreateModeOfTransportEvent', Buffer.from(eventPayload));
    
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
    
    async updateTransportationDetails(ctx, transportID, name, capacity, speed, source, destination, type) {
        // Check if the mode of transport exists
        const exists = await this.transportExists(ctx, transportID);
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
        if (type) {
            modeOfTransport.Type = type;
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

    async transportProviderExists(ctx, providerID) {
      const providerBuffer = await ctx.stub.getState(providerID);
      return providerBuffer && providerBuffer.length > 0;
    }

    async createTransportProvider(ctx, providerID, name, address, contact) {
        // Check if the transportation provider already exists
        const exists = await this.transportProviderExists(ctx, providerID);
        if (exists) {
            throw new Error(`The transportation provider ${providerID} already exists`);
        }
    
        // Create a new transportation provider object
        const transportProvider = {
            ID: providerID,
            Name: name,
            Address: address,
            Contact: contact,
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
        const exists = await this.transportProviderExists(ctx, providerID);
        if (!exists) {
            throw new Error(`The transportation provider ${providerID} does not exist`);
        }
    
        // Delete the transportation provider from the ledger
        await ctx.stub.deleteState(providerID);
    
        // Emit an event to indicate that a transportation provider has been deleted
        const eventPayload = `Transportation provider with ID ${providerID} has been deleted`;
        await ctx.stub.setEvent('DeleteTransportProviderEvent', Buffer.from(eventPayload));
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
        let capacityFactor = 0.1;
        let speedFactor = 0.05;
        let typeFactor = 0;
        
        // Determine the type factor based on the type of transport
        if (modeOfTransport.Type === "Bus") {
            typeFactor = 0.2;
        } else if (modeOfTransport.Type === "Train") {
            typeFactor = 0.3;
        } else if (modeOfTransport.Type === "Flight") {
            typeFactor = 0.5;
        }
    
        // Calculate the final ticket price based on the factors
        let ticketPrice = basePrice;
        ticketPrice += capacityFactor * modeOfTransport.Capacity;
        ticketPrice += speedFactor * modeOfTransport.Speed;
        ticketPrice += typeFactor * basePrice;
    
        // Return the calculated ticket price
        return ticketPrice;
    }
    
      
    async bookTicket(ctx, passengerID, transportID) {
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
        const seatsAvailable = modeOfTransport.Capacity - modeOfTransport.SeatsBooked;
        if (seatsAvailable <= 0) {
          throw new Error(`There are no available seats on the mode of transport ${transportID}`);
        }
      
        // Increment the number of seats booked on the mode of transport
        modeOfTransport.SeatsBooked++;
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
        };
      
        // Calculate the ticket price dynamically based on the mode of transport and update the ticket object
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
      
    
    async cancelBooking(ctx, bookingID) {
        // Check if the booking exists
        const exists = await this.bookingExists(ctx, bookingID);
        if (!exists) {
            throw new Error(`The booking ${bookingID} does not exist`);
        }
    
        // Retrieve the current booking object
        const bookingBuffer = await ctx.stub.getState(bookingID);
        const booking = JSON.parse(bookingBuffer.toString());
    
        // Update the seatsbooked value for the corresponding transportation
        const transportID = booking.TransportID;
        const transportBuffer = await ctx.stub.getState(transportID);
        const transport = JSON.parse(transportBuffer.toString());
        transport.SeatsBooked -= booking.SeatsBooked;
        const updatedTransportBuffer = Buffer.from(JSON.stringify(transport));
        await ctx.stub.putState(transportID, updatedTransportBuffer);
    
        // Delete the booking object from the ledger
        await ctx.stub.deleteState(bookingID);
    
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
            passengerID: passengerID,
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
}

module.exports = TicketAdda;