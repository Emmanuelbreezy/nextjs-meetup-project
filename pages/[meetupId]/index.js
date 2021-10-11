import Head from 'next/head';

import { ObjectId } from 'mongodb';
import DBconnect from '../../database/db-connection';
import MeetupDetail from '../../components/meetups/MeetupDetail';


function MeetupDetails(props){
   
    return(
        <>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.description}/>
        </Head>
        <MeetupDetail 
           image={props.meetupData.image}
           title={props.meetupData.title}
           address={props.meetupData.address}
           description={props.meetupData.description}
        />
        </>
    )
}

// needed when using 'getStaticProps'
export async function getStaticPaths(){
    const [db,client] = await DBconnect();
    const meetupsCollection =  await db.collection('meetup');
    const meetups  = await meetupsCollection.find({}, {_id:1}).toArray();
    client.close();
   return{
       fallback: 'blocking',
       paths: meetups.map(meetup => ({
           params: {meetupId: meetup._id.toString()},
       })),
   }
}
// run on the server, handle data on the server and not the client side
export async function getStaticProps(context){
    //context.params key
    const meetupId = context.params.meetupId;
    const [db,client] = await DBconnect();
    const meetupsCollection =  await db.collection('meetup');

    const selectedMeetup  = await meetupsCollection.findOne({
        _id: ObjectId(meetupId)
    });
    client.close();

    return {
        props: {
            meetupData:{
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
                address: selectedMeetup.address
            },
        },
        revalidate: 10
    };
}

export default  MeetupDetails;