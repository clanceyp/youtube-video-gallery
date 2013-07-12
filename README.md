# Youtube video gallery

See http://clanceyp.github.io/youtube-video-gallery for more info.

This is a very simple plugin to display a group of youtube video links as a gallery.

If you are using the colorbox or fancybox plugins, this extension will use it and display the videos in a light box.

## Usage

You can load Youtube videos from a json, or directly from an unordered list e.g...
```xml
<ul class="youtube-videogallery">
    <li><a href="http://www.youtube.com/watch?v=UCOC1YwNwZw">Call me gordie</a></li>
    <li><a href="http://www.youtube.com/watch?v=CjgT8Af1kGc">Bad scooting</a></li>
    <li><a href="http://www.youtube.com/watch?v=4psVnsYlBok">Good scooting</a></li>
    <li><a href="http://www.youtube.com/watch?v=05Cgtg_N4eI">Knitting</a></li>
    <li><a href="http://www.youtube.com/watch?v=d2xQ8K2VJms">More music</a></li>
    <li><a href="http://www.youtube.com/watch?v=pocEg6a6ZpM">YUI Roundtable</a></li>
    <li><a href="http://www.youtube.com/watch?v=ishBOmjHoXE">Sporting moments</a></li>
    <li><a href="http://www.youtube.com/watch?v=0Yww2VhbFL8">Tango!</a></li>
</ul>
```
To convert the above into a gallery use

```javascript
$(document).ready(function(){
    $("ul.youtube-videogallery").youtubeVideoGallery(  );
});
```

For more information see the examples in the 'about' folder





### License

Link Audit is released under the MIT license.

www.opensource.org/licenses/MIT

Thank you : )
