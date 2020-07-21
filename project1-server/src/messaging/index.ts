import {PubSub} from '@google-cloud/pubsub'
const pubSubClient = new PubSub() 


export const userTopic = pubSubClient.topic('projects/sixth-tribute-279818/topics/user-service')

// export const userTopic2 = getUserTopic()
// //probably better, because it fetchs all the information from gcp about the topic
// async function getUserTopic(){
//     let [topics] = await pubSubClient.getTopics()//get all topics
//     return topics.find((topic)=>{//do gross sideffect bullshit
//         return topic.name === 'projects/tenacious-text-279818/topics/user-service'//match topic name 
//     })
// }