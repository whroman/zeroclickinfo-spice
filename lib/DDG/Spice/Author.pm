package DDG::Spice::Author;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use strict;
use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching
# spice is_cached => 1; 

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "Author";
source "foo.com";
icon_url "http://none.png";
description "Succinct explanation of what this instant answer does";
primary_example_queries "first example query", "second example query";
secondary_example_queries "optional -- demonstrate any additional triggers";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
# category "";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
# topics "";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Author.pm";
attribution github => ["GitHubAccount", "https://github.com/whroman"];

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice to => 'https://openlibrary.org/search.json?title=$1';
spice wrap_jsonp_callback => 1;

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers startend => "author of";

# Handle statement
handle remainder => sub {

    # optional - regex guard
    # return unless qr/^\w+/;
    print STDOUT $_;
    print STDOUT "\n\n";

    return unless $_;    # Guard against "no answer"
    $_ =~ s/\s/+/g;
    return $_;
};

1;