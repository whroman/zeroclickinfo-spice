function ddg_spice_4chan(response) {
    var query = decodeURIComponent(rq);
    query = query.replace(/4chan/, '');

    posts = response.posts;

    var answer = '<div>';

    for (var i in posts) {
        var post = posts[i];
        console.log(post);
        answer += '<div class="post highlight_zero_click1 highlight_zero_click_wrapper">'
                + (post.tim ? '<img src="/iu/?u=http://images.4chan.org/b/src/'
                                    + post.tim + post.ext + '">' : '' )
                + '<div class="info">'
                + post.name + ' ' + post.now + ' No.' + post.no
                + '</div>'
                + post.com
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
}
