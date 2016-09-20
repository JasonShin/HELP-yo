import * as Lecturers from '../public/js/api/lecturers.api';
import * as Misc from '../public/js/api/misc.api';
import * as Sessions from '../public/js/api/sessions.api';
import * as SessionsTypes from '../public/js/api/sessionsTypes.api';
import * as Student from '../public/js/api/student.api';
import * as Workshop from '../public/js/api/workshop.api';

const active = 'true';
const studentId = '11888842';
const studentId2 = '99120875';
const startingDtBegin = '2008-11-19T00:00:00.000+11:00';
const startingDtEnd = '2008-11-19T00:40:00.000+11:00';
const endingDtBegin = '2008-11-19T00:40:00.000+11:00';
const endingDtEnd = '2008-11-19T01:20:00.000+11:00';
const sessionTypeId = '1';
const campus = 'CB01.18.22';
const campusId = '93';
const lecturerId = '47';
const workshopId = '2382';
const userId = '99120875';
const canceled = '1';
const attended = '1';
const page = '1';
const pageSize = '10';
const workshopSetId = '2';
const topic = 'Academic Writing';
const promises = [];

describe('All the things', function(){
  this.timeout(6000);
  it('should do all the things', async() => {
      await runApiMethods();
  });
});

async function runApiMethods() {
  promises.push(Misc.listCampuses({active}));
  promises.push(Misc.listLecturers({active}));
  promises.push(Misc.listAppointments({active}));
  promises.push(Misc.listAssignments({active}));
  promises.push(Lecturers.getAllLecturers());
  promises.push(Sessions.searchSessionBookingsByDate({studentId, startingDtBegin, startingDtEnd, endingDtBegin, endingDtEnd}));
  promises.push(Sessions.searchSessionBookingsByTopic({studentId, sessionTypeId}));
  promises.push(Sessions.searchSessionBookingByLocation({studentId, campus}));
  promises.push(Sessions.searchSessionBookingByTutor({studentId, lecturerId}));
  promises.push(SessionsTypes.getAllSessionsTypes());
  promises.push(Student.registerHELP({
    studentId,
    dob: '1 January 1995',
    degreeType: 'UG',
    studentStatus: 'International',
    firstLang: 'English',
    countryOrigin: 'Australia',
    creatorId: '123456',
    gender: 'M',
    background: 'Degree',
    degreeDetails: '1st',
    altContact: '0405294958',
    preferredName: 'Tom',
    completedHsc: 'true',
    hscMark: '100'
  }));
  promises.push(Workshop.listWorkshopSets({active: true}));

  // Create Workshop Booking Endpoint is broken. These tests won't pass
  // promises.push(Workshop.createWorkshopBooking({ workshopId, studentId2, userId }));
  // promises.push(Workshop.createWorkshopWaiting({ workshopId, studentId2, userId }));
  // promises.push(Workshop.cancelWorkshopBooking({ workshopId, studentId2, userId }));

  promises.push(Workshop.searchWorkshopBookings({ studentId, startingDtBegin, startingDtEnd, endingDtBegin, endingDtEnd, campusId, active, page, pageSize }));
  // This is broken as well
  // promises.push(Workshop.searchWorkshops({ workshopSetId, topic, startingDtBegin, startingDtEnd, endingDtBegin, endingDtEnd, campusId, active, page, pageSize }));
  promises.push(Workshop.updateWorkshopBooking({ workshopId, studentId, canceled, attended, userId }));
  await Promise.all(promises);
}

