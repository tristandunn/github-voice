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
  limit : 3,
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
// Sort by property.
$('a.sort-desc').githubVoice('thoughtbot', 'paperclip', {
  sort : 'number'
});

// Sort by a custom function.
$('a.sort-asc').githubVoice('thoughtbot', 'paperclip', {
  sort : function(a, b) {
    return ((a.number < b.number) ? -1 : ((a.number > b.number) ? 1 : 0));
  }
});
~~~

## Options

### limit

The number of issues to display. (Default: 5)

### filter

Gives you the ability to filter issues by any information returned by the API. At the time of writing the possible values are: number, votes, created_at, body, title, updated_at, user, state

### sort

Provide a string it will sort by that property in descending order. Provide a function to use a custom sort. (Default: "votes")

### text.description

The text displayed above the issue list. (Default: "We've setup a feedback forum so you can tell us what's on your mind. Please go there and be heard!")

### text.loading

The text displayed while the issues are being loaded. (Default: "Loading...")

### text.callToAction

The call-to-action text used for the link below the issue list. (Default: "&#38;raquo; Go to our Feedback Forum")

## License

github-voice uses the MIT license. See LICENSE for more details.
