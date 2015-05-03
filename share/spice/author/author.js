(function(env) {
    "use strict";
    env.ddg_spice_author = function(apiResult) {
        console.log(apiResult);
        if (
            !apiResult ||
            apiResult.numFound < 1
        ) return Spice.failed('author');

        var getBest = function (results) {
            var authors = (function(results) {
                var authors = {};
                authors.best = {count: 0};
                authors.all = {};

                authors.init = function () {
                    this.defineAuthors();
                    this.defineBest();
                    return this;
                };

                authors.defineAuthors = function () {
                    var i = 0;
                    var len = results.length;
                    for (i; i < len; i++) {
                        var doc = results[i];
                        if (doc.author_name !== undefined) this.set(doc, doc.author_name);
                        if (doc.author_alternative_name !== undefined) this.set(doc, doc.author_alternative_name);
                    }
                };

                authors.set = function (doc, authorNames) {
                    var i = 0;
                    var len = authorNames.length;
                    for (i; i < len; i++) {
                        var author = authorNames[i];
                        if (this.all[author] !== undefined) {
                            this.all[author].name = author;
                            this.all[author].count++;
                            this.all[author].books.push(doc);
                            break;
                        }
                        this.all[author] = {
                            count: 0,
                            books: []
                        };
                    }
                };

                authors.defineBest = function () {
                    var name;
                    for (name in this.all) {
                        var authorObj = this.all[name];
                        if (authorObj.count > this.best.count) {
                            this.best = authorObj;
                        }
                    }
                };

                return authors.init();
            })(results);

            var books = (function(bestAuthor) {
                var books = {};
                books.best = {
                    edition_count: -Infinity,
                    first_publish_year: -Infinity
                };
                books.defineBest = function () {
                    var i = 0;
                    var len = bestAuthor.books.length;
                    for (i; i < len; i++) {
                            var book = bestAuthor.books[i];
                            console.log(book.title)
                            console.log(book.title_suggest, book.edition_count, book.first_publish_year);
                            var isBetterBook = (
                                // `book` is better if it has more editions
                                book.edition_count > this.best.edition_count || (
                                    // If both books have same amount of editions, the better one is the one that was published first
                                        book.edition_count == this.best.edition_count &&
                                        book.first_publish_year < this.best.first_publish_year
                                    )
                            );
                            if (isBetterBook) this.best = book;
                    }
                    return this;
                };

                return books.defineBest();
            })(authors.best);

            var best = {};
            best.author = authors.best.name;
            best.book = books.best;
            console.log(authors.best);
            console.log(books.best);
            return best;
        };

        var bestResult = getBest(apiResult.docs);

        var url = 'http://openlibrary.org';
        var link = url + bestResult.book.key;

        var templateScope = {};
        templateScope.title = bestResult.book.title_suggest;
        templateScope.first_publish_year = bestResult.book.first_publish_year;
        templateScope.author = bestResult.author;
        templateScope.link = link

        console.log(templateScope)

        // Render the response
        Spice.add({
            id: "author",
            // Customize these properties
            name: "Author",
            data: templateScope,
            meta: {
                sourceName: url,
                sourceUrl: link
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.author.author,
                    moreAt: true
                }
            }
        });
    };
}(this));