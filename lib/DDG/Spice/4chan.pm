package DDG::Spice::4chan;

use DDG::Spice;

attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];

triggers any => "4chan";

spice to => 'https://api.4chan.org/$1/res/$2.json';

spice wrap_jsonp_callback => 1;
spice from => '(.*)/(.*)';

handle remainder => sub {
    return unless /^\/?(a|b|c|d|e|f|g|gif|h|hr|k|m|o|p|r|s|t|u|v|vg|w|wg|i|ic|r9k|cm|hm|y|3|adv|an|cgl|ck|co|diy|fa|fit|hc|int|jp|lit|mlp|mu|n|po|pol|sci|soc|sp|tg|toy|trv|tv|vp|wsg|x)\/? *([0-9]+)$/i;

    return $1, $2;#'425586782';
};

1;



