(function($) {
  var default_settings = {
    width: "100%"
  };

  var aspect = 1.77777778; // 16/9

  var guid = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };

  var setup = function($target, settings) {
    // Try to get the data attibutes
    var data = $target.data();

    if (data.embedWidth) settings.width = data.embedWidth;
    if (data.embedHeight) settings.height = data.embedHeight;

    var percentage_height = settings.height && settings.height.indexOf("%") >= 0,
        percentage_width = settings.width && settings.width.indexOf("%") >= 0;

    // Determine the propper height to keep the aspect ratio
    if (settings.width && (!settings.height || percentage_height)) {
      var css_width = parseInt($target.css("width"), 0),
          given_width = parseInt(settings.width, 0),
          width, height;

      // Determine width and height in pixels
      width = percentage_width ? css_width / 100 * given_width : given_width;
      height = width / aspect;

      // If height is given in percents substract it
      // from the calculated (correct) height value
      if (percentage_height && settings.height !== "100%") {
        height = height / 100 * parseInt(settings.height, 0);
      }

      settings.height = height + "px";
    }

    $target.css(settings).
      removeClass().addClass("ooyala-player-cooked")[0].id = guid();

    // Wait for OO API
    var interval = setInterval(function() {
      if (typeof OO === "object") {
        // Stop loop
        clearInterval(interval);

        // Init Ooyala player instance
        OO.Player.create(
          $target[0].id,
          $target.data("embed-code"),
          { width: "100%", height: "100%" }
        );
      }
    }, 500);
  };

  $.fn.ooyalaPlayer = function() {
    return this.each(function() {
      setup($(this), $.extend({}, default_settings));
    });
  };
}(jQuery));
