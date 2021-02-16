import { AzureFunction, Context } from "@azure/functions"
import {BlockBlobClient} from "@azure/storage-blob"

const eventGridTrigger: AzureFunction = async function (context: Context, eventGridEvent: any): Promise<void> {
    context.log("JavaScript Event Grid function processed a request.");
    context.log("Subject: " + eventGridEvent.subject);
    context.log("Time: " + eventGridEvent.eventTime);
    context.log("Data: " + JSON.stringify(eventGridEvent.data));

    const blkBlobClient = new BlockBlobClient(eventGridEvent.data.url)
    const success = await blkBlobClient.exists().catch(err => context.log(err))
    if(success) context.log("We are able to read the Blob")

    
    context.done(); 
};

export default eventGridTrigger;
