import { AzureFunction, Context } from "@azure/functions"
import {BlobServiceClient} from "@azure/storage-blob"

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<Array<any>> {
    var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue)
    {
        context.log('Timer function is running late!');
    }

    const queries = await listQueries(context)
    context.log("Process these Queries", queries)
    return queries
};

const listQueries = async (context: Context) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONN_STRING)
    for await (const container of blobServiceClient.listContainers()) {
        context.log(`Continer Name ${container.name}`)
        if(container.name !== "sourav") continue
        const containerClient = blobServiceClient.getContainerClient(container.name)
        const queriesToExecute = []
        for await (const blob of containerClient.listBlobsFlat()){
            const blobClient = containerClient.getBlobClient(blob.name)
            const blockBlobResponse = await blobClient.download()
            const data = (await streamToBuffer(blockBlobResponse.readableStreamBody)).toString()
            const query = JSON.parse(data)
            queriesToExecute.push(query)
            
        }
        return queriesToExecute
    }
}

 // [Node.js only] A helper method used to read a Node.js readable stream into a Buffer
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

export default timerTrigger;