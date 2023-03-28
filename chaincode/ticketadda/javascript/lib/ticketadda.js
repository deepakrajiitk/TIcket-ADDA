
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


    async createPassenger(ctx, passengerId, name, age, isAnonymous) {
        // Check if passenger already exists
        const passengerExists = await this.passengerExists(ctx, passengerId);
        if (passengerExists) {
          throw new Error(`The passenger with ID ${passengerId} already exists.`);
        }
    
        // Create the passenger object
        const passenger = {
          name,
          age,
          isAnonymous,
          bookings: []
        };
    
        // Add the passenger to the state
        await ctx.stub.putState(passengerId, Buffer.from(JSON.stringify(passenger)));
    
        // Return the passenger object
        return passenger;
    }
    
    async readPassenger(ctx, passengerId) {
        // Get the passenger from the state
        const passengerBuffer = await ctx.stub.getState(passengerId);
        if (!passengerBuffer || !passengerBuffer.length) {
          throw new Error(`The passenger with ID ${passengerId} does not exist.`);
        }
    
        // Parse the passenger object and return it
        const passenger = JSON.parse(passengerBuffer.toString());
        return passenger;
    }
    
    async updatePassenger(ctx, passengerId, name, age, isAnonymous) {
        // Get the passenger from the state
        const passengerBuffer = await ctx.stub.getState(passengerId);
        if (!passengerBuffer || !passengerBuffer.length) {
          throw new Error(`The passenger with ID ${passengerId} does not exist.`);
        }
    
        // Parse the passenger object and update it
        const passenger = JSON.parse(passengerBuffer.toString());
        passenger.name = name;
        passenger.age = age;
        passenger.isAnonymous = isAnonymous;
    
        // Update the passenger in the state
        await ctx.stub.putState(passengerId, Buffer.from(JSON.stringify(passenger)));
    
        // Return the updated passenger object
        return passenger;
    }
    
    async deletePassenger(ctx, passengerId) {
        // Get the passenger from the state
        const passengerBuffer = await ctx.stub.getState(passengerId);
        if (!passengerBuffer || !passengerBuffer.length) {
          throw new Error(`The passenger with ID ${passengerId} does not exist.`);
        }
    
        // Delete the passenger from the state
        await ctx.stub.deleteState(passengerId);
    }

    async createTransportation(ctx, transportationId, provider, mode, route, price) {
        const transportation = {
            transportationId: transportationId,
            provider: provider,
            mode: mode,
            route: route,
            price: price
        };

        await ctx.stub.putState(transportationId, Buffer.from(JSON.stringify(transportation)));
        return JSON.stringify(transportation);
    }

    async updateTransportation(ctx, transportationId, updatedProvider, updatedMode, updatedRoute, updatedPrice) {
        const transportationBytes = await ctx.stub.getState(transportationId);

        if (!transportationBytes || transportationBytes.length === 0) {
            throw new Error(`Transportation with id ${transportationId} does not exist`);
        }

        const transportation = JSON.parse(transportationBytes.toString());
        transportation.provider = updatedProvider;
        transportation.mode = updatedMode;
        transportation.route = updatedRoute;
        transportation.price = updatedPrice;

        await ctx.stub.putState(transportationId, Buffer.from(JSON.stringify(transportation)));
        return JSON.stringify(transportation);
    }

    async deleteTransportation(ctx, transportationId) {
        await ctx.stub.deleteState(transportationId);
    }

    async bookTransportation(ctx, passengerId, transportationId) {
        const passengerBytes = await ctx.stub.getState(passengerId);
        const transportationBytes = await ctx.stub.getState(transportationId);

        if (!passengerBytes || passengerBytes.length === 0) {
            throw new Error(`Passenger with id ${passengerId} does not exist`);
        }

        if (!transportationBytes || transportationBytes.length === 0) {
            throw new Error(`Transportation with id ${transportationId} does not exist`);
        }

        const passenger = JSON.parse(passengerBytes.toString());
        const transportation = JSON.parse(transportationBytes.toString());

        if (!passenger.isPublic) {
            throw new Error(`Passenger with id ${passengerId} is not public`);
        }

        if (transportation.booked) {
            throw new Error(`Transportation with id ${transportationId} is already booked`);
        }

        transportation.booked = true;
        transportation.passengerId = passengerId;

        await ctx.stub.putState(transportationId, Buffer.from(JSON.stringify(transportation)));
        return JSON.stringify(transportation);
    }
}

module.exports = TicketAdda;