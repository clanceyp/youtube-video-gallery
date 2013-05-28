/**
 * Created with IntelliJ IDEA.
 * User: patrickclancey
 * Date: 28/05/2013
 * Time: 10:41
 * To change this template use File | Settings | File Templates.
 */







test( "No video links on current page", function() {
    ok( jQuery().youtubeVideoGallery().test.getVideoLinks( jQuery('#test-html') ).length === 0, "Passed" );
});
test( "One video link on current page", function() {
    $('#test-html').append('<a href="href">title</a>');
    ok( jQuery().youtubeVideoGallery().test.getVideoLinks( jQuery('#test-html') ).length === 1, "Passed" );
    $('#test-html').empty();
});

test( "Get before, returns the string before a given substring", function() {
    ok( jQuery().youtubeVideoGallery().test.getBefore( 'abcdefg', 'efg' ) === 'abcd', "Passed" );
});
test( "Get before, returns the string entire string if substring not found", function() {
    ok( jQuery().youtubeVideoGallery().test.getBefore( 'abcdefg', 'xwz' ) === 'abcdefg', "Passed" );
});
test( "Get before, returns empty string if empty string is passed in", function() {
    ok( jQuery().youtubeVideoGallery().test.getBefore( '', '' ) === '', "Passed" );
});

test( "Get id, returns the id if URL format links to normal page", function() {
    ok( jQuery().youtubeVideoGallery().test.getId( 'http://www.youtube.com/watch?v=XNsa1mu12yI' ) === 'XNsa1mu12yI', "Passed" );
});
test( "Get id, returns the id if URL format links to embed page", function() {
    ok( jQuery().youtubeVideoGallery().test.getId( 'http://www.youtube.com/embed/XNsa1mu12yI' ) === 'XNsa1mu12yI', "Passed" );
});
test( "Get id, returns empty string if it's not a youtube url", function() {
    ok( jQuery().youtubeVideoGallery().test.getId( 'https://www.google.co.uk/' ) === '', "Passed" );
});


test( "Get iframe template", function() {
    ok( jQuery().youtubeVideoGallery().test.getIframeTemplate( 200, 100 ) === '<iframe title="Youtube video player" id="youtube-videogallery-iframe" style="height:100px;width:200px;" frameborder="0" src="about:blank" />', "Passed" );
    ok( jQuery().youtubeVideoGallery().test.getIframeTemplate( 400, 200 ) === '<iframe title="Youtube video player" id="youtube-videogallery-iframe" style="height:200px;width:400px;" frameborder="0" src="about:blank" />', "Passed" );
});

