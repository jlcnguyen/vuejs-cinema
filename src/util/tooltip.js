import { addClass, removeClass } from './helpers';

let mouseoverHandler = function(event) {
    let span = event.target.parentNode.getElementsByTagName("SPAN")[0];
    addClass(span, 'tooltip-show');
}

let mouseoutHandler = function(event) {
    let span = event.target.parentNode.getElementsByTagName("SPAN")[0];
    removeClass(span, 'tooltip-show');
}

export default {
    install(Vue) {
        Vue.directive('tooltip', {
            bind(el, bindings) {
                let span = document.createElement('SPAN');
                let text = document.createTextNode(`Seats available: ${ bindings.value.seat }`);
                span.appendChild(text);
                addClass(span, 'tooltip');
                el.appendChild(span);
                let div = el.getElementsByTagName('DIV')[0]; // function returns array so just grab first else
                div.addEventListener('mouseover', mouseoverHandler);
                div.addEventListener('mouseout', mouseoutHandler);
                // below are for mobile devices
                div.addEventListener('touchstart', mouseoverHandler);
                div.addEventListener('touchend', mouseoutHandler);
            },
            unbind(el, bindings) {
                let div = el.getElementsByTagName('DIV')[0]; // function returns array so just grab first else
                div.removeEventListener('mouseover', mouseoverHandler);
                div.removeEventListener('mouseout', mouseoutHandler);
                // below are for mobile devices
                div.removeEventListener('touchstart', mouseoverHandler);
                div.removeEventListener('touchend', mouseoutHandler);
            }
        });
    }
}
