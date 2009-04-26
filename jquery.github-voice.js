(function($) {
  function updatePosition() {
    $('.pane').css('margin-top', -1 * ($('.pane').height() / 2));
  }

  var defaults = {
    limit: 5,
    actionText: "&raquo; Go to our Feedback Forum",
    loadingText: "Loading...",
    explanationText: "We've setup a feedback forum so you can tell us what's on your mind. Please go there and be heard!"
  };

  $.fn.githubVoice = function(user, repository, options) {
    var
    settings = $.extend({}, defaults, options);
    settings.user = user;
    settings.repo = repository;

    function showPane() {
      $('body').append('<div class="overlay"></div>' +
        '<div class="pane">' +
          '<p>' + settings.explanationText + '</p>' +
          '<ol class="ideas">' +
            '<li>' + settings.loadingText + '</li>' +
          '</ol>' +
          '<p class="call-to-action"><a href="http://github.com/' + settings.user + '/' + settings.repo + '/issues">' + settings.actionText + ' <small></small></p>' +
        '</div>');

      $('.pane').data('settings', settings);

      updatePosition();
      fetchIssues();

      $('.overlay').click(function() {
        $(this).remove();
        $('.pane').remove();
      })

      return false;
    }

    function fetchIssues() {
      $('body').append('<script type="text/javascript" src="http://github.com/api/v2/json/issues/list/' + settings.user + '/' + settings.repo + '/open?callback=jQuery.fn.githubVoice.callback"></script>');
    }

    return this.each(function() {
      $(this).click(showPane)
    });
  };

  $.fn.githubVoice.callback = function(data) {
    function sortByVotes(a, b) {
      return ((a.votes < b.votes) ? 1 : ((a.votes > b.votes) ? -1 : 0));
    }

    data.issues.sort(sortByVotes);

    var ideas    = $('.pane ol.ideas').empty();
    var settings = $('.pane').data('settings');

    $.each(data.issues, function(index, issue) {
      ideas.append('<li>' +
        '<p class="votes">' +
          '<em>' + issue.votes + '</em> votes' +
        '</p>' +
        '<h3><a href="http://github.com/' + settings.user + '/' + settings.repo + '/issues#issue/' + issue.number + '">' + issue.title + '</a></h3>' +
      '</li>')

      if (index == (settings.limit - 1)) {
        return false;
      }
    });

    $('.pane .call-to-action small').text('(' + data.issues.length + ' ideas)')

    updatePosition();
  };
})(jQuery);