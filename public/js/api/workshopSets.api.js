/**
 * Created by Shin on 16/10/2016.
 */
import FirebaseAPI from '../api/firebase.api';

export const listWorkshopSets = () => {

    return new Promise((resolve, reject) => {
        return FirebaseAPI.context.database().ref('/workshopSets/').on('value', (snapshot) => {
            if(snapshot.val() === undefined) {
                reject();
            } else {
                resolve(snapshot.val());
            }
        });

    });
};

