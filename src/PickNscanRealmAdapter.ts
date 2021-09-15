
// https://docs.mongodb.com/realm/node/relationships
import * as Realm from 'realm';
export const PickNscanRealmAdapter = async (user: Realm.User<Realm.DefaultFunctionsFactory, any>) => {
  try {
    return await Realm.open({
      sync: {
        user: user!,
        partitionValue: 'PUBLIC',
        // The behavior to use when a realm file already exists locally,
        // i.e. you have previously opened the realm.
        existingRealmFileBehavior: {
          type: Realm.OpenRealmBehaviorType.OpenImmediately,
        },
        error: (_session, error) => {
          (error) => {
            console.log(error.name, error.message);
          };
        },
      }
    });

  } catch (err) {
    console.error("Failed to log in:", err)
  }
}

