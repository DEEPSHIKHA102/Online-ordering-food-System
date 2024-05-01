const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://paldeepshikha102:786@cluster0.ghizhcc.mongodb.net/foodie?retryWrites=true&w=majority&appName=Cluster0"; //foodie--> database-name
mongoose.set("strictQuery", true); //important
const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) console.log("....", err);
      else {
        console.log("connected");
        const fetched_data = await mongoose.connection.db.collection("food_items"); //Read Data
        fetched_data.find({}).toArray(async function (err, data) {
          const foodCategory = await mongoose.connection.db.collection("foodCategory");
          foodCategory.find({}).toArray(function (err,catData){
            if (err) console.log(err);
            else {
               global.food_items = data;
               global.foodCategory = catData;

            }
          })
          // if (err) console.log(err);
          // else {
          // global.food_items = data;
          // //console.log(global.food_items);
          // } //else console.log(data);
        });
      }
    }
  );
};

module.exports = mongoDB;
