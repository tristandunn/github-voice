# github-voice

A [jQuery](http://jquery.com) plug-in to display [GitHub](http://github.com) issues like [UserVoice](http://uservoice.com).

## Examples

### Defaults

    $('a.defaults').githubVoice('defunkt', 'github-issues');

### Customization

    $('a.custom').githubVoice('defunkt', 'github-issues', {
      limit: 3,
      actionText: "View feedback forum.",
      loadingText: "Loading ideas...",
      explanationText: "Below are the top three ideas."
    });

## Options

### limit

The number of issues to display. (Default: 5)

### actionText

The call-to-action text used for the link below the issue list. (Default: "&amp;raquo; Go to our Feedback Forum")

### loadingText

The text displayed while the issues are being loaded. (Default: "Loading...")

### explanationText

The text displayed above the issue list. (Default: "We've setup a feedback forum so you can tell us what's on your mind. Please go there and be heard!")

## License

The MIT License

Copyright (c) 2009 Tristan Dunn

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