function ddg_spice_4chan(response) {
    var query = decodeURIComponent(rq);
    query = query.replace(/4chan/, '');

    var posts = response.posts;
    var answer = '<div>';
    var expandLinks = [];
    var fullComment = {};

    for (var i in posts) {
        var post = posts[i];
        var comment = post.com;
        expandLinks.push("expand_" + post.no);
        comment = comment.replace(/<br>/g, '\n')
                         .replace(/<[^>]*>/g, " ")
                         .replace(/&(!?:#44;)/g, '&amp;')
                         .replace(/>/g, '&gt;')
                         .replace(/</g, '&lt;');
        fullComment[post.no] = comment.replace(/\n/g, "<br>");
        if (comment.length > 200) {
            comment = comment.substring(0, 200)
                    + '... <span class="expand" id="expand_' + post.no + '">More</span>';
        }
        console.log(post);
        answer += '<div class="post highlight_zero_click1 highlight_zero_click_wrapper'
                + (i > 0 ? ' reply' : '') + '">'
                + (post.tim ? '<img src="/iu/?u=http://images.4chan.org/b/src/'
                                    + post.tim + post.ext + '">' : '' )
                + '<div class="info">'
                + post.name + ' ' + post.now + ' No.' + post.no
                + '</div>'
                + '<div id="post_' + post.no + '">"'
                + comment
                + '</div>'
                + '</div>';
    }

    answer += '</div>';


	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = answer;
	items[0]['h'] = query + " (4chan)";
	items[0]['s'] = '4chan';
	items[0]['u'] = 'https://4chan.org';
    items[0]["force_big_header"] = true;
	
    nra(items, 0, 1);

    YAHOO.util.Event.addListener(expandLinks, "click", function(e) {
        var id = this.id.replace(/^expand_/, '');
        document.getElementById('post_' + id).innerHTML = fullComment[id];
    });

    YAHOO.util.Event.addListener(expandLinks, "mouseenter", function(e) {
        YAHOO.util.Dom.setStyle(this, 'text-decoration', 'underline');
    });
    YAHOO.util.Event.addListener(expandLinks, "mouseleave", function(e) {
        YAHOO.util.Dom.setStyle(this, 'text-decoration', 'none');
    });
}
