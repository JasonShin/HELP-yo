

export var register = () => {
    return new Promise((resolve, reject) => {
        var $ = require('jquery');

        $.ajax({
            method: 'POST',
            headers: {
                'AppKey': 'd08f1438a39947458d02a70fab255cfd',
                'Content-Type': 'application/json'
            },
            contentType: 'application/json',
            url: 'http://52.63.224.1/api/student/register',
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
            complete: (e) => {
                resolve('hello! ' + JSON.stringify(e) + 'yo');
            },
            error: (error) =>{
                reject('o no! ' + JSON.stringify(error) + "  yoa");
            }
        });
    });

};