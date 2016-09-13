var $ = require('jquery');
window.jQuery = window.$ = $;
require('velocity-animate');
delete window.jQuery;
delete window.$;

//TODO: Fix this with Zepto or Jquery dependent velocity
//TODO: Change it to bind to any elements => possibly use CSS
//Todo: split each functions into different files
export const materialLoading = (opts) => {
    const {elm, enable} = opts;
    $(window).ready(function(){
        //Append
        var target = $(elm);
        var overlay = $('<div class=\'motion-overlay\'></div>');
        var loadingBar = $('<div></div>');

        $(elm).velocity();
        if(enable) {

            //Append
            target.append(overlay);
            overlay.append(loadingBar);

            //Style
            target.css({
                'position': 'relative'
            });

            overlay.css({
                'position': 'absolute',
                'width': target.outerWidth(),
                'height': target.outerHeight(),
                top: 0,
                left: 0
            });

            loadingBar.css({
                'position': 'absolute',
                'width': '0',
                'height': '4px',
                'background-color': 'black',
                'margin': '0px auto',
                'margin-top': '50%'
            });

            loadingBar
                .velocity({rotateZ: '360deg'}, {duration: 1000, loop: true})
                .velocity({ 'width': '90%' }, {loop: true}, 'ease-in-out')

            target.velocity({'opacity': '0.5'}, 'ease-in-out');

        } else {

            target.find('.motion-overlay').remove();
            target.velocity({'opacity': '1'}, 'ease-in-out');
        }
    });
};

export const materialRipple = (elm) => {

    var target = $(elm);

    $.Velocity.RegisterUI('callout.touched', {
        defaultDuration: 500,
        calls: [
            [{
                opacity: 0.3
            },
                0.1],
            [{
                opacity: 0,
                left: '50%',
                top: '50%',
                scaleX: 4,
                scaleY: 4
            },
                0.8],
            [{
                scaleX: 1,
                scaleY: 1
            },
                0.1]
        ]
    });
    $.Velocity.RegisterUI("callout.fadepulse", {
        defaultDuration: 700,
        calls: [
            [{
                backgroundColorAlpha: 0.3
            },
                0.5],
            [{
                backgroundColorAlpha: 0,
            },
                0.5]
        ]
    });


    $(window).ready(function(){

    });

};