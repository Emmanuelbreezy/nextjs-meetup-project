// import { MongoClient } from 'mongodb';

// const MONGODB_URI = 'mongodb+srv://Emmanuel:B55nWv_-JL2N-Xw@cluster0.wo1wx.mongodb.net/meetups';

import DBconnect from '../../database/db-connection';

async function handler(req, res){
    if(req.method === 'POST'){
        const data = req.body;
        const { title, image, address, description} = data;

        try{
            const [db,client]  = await DBconnect();
            const meetupsCollection = db.collection('meetup');
            const result = await meetupsCollection.insertOne(data);
         
            client.close();

            res.status(201).json({
                message:"Meetup inserted"
            });

            
        }catch(err){
              console.log(err);
        }
    }
}

export default handler;