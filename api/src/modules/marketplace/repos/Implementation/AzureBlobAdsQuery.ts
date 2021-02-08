import { AdsQuery } from "../../AdsSearch/AdsQuery";
import { IAdsQueryRepo } from "../AdsQuery";

import {
  BlobServiceClient,
} from "@azure/storage-blob";
import { IdGenerator } from "../../utils";
import { pickBy, identity } from "lodash";

export class AzureBlobAdsQueryRepo implements IAdsQueryRepo {
  private static azureConnection: any;
  private blobClient: BlobServiceClient;
  private constructor() {
    if (process.env.AZURE_STORAGE_CONNECTION_STRING) {
      this.blobClient = BlobServiceClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING
      );
    } else {
      throw new Error("Cannot get Connection to Azure Blobs");
    }
  }
  public static getInstance(): IAdsQueryRepo {
    if (!this.azureConnection) {
      this.azureConnection = new AzureBlobAdsQueryRepo();
    }
    return this.azureConnection;
  }
  async save(query: AdsQuery): Promise<boolean> {
    console.log("Save the Query in Azure Blob Storage");
    const idGenerator = new IdGenerator();
    // TODO - Generate a container for each User
    const containerName = `${idGenerator.generate("sourav")}`;
    console.log(containerName)
    const containerClient = this.blobClient.getContainerClient('sourav');

    await containerClient.createIfNotExists();
    const blockBlobClient = containerClient.getBlockBlobClient(
      `${query.id}.json`
    );
    let data = {
      id: query.id,
      location: query.location,
      queryString: query.query,
      ...query.filters,
    };
    data = pickBy(data, identity) as any;
    const blobData = JSON.stringify(data);
    await blockBlobClient.upload(blobData, blobData.length);
    return true
  }
  async getQueriesByUser(user: any) {
    return [];
  }
  async delete(query: AdsQuery): Promise<boolean> {
    return true;
  }
}
