const dotenv = require('dotenv');
dotenv.config();
module.exports ={
  airtableKey: process.env.AIRTABLE_API_KEY,
  airtableBase: process.env.AIRTABLE_BASE_ID,
  airtableUsers: process.env.AIRTABLE_USERS,
  airtableTodos: process.env.AIRTABLE_TODO,
  port: process.env.PORT
};