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
    if(success){
        const blockBlobResponse = await blkBlobClient.download()
        const data = (await streamToBuffer(blockBlobResponse.readableStreamBody)).toString()
        const results = JSON.parse(data)
        context.log(results)
    }

    
    context.done(); 
};

async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

export default eventGridTrigger;
