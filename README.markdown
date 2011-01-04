# github-voice

A [jQuery](http://jquery.com) plug-in to display [GitHub](http://github.com) issues like [UserVoice](http://uservoice.com).

## Examples

### Online

[Check out an online example.](http://tristandunn.github.com/github-voice)

### Defaults

    $('a.default').githubVoice('thoughtbot', 'paperclip');

### Customization

    $('a.custom').githubVoice('thoughtbot', 'paperclip', {
      limit : 3,
      text  : {
        loading      : "Loading ideas...",
        description  : "Below are the top three ideas.",
        callToAction : "View feedback forum."
      }
    });

### Filtering

    $('a.filter').githubVoice('thoughtbot', 'paperclip', {
      filter : {
        user: /thoughtbot/g
      }
    });

### Sorting

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

The MIT License

Copyright (c) 2011 Tristan Dunn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
