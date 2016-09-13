import $ from 'jquery';
import 'velocity-animate';

//TODO: Fix this with Zepto or Jquery dependent velocity
export const materialLoading = (opts) => {
    const {elm, enable} = opts;
    $(window).ready(function(){
        //Append
        var target = $(elm);
        var overlay = $("<div class='motion-overlay'></div>");


        if(enable) {

            target.append(overlay);

            overlay.css({
                'position': 'absolute',
                'width': target.outerWidth(),
                'height': target.outerHeight(),
                top: 0,
                left: 0
            });


            Velocity( document.querySelectorAll(elm),
                { opacity: 0.8 },
                { duration: 1000 });

        } else {

            overlay.remove();
            Velocity( document.querySelectorAll(elm),
                { opacity: 1 },
                { duration: 1000 });
        }
    });
};