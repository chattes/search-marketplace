import { AzureFunction, Context } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import { Readable } from "stream";
type AdsResults = {
  title: string;
  description: string;
  date: Date;
  image: string;
  price: number;
  location: string;
  adUrl: string;
};
type SearchResult = {
  userId: string;
  id: string;
  query: string;
  maxPrice: number;
  results: AdsResults[] | void;
};
const queueTrigger: AzureFunction = async function (
  context: Context,
  myQueueItem: SearchResult
): Promise<void> {
  context.log("Queue trigger function processed work item", myQueueItem);
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONN_STRING
  );
  const container = blobServiceClient.getContainerClient(
    `query-${myQueueItem.userId}`
  );

  const blobClient = container.getBlockBlobClient(`results-${myQueueItem.id}.json`);

  async function* getResults() {
    yield JSON.stringify(myQueueItem);
    return;
  }
  const readable = Readable.from(getResults());
  await blobClient.uploadStream(readable).catch((err) => context.log(err));
  return;
};

export default queueTrigger;
