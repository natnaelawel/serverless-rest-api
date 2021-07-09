const AWS = require("aws-sdk");
const IS_OFFLINE = process.env.IS_OFFLINE;

// console.log("is offline", IS_OFFLINE);

let dynamoDb;

if (IS_OFFLINE === "true") {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000",
    accessKeyId: "DEFAULT_ACCESS_KEY", // needed if you don't have aws credentials at all in env
    secretAccessKey: "DEFAULT_SECRET", // needed if you don't have aws credentials at all in env
  });
  // console.log("nati awel", dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
}

module.exports.DB = dynamoDb;

