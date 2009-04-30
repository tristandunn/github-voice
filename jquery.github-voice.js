(function($) {
  $.fn.githubVoice = function(user, repository, options) {
    var settings = $.extend(true, {}, $.fn.githubVoice.defaults, options);

    function updatePosition() {
      $('#github-voice-wrapper').css('margin-top', -1 * ($('#github-voice-wrapper').height() / 2));
    }

    return this.each(function() {
      $(this).click(function() {
        if (settings.overlay) {
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
        }

        $('body')
          .append(settings.html)
          .find('#github-voice')
            .find('p.description').html(settings.text.description).end()
            .find('li.loading').html(settings.text.loading).end()
            .find('p.call-to-action a')
              .html(settings.text.callToAction)
              .attr('href', 'http://github.com/' + user + '/' + repository + '/issues');

        updatePosition();

        $.getJSON('http://github.com/api/v2/json/issues/list/' + user + '/' + repository + '/open?callback=?', function(data) {
          var sort = settings.sort;

          if (typeof sort == 'string') {
            data.issues.sort(function(a, b) {
              return ((a[sort] < b[sort]) ? 1 : ((a[sort] > b[sort]) ? -1 : 0));
            });
          } else if (typeof sort == 'function') {
            data.issues.sort(sort);
          }

          var list  = $('#github-voice ol').empty();
          var count = 0;
          var valid;

          $.each(data.issues, function(index, issue) {
            valid = true;

            $.each(settings.filter, function(key, value) {
              if (!issue[key].match(value)) {
                valid = false;

                return false;
              }
            });

            if (!valid) {
              return;
            }

            list.append('<li>' +
              '<p class="votes">' +
                '<em>' + issue.votes + '</em> votes' +
              '</p>' +
              '<h3><a href="http://github.com/' + user + '/' + repository + '/issues#issue/' + issue.number + '">' + issue.title + '</a></h3>' +
            '</li>');

            count++;

            if (count == settings.limit) {
              return false;
            }
          });

          $('#github-voice p.call-to-action a').append('<span> (' + data.issues.length + ' ideas)</span>')

          updatePosition();
        });

        return false;
      });
    });
  };

  $.fn.githubVoice.defaults = {
    sort    : 'votes',
    limit   : 5,
    overlay : true,
    filter  : {},
    text    : {
      loading     : "Loading...",
      description : "We've setup a feedback forum so you can tell us what's on your mind. Please go there and be heard!",
      callToAction: "&raquo; Go to our Feedback Forum"
    },
    html : '\
    <div id="github-voice-wrapper"> \
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
})(jQuery);