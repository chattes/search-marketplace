import { AzureFunction, Context } from "@azure/functions"
import {BlockBlobClient, StorageSharedKeyCredential} from "@azure/storage-blob"

const sharedKey = new StorageSharedKeyCredential(process.env.ACCOUNT_NAME, process.env.ACCOUNT_KEY)

const eventGridTrigger: AzureFunction = async function (context: Context, eventGridEvent: any): Promise<void> {
    context.log("JavaScript Event Grid function processed a request.");
    context.log("Subject: " + eventGridEvent.subject);
    context.log("Time: " + eventGridEvent.eventTime);
    context.log("Data: " + JSON.stringify(eventGridEvent.data));


    const blkBlobClient = new BlockBlobClient(eventGridEvent.data.url, sharedKey)
    const success = await blkBlobClient.exists().catch(err => context.log(err))
    if(success) context.log("We are able to read the Blob")

    
    context.done(); 
};

export default eventGridTrigger;
