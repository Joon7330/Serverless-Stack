// stacks/index.tws
import * as sst from "@serverless-stack/resources";
import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";

export default function main(app: sst.App): void {
  const storageStack = new StorageStack(app, "storage-Joon");

  new ApiStack(app, "api-Joon", {
    table: storageStack.table,
  });
}