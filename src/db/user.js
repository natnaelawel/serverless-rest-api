const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { DB } = require("./index");

const checkUser = async (email, password) => {
  try {
    const data = await DB.get({
      TableName: process.env.USERS_TABLE,
      Key: {
        email,
      },
    }).promise();
    if (!data) {
      throw Error("There was an error fetching the data");
    }
    const hashedPassword = data.Item.password;
    const match = await bcrypt.compare(password, hashedPassword);
    if (match) {
      return data.Item;
    }
    return null;
  } catch (error) {
    throw Error(`There was an error ${error}`);
  }
};

const getUser = async (email) => {
  try {
    const data = await DB.scan({
      TableName: process.env.USERS_TABLE,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    }).promise();
    if (!data) {
      return null
    }
    return data.Items;
  } catch (error) {
    throw Error(`There was an error ${error}`);
  }
};

const createUser = async (firstname, lastname, email, password, role) => {
  const id = uuidv4();
  console.log("the id is ", id);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashedpassword", hashedPassword);
  const params = {
    Item: {
      id,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
    },
    TableName: process.env.USERS_TABLE,
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

const updateUser = async (firstname, lastname, email, password, role) => {
  try {
    const data = await DB.update({
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
    }).promise();

    if (!data) {
      throw Error("There was an error updating the data");
    }

    return data;
  } catch (error) {
    throw Error(`There was an error ${error}`);
  }
};

const getUsers = async () => {
  try {
    const data = await DB.scan({
      TableName: process.env.USERS_TABLE,
    }).promise();

    if (!data) {
      throw Error("There was an error fetching the data", data);
    }
    return data;
  } catch (error) {
    throw Error(`There was an error ${error}`);
  }
};

module.exports = {
  checkUser,
  getUser,
  createUser,
  updateUser,
  getUsers,
};
