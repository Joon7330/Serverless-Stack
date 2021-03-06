// StorageStack.ts
import * as sst from "@serverless-stack/resources";
import { HttpMethods } from 'aws-cdk-lib/aws-s3';

export default class StorageStack extends sst.Stack {
    // 외부에서 접근할 수 있또록 선언
    table;
    bucket;

    constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // DynamoDB 테이블 생성
    this.table = new sst.Table(this, "notes-Joon", {
        dynamodbTable: {
            tableName: `notes-Joon`,
        },
        fields: {
            userId: sst.TableFieldType.STRING,
            noteId: sst.TableFieldType.STRING,
        },
        primaryIndex: { partitionKey: "userId", sortKey: "noteId"},
    });

    this.bucket = new sst.Bucket(this, "Uploads", {
        s3Bucket: {
            cors: [
                {
                    maxAge: 3000,
                    allowedOrigins: ["*"],
                    allowedHeaders: ["*"],
                    allowedMethods: [
                        HttpMethods.GET,
                        HttpMethods.POST,
                        HttpMethods.PUT,
                        HttpMethods.DELETE,
                        HttpMethods.HEAD,
                    ],
                },
            ],
        },
    });
    }
}
