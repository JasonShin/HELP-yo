/**
 * Created by Shin on 19/10/2016.
 */
import React from 'react';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import animationConstants from '../constants/animationConstants';

export default class FAQPage extends React.Component {

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="page-transition"
                transitionAppear={true}
                transitionAppearTimeout={animationConstants.animationDelay}
                transitionEnterTimeout={animationConstants.animationDelay}>
                <div id="PageContent">
                    <div class="container-small container-register">
                        About the HELPS programs<p />
                        Who can use HELPS?<p />
                        » Any student enrolled in any faculty at UTS, and all members of UTS staff<p />

                        Where is HELPS?<p />

                        » HELPS is located on Building 1, Level 3 , room 8 (opposite the Careers service)<p />

                        How much does it cost?<p />

                        » Services are free of tuition fees for non-credit workshops and individual consultations.<p />

                        Can you help me with my assignment?<p />

                        » Yes. HELPS offers various workshops and individual consultations. For more information, check out our website.<p />

                        Can you proofread and correct my assignment?<p />

                        » No. Our role is not to correct grammar or other errors in an assignment. We can help you develop your own editing strategies. You should also use a computer spell-check, find a competent friend and a good dictionary.<p />

                        Can you help me with the content of my assignment?<p />

                        » No. We can’t tell you what to say, we can only help you say it better and more clearly. While we’re happy to act as a sounding board for your ideas, content questions require the specialised disciplinary knowledge of lecturers and tutors in your faculty. You should take specific content questions directly to them.<p />

                        My lecturer says I need to improve my grammar. Can you help me?<p />

                        » Yes. Please check out our website or Learning resources.<p />

                        Can you help me with my pronunciation?<p />

                        » Yes. Please check website or Learning resources.<p />

                        Can I practise my seminar presentation with someone?<p />

                        » Yes. You can attend our workshops or drop in for an individual consultation session.<p />

                        Back to top<p />

                        About the Special Conditions in Exams<p />


                        I am not a native English speaker and I feel that I need more time in exams. Can you help?<p />

                        » Maybe. You might be eligible to apply for Special Conditions in Exams.<p />

                        I'm a second/third year student. Can I get Special Conditions in my exams?<p />

                        » No. Only first year (1st/2nd semester) students are eligible to apply.<p />

                        What is the deadline to apply for the Special Conditions?<p />

                        » The application closes on the Census date (for Spring semester: 26 August 2016) . Click on Special Conditions in Exams for more information.<p />

                        If you have a question which has not been answered above, please email us: HELPS@uts.edu.au<p />
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}