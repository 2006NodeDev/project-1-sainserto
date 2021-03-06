import { expressEventEmitter, customExpressEvents } from ".";
import { User } from "../models/User";
import { userTopic } from "../messaging";

expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser: User) => {
    setImmediate(async () => {
        try {
            await userTopic.publishJSON(newUser)
        } catch (e) {
            console.log(e);

        }
    })
})