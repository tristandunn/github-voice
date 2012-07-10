# github-voice

A jQuery plug-in to display GitHub issues like [UserVoice](http://uservoice.com).

## Usage

1. Include [jQuery](http://jquery.com).
2. Include [the plug-in](https://github.com/tristandunn/github-voice/raw/master/jquery.github-voice.js).
3. Call `githubVoice` on an element with the username, project and optional options.

## Example

~~~ js
$(function() {
  $('a.default').githubVoice('thoughtbot', 'paperclip');
});
~~~

[View an example online](http://tristandunn.com/projects/github-voice/).

## Advanced Examples

### Customization

~~~ js
$('a.custom').githubVoice('thoughtbot', 'paperclip', {
  query : { 'labels' : 'idea', 'per_page' : 3 },
  text  : {
    loading      : "Loading ideas...",
    description  : "Below are the top three ideas.",
    callToAction : "View feedback forum."
  }
});
~~~

### Filtering

~~~ js
$('a.filter').githubVoice('thoughtbot', 'paperclip', {
  filter : {
    user: /thoughtbot/g
  }
});
~~~

### Sorting

~~~ js
// Sort by property. (See GitHub API for valid values.)
$('a.sort-updated-desc').githubVoice('thoughtbot', 'paperclip', {
  query : { 'sort' : 'updated', 'direction' : 'desc' }
});
~~~

## Options

### filter

Gives you the ability to filter issues by any information returned by the API. See the [GitHub Issues API](http://developer.github.com/v3/issues/) for valid properties.

### overlay

Enable or disable the overlay when displaying issues.

### query

Custom query options passed to the GitHub API. See the [GitHub Issues API](http://developer.github.com/v3/issues/) for more details.

### text.description

The text displayed above the issue list. (Default: "We've setup a feedback forum so you can tell us what's on your mind. Please go there and be heard!")

### text.loading

The text displayed while the issues are being loaded. (Default: "Loading...")

### text.callToAction

The call-to-action text used for the link below the issue list. (Default: "&#38;raquo; Go to our Feedback Forum")

## License

github-voice uses the MIT license. See LICENSE for more details.
