//import { useEffect, useState } from "react";
import Head from 'next/head';
import MeetupList from "../components/meetups/MeetupList";
import DBconnect from '../database/db-connection';

// const DUMMY_DATA = [
//     {
//         id: 'm1',
//         title:'A First Meetup',
//         image: 'https://images.unsplash.com/photo-1542052125323-e69ad37a47c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
//         address:'Tokoyo',
//         description:'This is Tokoyo Japan!'
//     },
//     {
//         id: 'm1',
//         title:'A Second Meetup',
//         image: 'https://www.nationsonline.org/gallery/Korea_South/Seomyeon-area-Busan.jpg',
//         address:'South Korea',
//         description:'This is South Korea!'
//     }
// ]

function HomePage(props){
    // const [loadedMeetups, setLoadedMeetups] = useState([]);
   
    // useEffect(() => {
    //    setLoadedMeetups(DUMMY_DATA);
    // },[()]);
    return(
        <>
        <Head>
            <title>React Meetup</title>
            <meta name="description" content=""/>
        </Head>
       <MeetupList meetups={props.meetups} />;
        </>
    )
}

// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;

//     return{
//         props:{
//             meetups: DUMMY_DATA
//         }
//     }
// }


// run on the server, handle data on the server and not the client side
export async function getStaticProps(){
    const [db,client] = await DBconnect();
    const meetupsCollection =  await db.collection('meetup');
    const meetups  = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address:meetup.address,
                image:meetup.image,
                id:meetup._id.toString()
            }))
        },
        revalidate: 10
    };
}

export default HomePage;