import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';

@Info({ title: 'DealerTransfer', description: 'Smart contract for managing dealer transactions' })
export class DealerTransferContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const dealers = [
          {
    		DEALERID: 1401,
    		MSISDN: "+91 777777",
    		MPIN: "7777",
    		BALANCE: 75,
    		STATUS: "SUCCESS",
    		TRANSAMOUNT: 120,
    		TRANSTYPE: "ONLINE",
    		REMARKS: "ACTIVE"
	},
	{
    		DEALERID: 1402,
    		MSISDN: "+91 888888",
    		MPIN: "8888",
    		BALANCE: 180,
    		STATUS: "FAILURE",
    		TRANSAMOUNT: 250,
    		TRANSTYPE: "OFFLINE",
    		REMARKS: "INACTIVE"
	},
	{
    		DEALERID: 1403,
    		MSISDN: "+91 999999",
    		MPIN: "9999",
    		BALANCE: 500,
    		STATUS: "SUCCESS",
    		TRANSAMOUNT: 400,
    		TRANSTYPE: "ONLINE",
    		REMARKS: "ACTIVE"
	},
	{
    		DEALERID: 1404,
    		MSISDN: "+91 101010",
    		MPIN: "1010",
    		BALANCE: 300,
    		STATUS: "SUCCESS",
    		TRANSAMOUNT: 220,
    		TRANSTYPE: "OFFLINE",
    		REMARKS: "ACTIVE"
	},
	{
    		DEALERID: 1405,
    		MSISDN: "+91 111111",
    		MPIN: "1111",
    		BALANCE: 450,
    		STATUS: "FAILURE",
    		TRANSAMOUNT: 550,
    		TRANSTYPE: "ONLINE",
    		REMARKS: "INACTIVE"
	},
	{
    		DEALERID: 1406,
    		MSISDN: "+91 121212",
    		MPIN: "1212",
    		BALANCE: 600,
    		STATUS: "SUCCESS",
    		TRANSAMOUNT: 700,
    		TRANSTYPE: "OFFLINE",
    		REMARKS: "ACTIVE"
	}

       
        ];

        for (const dealer of dealers) {
            dealer.docType = 'dealer';
            // Insert data in deterministic order
            await ctx.stub.putState(dealer.DEALERID.toString(), Buffer.from(stringify(sortKeysRecursive(dealer))));
            console.info(`Dealer ${dealer.DEALERID} initialized`);
        }
    }

    // CreateDealer issues a new dealer to the world state with given details.
    @Transaction()
    public async CreateDealer(ctx: Context, dealerId: number, msisdn: string, mpin: string, balance: number, status: string, transAmount: number, transType: string, remarks: string): Promise<void> {
        const exists = await this.DealerExists(ctx, dealerId);
        if (exists) {
            throw new Error(`The dealer ${dealerId} already exists`);
        }

        const dealer = {
            DEALERID: dealerId,
            MSISDN: msisdn,
            MPIN: mpin,
            BALANCE: balance,
            STATUS: status,
            TRANSAMOUNT: transAmount,
            TRANSTYPE: transType,
            REMARKS: remarks,
            docType: 'dealer'
        };

        // Insert data in deterministic order
        await ctx.stub.putState(dealerId.toString(), Buffer.from(stringify(sortKeysRecursive(dealer))));
    }

    // ReadDealer returns the dealer stored in the world state with given id.
    @Transaction(false)
    public async ReadDealer(ctx: Context, dealerId: number): Promise<string> {
        const dealerJSON = await ctx.stub.getState(dealerId.toString()); // get the dealer from chaincode state
        if (dealerJSON.length === 0) {
            throw new Error(`The dealer ${dealerId} does not exist`);
        }
        return dealerJSON.toString();
    }

    // UpdateDealer updates an existing dealer in the world state with provided parameters.
    @Transaction()
    public async UpdateDealer(ctx: Context, dealerId: number, msisdn: string, mpin: string, balance: number, status: string, transAmount: number, transType: string, remarks: string): Promise<void> {
        const exists = await this.DealerExists(ctx, dealerId);
        if (!exists) {
            throw new Error(`The dealer ${dealerId} does not exist`);
        }

        // Overwriting original dealer with new dealer data
        const updatedDealer = {
            DEALERID: dealerId,
            MSISDN: msisdn,
            MPIN: mpin,
            BALANCE: balance,
            STATUS: status,
            TRANSAMOUNT: transAmount,
            TRANSTYPE: transType,
            REMARKS: remarks,
            docType: 'dealer'
        };

        // Insert data in deterministic order
        await ctx.stub.putState(dealerId.toString(), Buffer.from(stringify(sortKeysRecursive(updatedDealer))));
    }

    // DeleteDealer deletes a given dealer from the world state.
    @Transaction()
    public async DeleteDealer(ctx: Context, dealerId: number): Promise<void> {
        const exists = await this.DealerExists(ctx, dealerId);
        if (!exists) {
            throw new Error(`The dealer ${dealerId} does not exist`);
        }
        await ctx.stub.deleteState(dealerId.toString());
    }

    // DealerExists returns true when dealer with given ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async DealerExists(ctx: Context, dealerId: number): Promise<boolean> {
        const dealerJSON = await ctx.stub.getState(dealerId.toString());
        return dealerJSON.length > 0;
    }

    // GetAllDealers returns all dealers found in the world state.
    @Transaction(false)
    @Returns('string')
    public async GetAllDealers(ctx: Context): Promise<string> {
        const allResults = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}

