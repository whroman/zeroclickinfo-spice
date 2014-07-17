package DDG::Spice::Npm;
# ABSTRACT: Returns package information from npm package manager's registry.

# Make sure we import the Spice class
use DDG::Spice;

# Provide metadata to be used for attribution
primary_example_queries "npm underscore";
description "Shows an NPM package";
name "NPM";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Npm.pm";
icon_url "/i/npmjs.org.ico";
topics "sysadmin", "programming";
category "programming";
attribution github  => ['https://github.com/remixz', 'remixz'],
            twitter => ['https://twitter.com/zachbruggeman', 'zachbruggeman'];

# Indicate the triggers for this instant answer
# `startend` means if `npm` is at the beginning
# or end of the query
triggers startend => 'npm';

# Indidacte the API call to make
# `$1` will be replavced with the
# string  returned by our `handle`
# function below
spice to => 'http://registry.npmjs.org/$1/latest';

# Wrap the API response in a
# function call because the
# API we're using doesn't support
# JSONP
#
# More info:
#
spice wrap_jsonp_callback => 1;

# Takes the `remainder` of the query,
# after removing any `triggers`.
#
# The `remainder` is automatically
# converted to a string and pushed
# into Perl's `$_` variable
handle remainder => sub {

    # If the remainder exists,
    # lowercase it (`lc`),
    # and `return` it
    return lc $_ if $_;

    # Otherwise, return nothing.
    # This means our spice won't
    # be displayed and the JS
    # will *not* be executed
    return;
};

1;
