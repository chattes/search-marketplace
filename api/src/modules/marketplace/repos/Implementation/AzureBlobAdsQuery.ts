import { AdsQuery } from "../../AdsSearch/AdsQuery";
import { IAdsQueryRepo } from "../AdsQuery";

import { BlobServiceClient } from "@azure/storage-blob";
import { pickBy, identity } from "lodash";
import { User } from "../../../user/domain/User";

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
  async save(query: AdsQuery, user: User): Promise<boolean> {
    console.log("Save the Query in Azure Blob Storage");
    // TODO - Generate a container for each User
    const containerName = `query-${user.id}`;
    const containerClient = this.blobClient.getContainerClient(containerName);

    await containerClient.createIfNotExists();
    const blockBlobClient = containerClient.getBlockBlobClient(
      `queries/${query.id}.json`
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
    return true;
  }
  async getQueriesByUser(user: User) {
    return [];
  }
  async delete(query: AdsQuery): Promise<boolean> {
    return true;
  }
}
