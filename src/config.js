export default {
  PORT: process.env.PORT || 8080,
  URL:
    process.env.NODE_ENV === 'production'
      ? 'mongodb+srv://heroku:herokuku@cluster0.thns6.mongodb.net/catmashApi?retryWrites=true&w=majority'
      : 'mongodb://localhost:27017',
  DBNAME: 'catmashApi',
};
