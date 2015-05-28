(function($) {
  var default_settings = {
    allowfullscreen: true,
    frameborder: "0",
    width: "690",
    height: "388"
  };

  var setup = function($target, settings) {
    var data = $target.data();

    if (data.embedWidth) settings.width = data.embedWidth;
    if (data.embedHeight) settings.hight = data.embedHight;

    var $iframe = $("<iframe />", $.extend(settings, {
      src: "http://player.ooyala.com/player.swf?embedCode=" + $target.data("embed-code") + "&version=2"
    }));

    $target.html($iframe).removeClass();
  };

  $.fn.ooyalaPlayer = function(settings) {
    settings = $.extend(default_settings, settings);

    return this.each(function() { setup($(this), settings); });
  };
}(jQuery));
