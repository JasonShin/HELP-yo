import {chai, assert} from 'chai';
import * as jQuery from 'jquery';

describe('Registering as a student', function(){
    this.timeout(300000);
    before(function(){

    });

    it('should fail at registering as a student Jason Shin', function(done){
        console.log('testing ajax features');
        jQuery.ajax({
            type: 'POST',
            url: '52.63.224.1/api/student/register',
            data: {
                "StudentId" : "123456", // required
                "DateOfBirth" : "1 January 1995",
                "Gender" : "M", // optional
                "Degree" : "UG", // required
                "Status" : "International", // required
                "FirstLanguage" : "English", // required
                "CountryOrigin" : "Australia", // required
                "Background" : "Degree", // optional
                "DegreeDetails" : "1st", // optional
                "AltContact" : "0405294958", // optional
                "PreferredName" : "Tom", // optional
                "HSC" : "true", // optional
                "HSCMark" : "100", // optional
                "IELTS" : "false", // optional
                "IELTSMark" : "", // optional
                "TOEFL" : "false", // optional
                "TOEFLMark" : "", // optional
                "TAFE" : "false", // optional
                "TAFEMark" : "", // optional
                "CULT" : "false", // optional
                "CULTMark" : "", // optional
                "InsearchDEEP" : "false", // optional
                "InsearchDEEPMark" : "", // optional
                "InsearchDiploma" : "false", // optional
                "InsearchDiplomaMark" : "", // optional
                "FoundationCourse" : "false", // optional
                "FoundationCourseMark" : "", // optional
                "CreatorId" : "123456" // required
            },
            dataType: 'json',
            success: function(){
                console.log('success!');
                done()
            }
        });
    });

    after(function(){

    });
});