import { decorateCooked } from 'discourse/lib/plugin-api';

export default {
  name: "apply-ooyala",

  initialize: function(container) {
    decorateCooked(container, function($elem) {
      $elem && $elem.find(".ooyala-video").ooyalaPlayer();
    });
  }
};
