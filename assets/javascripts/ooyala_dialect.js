Discourse.Markdown.whiteListTag("div", "class", "ooyala-video");
Discourse.Markdown.whiteListTag("div", "data-embed-code", "*");
Discourse.Markdown.whiteListTag("div", "data-embed-width", "*");
Discourse.Markdown.whiteListTag("div", "data-embed-height", "*");

Discourse.Dialect.replaceBlock({
  start: /(\[ooyala\-video[^\]]*\])([\s\S]*)/igm,
  stop: /(\[\/ooyala\-video\])/igm,
  emitter: function(contents, matches) {
    var attrs = {
      'class': 'ooyala-video',
      'data-embed-code': contents.join()
    };

    var opts = matches[1].replace(/(?:^\[ooyala\-video\s*)|(?:\]$)/ig, '').split(" ");

    for (var i=0; i < opts.length; i++) {
      if (!opts[i].length) continue;

      var split = opts[i].split("=");
      attrs["data-embed-" + split[0]] = split[1].replace(/\"/ig, '');
    }

    return ['div', attrs];
  }
});
