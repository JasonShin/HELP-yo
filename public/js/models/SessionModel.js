import {observable} from 'mobx';

export default class SessionModel {


    @observable AppointmentType;
    @observable AppointmentsOther;
    @observable AssignTypeOther;
    @observable AssignmentType;
    @observable Assistance;
    @observable AssistanceText;
    @observable Attended;
    @observable BookingId;
    @observable Campus;
    @observable Cancel;
    @observable EndDate;
    @observable IsGroup;
    @observable IsLocked;
    @observable LearningIssues;
    @observable LecturerComment;
    @observable LecturerEmail;
    @observable LecturerFirstName;
    @observable LecturerLastName;
    @observable NumPeople;
    @observable Reason;
    @observable SessionId;
    @observable SessionType;
    @observable SessionTypeAbb;
    @observable StartDate;
    @observable Subject;
    @observable WaitingID;
    @observable archived;

    //TODO: Format this properly
    constructor(
        AppointmentType,
        AppointmentsOther,
        AssignTypeOther,
        AssignmentType,
        Assistance,
        AssistanceText,
        Attended,
        BookingId,
        Campus,
        Cancel,
        EndDate,
        IsGroup,
        IsLocked,
        LearningIssues,
        LecturerComment,
        LecturerEmail,
        LecturerFirstName,
        LecturerLastName,
        NumPeople,
        Reason,
        SessionId,
        SessionType,
        SessionTypeAbb,
        StartDate,
        Subject,
        WaitingID,
        archived) {
        this.AppointmentType = AppointmentType;
        this.AppointmentsOther =AppointmentsOther;
        this.AssignTypeOther=AssignTypeOther;
        this.AssignmentType=AssignmentType;
        this.Assistance=Assistance;
        this.AssistanceText=AssistanceText;
        this.Attended=Attended;
        this.BookingId=BookingId;
        this.Campus=Campus;
        this.Cancel=Cancel;
        this.EndDate=EndDate;
        this.IsGroup=IsGroup;
        this.IsLocked=IsLocked;
        this.LearningIssues=LearningIssues;
        this.LecturerComment=LecturerComment;
        this.LecturerEmail=LecturerEmail;
        this.LecturerFirstName=LecturerFirstName;
        this.LecturerLastName=LecturerLastName;
        this.NumPeople=NumPeople;
        this.Reason=Reason;
        this.SessionId=SessionId;
        this.SessionType=SessionType;
        this.SessionTypeAbb=SessionTypeAbb;
        this.StartDate=StartDate;
        this.Subject=Subject;
        this.WaitingID=WaitingID;
        this.archived=archived;
    }
}
