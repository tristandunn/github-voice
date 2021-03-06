(function($) {
  $.fn.githubVoice = function(user, repository, options) {
    var githubVoice  = $.fn.githubVoice,
        options      = $.extend(true, {}, githubVoice.defaults, options || {}),
        setup        = options.setup || githubVoice.base;

    options.path = user + '/' + repository;

    for (property in setup) {
      var methods = setup[property];

      for (var i = 0, length = methods.length; i < length; i++) {
        methods[i].call(this, options);
      }
    }

    return this.trigger('github-voice-initialize');
  };

  $.fn.githubVoice.base = {
    initialize: [function(options) {
      this.bind('github-voice-initialize', function() {
        $(this).trigger('github-voice-bindEventListeners');
      });
    }],

    bindEventListeners: [function(options) {
      var path = 'https://api.github.com/repos/' + options.path + '/issues';

      this.bind('github-voice-bindEventListeners', function() {
        var
        element = $(this);
        element.click(function() {
          var cache = element.data('cache');

          if (options.overlay) {
            element.trigger('github-voice-createOverlay');
          }

          element.trigger('github-voice-createElement')
                 .trigger('github-voice-updatePosition');

          if (cache) {
            element.trigger('github-voice-update', [cache]);
          } else {
            $.getJSON(path + '?callback=?', options.query, function(response) {
              var issues = response.data;

              element.data('cache', issues)
                     .trigger('github-voice-update', [issues]);
            });
          }

          return false;
        });
      });
    }],

    createElement: [function(options) {
      this.bind('github-voice-createElement', function() {
        var text = options.text;

        $('body').append(options.html);

        $('#github-voice')
          .find('p.description').html(text.description).end()
          .find('li.loading').html(text.loading).end()
          .find('p.call-to-action a')
            .html(text.callToAction)
            .attr('href', 'http://github.com/' + options.path + '/issues');

        $('#github-voice-wrapper .close').click(function() {
          $('#github-voice-overlay, #github-voice-wrapper').remove();
        });
      });
    }],

    createOverlay: [function(options) {
      this.bind('github-voice-createOverlay', function() {
        $('body')
          .append('<div id="github-voice-overlay"></div>')
          .find('#github-voice-overlay')
            .css({
              width   : $(window).width(),
              height  : $(document).height(),
              opacity : 0.75
            })
            .click(function() {
              $('#github-voice-overlay, #github-voice-wrapper').remove();
            });
      });
    }],

    update: [function(options) {
      this.bind('github-voice-update', function(event, issues) {
        var list = $('#github-voice ol').empty(),
            valid;

        $.each(issues, function(index, issue) {
          if (options.filter) {
            valid = true;

            $.each(options.filter, function(key, value) {
              if (!issue[key].match(value)) {
                valid = false;

                return false;
              }
            });

            if (!valid) {
              return;
            }
          }

          list.append('<li>' +
            '<p class="votes">' +
              '<em>' + issue.comments + '</em> comments' +
            '</p>' +
            '<h3><a href="http://github.com/' + options.path + '/issues#issue/' + issue.number + '">' + issue.title + '</a></h3>' +
          '</li>');
        });

        $('#github-voice p.call-to-action a').append('<span> (' + issues.length + ' ideas)</span>')

        $(this).trigger('github-voice-updatePosition');
      });
    }],

    updatePosition: [function(options) {
      this.bind('github-voice-updatePosition', function() {
        var
        element = $('#github-voice-wrapper');
        element.css('margin-top', -1 * (element.height() / 2));
      });
    }]
  };

  $.fn.githubVoice.defaults = {
    overlay : true,
    filter  : null,
    query   : { 'sort' : 'comments', 'per_page' : 5 },
    text    : {
      loading     : "Loading...",
      description : "We've setup a feedback forum so you can tell us what's on your mind. Please go there and be heard!",
      callToAction: "&raquo; Go to our Feedback Forum"
    },
    html : '' +
    '<div id="github-voice-wrapper">' +
      '<div class="close" />' +
      '<h1>Feedback</h1>' +
      '<div id="github-voice">' +
        '<p class="description"></p>' +
        '<ol>' +
          '<li class="loading"></li>' +
        '</ol>' +
        '<p class="call-to-action"><a href="#"></a></p>' +
      '</div>' +
    '</div>'
  };
})(jQuery);
