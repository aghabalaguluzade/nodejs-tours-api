import mongoose from "mongoose";

const conn = () => {
     mongoose.connect(process.env.DB_URL.replace('<PASSWORD>',process.env.DB_PASSWORD), {
          dbName : 'tours',
          useNewUrlParser: true,
          useUnifiedTopology: true
     }).then(con => {
          console.log('DB connection successful!');
     }).catch(err => {
          console.log(err);
     });
};

export default conn;