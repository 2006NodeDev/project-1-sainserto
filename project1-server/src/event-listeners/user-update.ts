import { expressEventEmitter, customExpressEvents } from ".";
import { User } from "../models/User";
import { userTopic } from "../messaging";

expressEventEmitter.on(customExpressEvents.NEW_USER, (user: User ) => {
    setImmediate(async () => {
        try {
            await userTopic.publishJSON(user)
        } catch (e) {
            console.log(e);

        }
    })
})