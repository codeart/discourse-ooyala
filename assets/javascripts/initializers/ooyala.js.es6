import { decorateCooked } from 'discourse/lib/plugin-api';

export default {
  name: "apply-ooyala",

  initialize: function(container) {
    $("head").append($("<script/>", {
      src: "http://player.ooyala.com/v3/" + Discourse.SiteSettings.ooyala_player_id + "?platform=html5-fallback",
      type: 'text/javascript'
    }));

    decorateCooked(container, function($elem) {
      $elem && $elem.find(".ooyala-video").ooyalaPlayer();
    });
  }
};
