var aws = require("aws-sdk");
var ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  let date = new Date();
  if (event.request.userAttributes.sub) {
    let params = {
      Item: {
        id: { S: event.request.userAttributes.sub },
        __typename: { S: "User" },
        username: { S: event.userName },
      },
      TableName: process.env.USERTABLE,
    };
    try {
      await ddb.putItem(params).promise();
      console.log("Success");
    } catch (e) {
      console.log("Error", e);
      context.done(null, event);
    }
  } else {
    console.log("Error: Nothing was written to the database.");
    context.done(null, event);
  }
};
