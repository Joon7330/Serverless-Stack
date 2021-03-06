// stacks/index.ts
import * as sst from "@serverless-stack/resources";
import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";
import AuthStack from "./AuthStack";

export default function main(app: sst.App): void {
  const storageStack = new StorageStack(app, "storage-Joon");


  const apiStack = new ApiStack(app, "api-Joon", {
    table: storageStack.table,
  });


  new AuthStack(app, "auth", {
    api: apiStack.api,
    bucket: storageStack.bucket,
  });
}