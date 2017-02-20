﻿angular.module('app')
       .component('aisha', {
           controller: function ($scope) {

           },
           template: '<a href="#openModal">Edit</a>' +
                     '<div id="openModal" class="modalDialog"><div>' +
                     '<a href="#close" title="Close" class="close">X</a>' +
                     '<h2>Modal Box</h2>' +
                     '<p>This is a sample modal box that can be created using the powers of CSS3.</p>' +
                     '<p>You could do a lot of things here like have a pop-up ad that shows when your website loads, or create a login/register form for users.</p>' +
                     '</div></div>',
           bindings: {
               item: '<',
               showOn: '='
           }
       });



