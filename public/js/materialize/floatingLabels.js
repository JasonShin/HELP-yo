/*global $, document*/
$(document).ready(function () {

    'use strict';

    // Apply the transform effect on focus
    $('input').focus(function () {
        console.log('FUCK');
        $(this).next('label').addClass('hasVal');
    });

    // check if the input has a value    
    $('input').blur(function () {
        if ($(this).val().length > 0) {
            $(this).next('label').addClass('hasVal');
        } else {
            $(this).next('label').removeClass('hasVal');
        }
    });

});