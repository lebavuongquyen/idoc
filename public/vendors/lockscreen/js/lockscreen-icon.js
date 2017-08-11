/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var lockScreenCssPath = function() {
    var style = $("link[href*='lockscreen.css']");
    return style.attr('href').replace('lockscreen.css', '');
};

var LockScreenIcon = {
    ball: {
        html: function() {
            return '    <div class="lock-screen-icon-ball">'
                + '         <div class="ball"></div>'
                + '         <div class="ball"></div>'
                + '         <div class="ball"></div>'
                + '         <div class="ball"></div>'
                + '         <div class="ball"></div>'
                + '         <div class="ball"></div>'
                + '         <div class="ball"></div>'
                + '     </div>';
        },
        init: function() {
            if(! $("link[href*='icon-ball.css']").length) {
                $('head').append('<link href="' + lockScreenCssPath() + 'icons/icon-ball.css" rel="stylesheet">');
            }
        }
    },
    button: {
        html: function() {
            return '    <div class="lock-screen-icon-button">'
                + '          <span class="icon-button-line-1"></span>'
                + '          <span class="icon-button-line-2"></span>'
                + '          <span class="icon-button-line-3"></span>'
                + '      </div>';
        },
        init: function() {
            if(! $("link[href*='icon-button.css']").length) {
                $('head').append('<link href="' + lockScreenCssPath() + 'icons/icon-button.css" rel="stylesheet">');
            }
        }
    },
    working: {
        html: function() {
            return '<div class="lock-screen-icon-working">'
                + ' <div class="error404page">'
                + '     <div class="newcharacter404">'
                + '         <div class="chair404"></div>'
                + '         <div class="leftshoe404"></div>'
                + '         <div class="rightshoe404"></div>'
                + '         <div class="legs404"></div>'
                + '         <div class="torso404">'
                + '             <div class="body404"></div>'
                + '             <div class="leftarm404"></div>'
                + '             <div class="rightarm404"></div>'
                + '             <div class="head404">'
                + '                 <div class="eyes404"></div>'
                + '             </div>'
                + '         </div>'
                + '         <div class="laptop404"></div>'
                + '     </div>'
                + ' </div>'
                + ' </div>';
        },
        init: function() {
            if(! $("link[href*='icon-working.css']").length) {
                $('head').append('<link href="' + lockScreenCssPath() + 'icons/icon-working.css" rel="stylesheet">');
            }
        }
    },
    space: {
        html: function() {
            return '<div class="lock-screen-icon-space">'
                + '<div class="space">'
                + '  <div class="ship">'
                + '    <div class="ship-rotate">'
                + '      <div class="pod"></div>'
                + '      <div class="fuselage"></div>'
                + '    </div>'
                + '  </div>'
                + '  <div class="ship-shadow"></div>'
                + '  <div class="mars">'
                + '    <div class="tentacle"></div>'
                + '    <div class="flag">'
                + '      <div class="small-tentacle"></div>'
                + '    </div>'
                + '    <div class="planet">'
                + '      <div class="surface"></div>'
                + '      <div class="crater1"></div>'
                + '      <div class="crater2"></div>'
                + '      <div class="crater3"></div>'
                + '    </div>'
                + '  </div>'
                + '  <div class="test"></div>'
                + '</div>'
                + '</div>';
        },
        init: function() {
            if(! $("link[href*='icon-space.css']").length) {
                $('head').append('<link href="' + lockScreenCssPath() + 'icons/icon-space.css" rel="stylesheet">');
            }
        }
    },
    avenger: {
        html: function() {
            return '<div class="lock-screen-icon-avenger">'
                + '	<div class="hulk">'
                + '		<div class="head"><div class="mouth"></div></div>'
                + '		<div class="right-arm"></div>'
                + '		<div class="fist"></div>'
                + '		<div class="left-arm"></div>'
                + '		<div class="body"></div>'
                + '		<div class="right-leg"></div>'
                + '		<div class="left-leg"></div>'
                + '	</div>'
                + '	<div class="captain">'
                + '		<div class="head">A</div>'
                + '		<div class="body"><div class="star"></div></div>'
                + '		<div class="arms"></div>'
                + '		<div class="shield"><div class="star"></div></div> '
                + '		<div class="hands"></div>'
                + '		<div class="legs"></div>'
                + '		<div class="boots"></div>'
                + '	</div>'
                + '	<div class="ironman">'
                + '		<div class="helmet"><div class="mask"></div></div>'
                + '		<div class="right-arm"></div>'
                + '		<div class="left-arm"></div>'
                + '		<div class="body"><div class="power"></div></div>'
                + '		<div class="right-leg"></div>'
                + '		<div class="left-leg"></div>'
                + '	</div>  '
                + '	<div class="thor">'
                + '		<div class="helmet"></div>'
                + '		<div class="head">'
                + '			<div class="beard"></div>'
                + '		</div>'
                + '		<div class="cap"></div>'
                + '		<div class="arm-right"></div>'
                + '		<div class="arm-left"></div>'
                + '		<div class="body"></div>'
                + '		<div class="hammer"></div>'
                + '		<div class="legs"></div>'
                + '		<div class="feet"></div>'
                + '	</div> '
                + '</div>';
        },
        init: function() {
            if(! $("link[href*='icon-avenger.css']").length) {
                $('head').append('<link href="' + lockScreenCssPath() + 'icons/icon-avenger.css" rel="stylesheet">');
            }
        }
    },
    cock: {
        html: function() {
            return '<div class="lock-screen-icon-cock">'
                + ' <div class="cuadro">'
                + ' 	<div class="gallina">'
                + ' 		<div class="cuello"></div>'
                + ' 		<ul class="cresta">'
                + ' 			<li></li>'
                + ' 			<li></li>'
                + ' 			<li></li>'
                + ' 			<li></li>'
                + ' 			<li></li>'
                + ' 		</ul>'
                + ' 		<div class="pico"><div>'
                + ' 			<div class="pico3"></div>'
                + ' 			<div class="cuerpo">'
                + ' 				<ul class="plumas">'
                + ' 					<li></li>'
                + ' 					<li></li>'
                + ' 					<li></li>'
                + ' 					<li></li>'
                + ' 					<li></li>'
                + ' 				</ul>'
                + ' 			</div>'
                + ' 			<div class="cola"></div>'
                + ' 			<div class="cola3"></div>'
                + ' 			<div class="patas3"></div>'
                + ' 			<div class="patas"><span></span></div>'
                + ' 		</div>'
                + ' 	</div>'
                + '   </div>'
                + ' </div>';
        },
        init: function() {
            if(! $("link[href*='icon-cock.css']").length) {
                $('head').append('<link href="' + lockScreenCssPath() + 'icons/icon-cock.css" rel="stylesheet">');
            }
        }
    },
    bike: {
        html: function() {
            return '<div class="lock-screen-icon-bike">'
                + '	<div class="bike-screen">'
                + '		<div class="bike">'
                + '			<div class="left-handle"></div>'
                + '			<div class="right-handle"></div>'
                + '			<div class="headlight"></div>'
                + '			<div class="left-suspension"></div>'
                + '			<div class="left-support"></div>'
                + '			<div class="right-suspension"></div>'
                + '			<div class="right-support"></div>'
                + '			<div class="body"></div>'
                + '			<div class="wheel"></div>'
                + '		</div>'
                + '	</div>'
                + '	<div class="road"></div>'
                + '</div>';
        },
        init: function() {
            if(! $("link[href*='icon-bike.css']").length) {
                $('head').append('<link href="' + lockScreenCssPath() + 'icons/icon-bike.css" rel="stylesheet">');
            }
            $(".bike").click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                var el = $(this),
                    newone = el.clone(true);

                el.before(newone);
                $(el).remove();
            });
        }
    }
};