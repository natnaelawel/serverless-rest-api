const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { DB } = require("./index")


const getAllData = async () => {
  let params = {
    TableName: process.env.TODOS_TABLE,
    // ExpressionAttributeValues: {
    // ":val": {
    // S: val,
    // },
    // },
    Limit: 1000,
    // FilterExpression: "MyAttribute = :val",
    // ExclusiveStartKey: thisUsersScans[someRequestParamScanID]
  };
  let data = await DB.query(params).promise();

  if (data["Items"].length > 0) {
    allData = [...allData, ...data["Items"]];
  }

  if (data.LastEvaluatedKey) {
    params.ExclusiveStartKey = data.LastEvaluatedKey;
    return await getAllData(params);
  } else {
    return data;
  }
};

const getTodos = async () => {
  try {
    const data = await DB
      .scan({
        TableName: process.env.TODOS_TABLE,
      })
      .promise();

    if (!data) {
      throw Error("There was an error fetching the data", data);
    }
    return data;
  } catch (error) {
    throw Error(`There was an error ${error}`);
  }
};

const getTodo = async (id) => {
  try {
    const data = await DB
      .get({
        TableName: process.env.TODOS_TABLE,
        Key: {
          id,
        },
      })
      .promise();
    if (!data) {
      throw Error("There was an error fetching the data");
    }
    return data;
  } catch (error) {
    throw Error(`There was an error ${error}`);
  }
};

const createTodo = async (title, note, due_date) => {
  const id = uuidv4();
  const params = {
    Item: {
      id,
      title,
      note,
      due_date,
    },
    TableName: process.env.TODOS_TABLE,
    ReturnValues: "ALL_OLD",
  };
  try {
    const data = await DB.put(params).promise();
    if (!data) {
      throw Error("There was an error creating the data");
    }
    return data;
  } catch (error) {
    throw Error(`There was an error ${error}`);
  }
};

const updateTodo = async (id, title, note, due_date) => {
  try {
    const data = await DB
      .update({
        TableName: process.env.TODOS_TABLE,
        Key: {
          id,
        },
        UpdateExpression: `set title = :title, note = :note, due_date = :due_date`,
        ExpressionAttributeValues: {
          ":title": title,
          ":note": note,
          ":due_date": due_date,
        },
        // ReturnValues="UPDATED_NEW"
      })
      .promise();

    if (!data) {
      throw Error("There was an error updating the data");
    }

    return data;
  } catch (error) {
    throw Error(`There was an error ${error}`);
  }
};

const deleteTodo = async (id) => {
  try {
    const data = await DB
      .delete({
        TableName: process.env.TODOS_TABLE,
        Key: {
          id,
        },
      })
      .promise();
    if (!data) {
      throw Error("There was an error deleting the data");
    }
    return data;
  } catch (error) {
    throw Error(`There was an error ${error}`);
  }
};

const searchTodo = async (SEARCH_KEYWORD) => {
  try {
    const data = await DB
      .scan({
        TableName: process.env.TODOS_TABLE,
        FilterExpression: "contains(#title, :title)",
        // KeyConditionExpression: '',
        ExpressionAttributeNames: {
          "#title": "title",
        },
        ExpressionAttributeValues: {
          ":title": SEARCH_KEYWORD,
        },
      })
      .promise();

    if (!data) {
      throw Error("There was an error deleting the data");
    }
    return data;
  } catch (error) {
    throw Error(`There was an error ${error}`);
  }
};

module.exports = {
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  searchTodo,
};
