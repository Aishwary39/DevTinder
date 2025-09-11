/**
 * go to mongodb website
 * create a free/ M0 cluster
 * Create a user
 * Get the connection string and use it your node js app
 * Install mongodb compass to check for the documents/table you created
 * 
 */ 

const {MongoClient} =  require("mongodb");

const url = "mongodb+srv://mishraaishwaryid:nXg5pouF7F37t5ak@nodejsexperiment.8zdaozb.mongodb.net/";
const client = new MongoClient(url);

const dbName = "TestDatabase";

async function main()
{
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection =  db.collection("User");

    // insert a document

    // const user = {
    //     firstName : "Aman",
    //     lastName: "Singh",
    //     city: "Lucknow",
    //     phonenumber: "34567890"
    // }

    // const newData = await collection.insertMany([user]);
    // console.log(newData);

    // finding all the document
    // const findResult = await collection.find({}).toArray();
    // console.log("Find Documents", findResult);

    // count the document

    // const countResult =  await collection.countDocuments();
    // console.log("Count result", countResult);

    // find by filter

    const findByFilter =  await collection.find({firstName: "Aman"}).toArray();
    console.log(findByFilter);
    return "done.";
}

main().then(console.log).catch(console.error).finally(()=> client.close());