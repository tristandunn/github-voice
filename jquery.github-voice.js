(function($) {
  $.fn.githubVoice = function(user, repository, options) {
    var settings = $.extend({}, $.fn.githubVoice.defaults, options);

    return this.each(function() {
      $(this).click(function() {
        if (settings.overlay) {
          $('body')
            .append('<div id="github-voice-overlay"></div>')
            .find('#github-voice-overlay')
              .css('opacity', 0.75)
              .click(function() {
                $(document).trigger('github-voice.close');
              });
        }

        $('body')
          .append(settings.html)
          .find('#github-voice')
            .find('p.description').html(settings.text.description).end()
            .find('li.loading').html(settings.text.loading).end()
            .find('p.call-to-action a')
              .html(settings.text.callToAction + '<span></span>')
              .attr('href', 'http://github.com/' + user + '/' + repository + '/issues');

        $.getJSON('http://github.com/api/v2/json/issues/list/' + user + '/' + repository + '/open?callback=?', function(data) {
          data.issues.sort(function(a, b) {
            return ((a.votes < b.votes) ? 1 : ((a.votes > b.votes) ? -1 : 0));
          });

          var list = $('#github-voice ol').empty();

          $.each(data.issues, function(index, issue) {
            list.append('<li>' +
              '<p class="votes">' +
                '<em>' + issue.votes + '</em> votes' +
              '</p>' +
              '<h3><a href="http://github.com/' + user + '/' + repository + '/issues#issue/' + issue.number + '">' + issue.title + '</a></h3>' +
            '</li>')

            if (index == (settings.limit - 1)) {
              return false;
            }
          });

          $('#github-voice p.call-to-action span').text(' (' + data.issues.length + ' ideas)')

          $('#github-voice-wrapper').css('margin-top', -1 * ($('#github-voice-wrapper').height() / 2));
        });

        return false;
      });

      $(document).bind('github-voice.close', function() {
        $('#github-voice-overlay, #github-voice-wrapper').remove();
      });
    });
  };

  $.fn.githubVoice.defaults = {
    limit   : 5,
    overlay : true,
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