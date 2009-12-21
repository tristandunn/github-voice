(function($) {
  $.fn.githubVoice = function(user, repository, options) {
    options      = $.extend(true, {}, $.fn.githubVoice.defaults, options || {});
    options.path = user + '/' + repository;

    this.setupExtras(options.setup || $.fn.githubVoice.base, options);
    this.each(function() {
      $(this).trigger('github-voice-initialize');
    });

    return this;
  };

  $.fn.githubVoice.base = {
    initialize: [function(options) {
      this.bind('github-voice-initialize', function() {
        $(this).trigger('github-voice-bindEventListeners');
      });
    }],

    bindEventListeners: [function(options) {
      this.bind('github-voice-bindEventListeners', function() {
        var element = $(this)

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
            var url  = 'http://github.com/api/v2/json/issues/list/';
            var path = options.path + '/open';

            $.getJSON(url + path + '?callback=?', function(data) {
              element.trigger('github-voice-update', [data]);
              element.data('cache', data);
            });
          }

          return false;
        });
      });
    }],

    createElement: [function(options) {
      this.bind('github-voice-createElement', function() {
        $('body').append(options.html);

        $('#github-voice')
          .find('p.description').html(options.text.description).end()
          .find('li.loading').html(options.text.loading).end()
          .find('p.call-to-action a')
            .html(options.text.callToAction)
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
      this.bind('github-voice-update', function(event, data) {
        var sort  = options.sort,
            list  = $('#github-voice ol').empty(),
            count = 0,
            valid;

        data.issues.sort($.isFunction(sort)
                         ? sort
                         : function(a, b) {
                             return ((a[sort] < b[sort]) ?
                                     1 : ((a[sort] > b[sort]) ? -1 : 0));
                           }
                        );

        $.each(data.issues, function(index, issue) {
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
              '<em>' + issue.votes + '</em> votes' +
            '</p>' +
            '<h3><a href="http://github.com/' + options.path + '/issues#issue/' + issue.number + '">' + issue.title + '</a></h3>' +
          '</li>');

          if (++count == options.limit) {
            return false;
          }
        });

        $('#github-voice p.call-to-action a').append('<span> (' + data.issues.length + ' ideas)</span>')

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
    sort    : 'votes',
    limit   : 5,
    overlay : true,
    filter  : null,
    text    : {
      loading     : "Loading...",
      description : "We've setup a feedback forum so you can tell us what's on your mind. Please go there and be heard!",
      callToAction: "&raquo; Go to our Feedback Forum"
    },
    html : '\
    <div id="github-voice-wrapper"> \
      <div class="close" /> \
      <h1>Feedback</h1> \
      <div id="github-voice"> \
        <p class="description"></p> \
        <ol> \
          <li class="loading"></li> \
        </ol> \
        <p class="call-to-action"><a href="#"></a></p> \
      </div> \
    </div>'
  };

  // From:
  // http://yehudakatz.com/2009/04/20/evented-programming-with-jquery/
  jQuery.fn.setupExtras = function(setup, options) {
    for (property in setup) {
      var self = this;

      if (setup[property] instanceof Array) {
        for (var i = 0; i < setup[property].length; i++) {
          setup[property][i].call(self, options);
        }
      } else {
        setup[property].call(self, options);
      }
    }
  };
})(jQuery);
