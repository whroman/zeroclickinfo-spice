#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::4chan )],
    '4chan /b/000000' => test_spice(
        '/js/spice/4chan/b/000000',
        call_type => 'include',
        caller => 'DDG::Spice::4chan'
    ),
);

done_testing;

