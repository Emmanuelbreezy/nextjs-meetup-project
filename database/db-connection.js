import { MongoClient } from 'mongodb';
const MONGODB_URI = 'mongodb+srv://Emmanuel:B55nWv_-JL2N-Xw@cluster0.wo1wx.mongodb.net/meetups';

async function DBconnect(){
    try{
        const client = await MongoClient.connect(MONGODB_URI);
        const db = client.db();
        return [db,client];
    }catch(err){
      console.log(err);
    }

    return [null, null]
   
}

export default DBconnect;

