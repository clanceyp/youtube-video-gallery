# Youtube video gallery

This is a very simple plugin to display a group of youtube video links as a gallery.

If you are using the colorbox or fancybox plugins, this extension will use it and display the videos in a light box.


## API

### Usage

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
To convert the above into

```javascript
$(document).ready(function(){
    $("ul.youtube-videogallery").youtubeVideoGallery(  );
});
```


### Settings

Available settings

```javascript
defaults = {
    assetFolder : '',
    iframeTemplate:'<iframe title="Youtube video player" id="youtube-videogallery-iframe" style="height:{options.innerHeight}px;width:{options.innerWidth}px;" frameborder="0" src="about:blank" />',
    innerHeight:344,
    innerWidth:425,
    newWindow: '(opens in a new window)',
    playButton: 'play-button-red@300.png',
    plugin:'self',
    showTitle:true,
    videos:[],
    urlEmbed : 'http://www.youtube.com/embed/$id',
    urlImg : 'http://img.youtube.com/vi/$id/0.jpg',
    urlLink : 'http://www.youtube.com/watch?v=$id'
}
```

#### assetFolder
default: ''

folder where the play button image can be found
```javascript
$(document).ready(function(){
    $("ul.youtube-videogallery").youtubeVideoGallery( {assetFolder:'/img'} );
});
```

#### iframeTemplate

default: '<iframe title="Youtube video player" id="youtube-videogallery-iframe" style="height:{options.innerHeight}px;width:{options.innerWidth}px;" frameborder="0" src="about:blank" />'
if you overwrite this, insure you retain the @id, the options.innerHeight and options.innerWidth values
```javascript
$(document).ready(function(){
    $("ul.youtube-videogallery").youtubeVideoGallery( {iframeTemplate:'[my-template]'} );
});
```

#### innerHeight
default: 344


#### innerWidth
default: 425

```javascript
$(document).ready(function(){
    $("ul.youtube-videogallery").youtubeVideoGallery( {innerHeight:688, innerWidth:850} );
});
```


#### newWindow

default: '(opens in a new window)'

This is used appended to the links if no plugin is being used.

```javascript
$(document).ready(function(){
    $("ul.youtube-videogallery").youtubeVideoGallery( {newWindow:'(Buɗe da sabon taga)'} );
});
```

#### playButton
default: 'play-button-red@300.png'

use in conjunction with assetFolder

### plugin

default: 'self'

Supports
* 'none' draws the gallery but retains the direct links to Youtube
* 'colorbox' uses the colorbox plugin from www.jacklmoore.com

```javascript
$(document).ready(function(){
    $("ul.youtube-videogallery").youtubeVideoGallery( {plugin:'colorbox'} );
});
```

#### showTitle
default: true

Set to false to prevent title from showing

```javascript
$(document).ready(function(){
    $("ul.youtube-videogallery").youtubeVideoGallery( {showTitle: false} );
});
```
#### videos
default: []

To load a list of videos from a javascript array
```javascript
video = {
    id: 'video-id',
    title: 'video title'
}
$(document).ready(function(){
    $("ul.youtube-videogallery").youtubeVideoGallery( {videos: [video, video, video]} );
});
```
### urlEmbed
default: 'http://www.youtube.com/embed/$id'
If you edit this retain the $id variable

### urlImg
default: 'http://img.youtube.com/vi/$id/0.jpg'
If you edit this retain the $id variable

### urlLink
default:  'http://www.youtube.com/watch?v=$id'
If you edit this retain the $id variable

```javascript
$(document).ready(function(){
    $("ul.youtube-videogallery").youtubeVideoGallery( {
        urlImg : 'http://img.youtube.com/vi/$id/0.jpg',
        urlEmbed : 'http://www.youtube.com/embed/$id',
        urlLink : 'http://www.youtube.com/watch?v=$id'
    } );
});
```






License

Link Audit is released under the MIT license.

www.opensource.org/licenses/MIT

Thank you : )