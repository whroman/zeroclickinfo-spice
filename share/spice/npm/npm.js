// Wrap callback inside closure.
// This prevents locally define functions
// and variables from muddying the global
// scope
//
// The closure takes one input, `env`
// which gives us access to the global
// scope a.k.a. the current "environment"
(function(env) {

    // Enable ECMAScript 5, "strict mode".
    // Mostly helps with debugging and
    // also enforces stricter syntax rules
    //
    // More info:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode?redirectlocale=en-US&redirectslug=JavaScript%2FStrict_mode
    // http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
    "use strict";

    // Define our callback and expose it to
    // the global scope by defining it as a
    // property of our `env` object
    //
    // Our callback function takes one input,
    // `api_result` which will contain the
    // JSON received from the upstream API
    //
    // The name of the callback *must* be of
    // the form `ddg_spice_` + `spice_name`
    env.ddg_spice_npm = function(api_result) {


        // Ensure we received results in our JSON.
        // In the case of the NPM API, an `error`
        // property is defined when there are no
        // results
        if (api_result.error) {

            // Stop execution of our callback
            // because we have no results
            //
            // Note: the input to `Spice.failed()`
            // should match the name of the Spice
            // used for the callback
            return Spice.failed('npm');
        }

        // Tell the DDG frontend we want
        // to display our Spice result
        Spice.add({

            // Unique identifier.
            // Ssually the Spice's nameis unique
            id: "npm",

            // The name to be used for the AnswerBar
            // tab
            name: "Software",

            // Pass along data to our template.
            // Generally we pass along the entire
            // `api_result` so the template has
            // access to everything
            data: api_result,

            // Metainfo for the "More at" link
            meta: {

                // Source for "More At" link.
                // i.e. "More at <source>"
                sourceName: "npmjs.org",

                // URL for "More at" link.
                // Should be specific to the current result
                // i.e. link should be dynamic
                sourceUrl: 'http://npmjs.org/package/' + api_result.name
            },

            // Tell the DDG frontend what template
            // to use for displatying our result
            //
            // More info: https://duck.co/duckduckhack/spice_displaying#templates
            templates: {

                // Indicate we wish template group to use.
                // More info: https://duck.co/duckduckhack/spice_templates_overview
                group: 'base',

                // Specify options about the
                // template we're using
                //
                // The base group uses the `base_detail`
                // template
                options: {

                    // Indicate which sub-template to use
                    // because the `base_detail` is really
                    // a wrapper template
                    content: Spice.npm.content,

                    // Make sure we display a "More at" link.
                    // By default the `base_detail` doesn't
                    // show a "More at" link
                    moreAt: true
                }
            }
        });
    };
// Import the global scope, `this`
// as the input into our closure.
// Hence, `env` = `this`
}(this));
