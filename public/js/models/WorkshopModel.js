import {observable} from 'mobx';

/*
 Object
 BookingCount

 DaysOfWeek

 EndDate

 NumOfWeeks

 ProgramEndDate

 ProgramId

 ProgramStartDate

 StartDate

 WorkShopSetID

 WorkshopId

 archived

 campus

 cutoff

 description

 maximum

 reminder_num

 reminder_sent

 targetingGroup

 topic

 type

 */

export default class WorkshopModel {

    @observable BookingCount;
    @observable DaysOfWeek;
    @observable EndDate;
    @observable NumOfWeeks;
    @observable ProgramEndDate;
    @observable ProgramId;
    @observable ProgramStartDate;
    @observable StartDate;
    @observable WorkShopSetID;
    @observable WorkshopId;
    @observable archived;
    @observable campus;
    @observable cutoff;
    @observable description;
    @observable maximum;
    @observable reminder_num;
    @observable reminder_sent;
    @observable targetingGroup;
    @observable topic;
    @observable type;
    @observable tutor;


    constructor(BookingCount,
                DaysOfWeek,
                EndDate,
                NumOfWeeks,
                ProgramEndDate,
                ProgramId,
                ProgramStartDate,
                StartDate,
                WorkShopSetID,
                WorkshopId,
                archived,
                campus,
                cutoff,
                description,
                maximum,
                reminder_num,
                reminder_sent,
                targetingGroup,
                topic,
                type,
                tutor) {

        this.BookingCount = BookingCount;
        this.DaysOfWeek = DaysOfWeek;
        this.EndDate = EndDate;
        this.NumOfWeeks = NumOfWeeks;
        this.ProgramEndDate = ProgramEndDate;
        this.ProgramId = ProgramId;
        this.ProgramStartDate = ProgramStartDate;
        this.StartDate = StartDate;
        this.WorkShopSetID = WorkShopSetID;
        this.WorkshopId = WorkshopId;
        this.archived = archived;
        this.campus = campus;
        this.cutoff = cutoff;
        this.description = description;
        this.maximum = maximum;
        this.reminder_num = reminder_num;
        this.reminder_sent = reminder_sent;
        this.targetingGroup = targetingGroup;
        this.topic = topic;
        this.type = type;
        this.tutor = tutor;

    }
}
