import { computed, observable, autorun } from 'mobx';
import SessionModel from '../models/SessionModel';
import {searchSessionBookingsByTopic} from '../api/sessions.api';

class SessionsStore {
    @observable sessions = [];

    constructor() {

    }

    //TODO: Once generic query using all params are implemented, use that function here. It ensures when someone straightaway browse using query params, it returns correct sessions listings
    fetchSessions(studentId, sessionTypeId) {
        searchSessionBookingsByTopic(studentId,sessionTypeId).
        then((response) => {
            console.log(response.data.Results);
            this.sessions = response.data.Results.map((data) => {
                return new SessionModel(
                    data.AppointmentType,
                    data.AppointmentsOther,
                    data.AssignTypeOther,
                    data.AssignmentType,
                    data.Assistance,
                    data.AssistanceText,
                    data.Attended,
                    data.BookingId,
                    data.Campus,
                    data.Cancel,
                    data.EndDate,
                    data.IsGroup,
                    data.IsLocked,
                    data.LearningIssues,
                    data.LecturerComment,
                    data.LecturerEmail,
                    data.LecturerFirstName,
                    data.LecturerLastName,
                    data.NumPeople,
                    data.Reason,
                    data.SessionId,
                    data.SessionType,
                    data.SessionTypeAbb,
                    data.StartDate,
                    data.Subject,
                    data.WaitingID,
                    data.archived
                );
            });
        }).
        catch((error) => {
            console.log(error);
        });
    }


}

export default new SessionsStore;