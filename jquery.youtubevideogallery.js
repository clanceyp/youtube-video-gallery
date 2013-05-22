(function($) {
"use strict";

    $.fn.extend({
        youtubeVideoGallery:function(options) {
            var defaults = {
                    urlLink : 'http://www.youtube.com/watch?v=$id',
                    urlEmbed : 'http://www.youtube.com/embed/$id',
                    urlImg : 'http://img.youtube.com/vi/$id/0.jpg',
                    playButton: 'play-button-red@300.png',
                    innerWidth:425,
                    innerHeight:344,
                    showTitle:true,
                    videos:[]
                };

            function load($this, options) {
                var videos = ( options.videos.length ) ? options.videos : getVideoLinks($this),
                    html = '',
                    href, src, titleSpan, video;

                for (var i = 0, l = videos.length; i < l; i++){
                    video = videos[i];
                    if (!video.id){continue;}
                    href = options.urlLink.replace("$id", video.id);
                    src = options.urlImg.replace("$id", video.id);
                    titleSpan = (!!video.title && options.showTitle) ? '<span class="youtube-videogallery-title">'+ video.title +'</span>' : '';

                    html+= '<li class="youtube-videogallery-item"><a data-youtube-id="'+ video.id +'" href="'+ href +'" class="youtube-videogallery-link"><img class="youtube-videogallery-play" src="'+ options.playButton +'" title="play" /><img class="youtube-videogallery-img" src="'+ src +'" />'+ titleSpan +'</a></li>';
                }
                $this.empty().append(html).addClass('youtube-videogallery-container');
                if ($.colorbox){
                    $("a.youtube-videogallery-link").each(function(i, el){
                        $(el).attr('href', options.urlEmbed.replace("$id", $(el).attr('data-youtube-id') ) );
                    }).colorbox({iframe:true, innerWidth:options.innerWidth, innerHeight:options.innerHeight});
                } else if ($('#lightbox').length){
                    $("a.youtube-videogallery-link").each(function(i, el){
                        $(el).attr('href', $(el).find('img.youtube-videogallery-img').attr('src') );
                    }).attr('rel','lightbox');
                    $('#lightbox img.lb-image, #lightbox div.lb-nav').css({'position':'absolute','left':'-99999px','top':'-99999px'});
                    $('#lightbox div.lb-container').append('<iframe id="youtube-videogallery-iframe" style="width:425px;height:344px" frameborder="0" src="about:blank" />');
                    $('#lightbox, #lightboxOverlay').on('click',function(){
                        $('#youtube-videogallery-iframe').attr('src','about:blank');
                    });
                    $this.delegate('a.youtube-videogallery-link','click',function(e){
                        var el = e.currentTarget;
                        $('#youtube-videogallery-iframe').attr( 'src', options.urlEmbed.replace("$id", $(el).attr('data-youtube-id') ) );
                    });
                } else {
                    /**
                     * todo: no plugin fallback
                     *
                     **/
                 }

                return $this;

                function getVideoLinks($this){
                    var arr = [],
                        a = $this.find("a");
                    a.each(function(i, el){
                        arr.push({
                            id: getId( $(el).attr('href') ),
                            title:$(el).text()
                        });
                    });
                    return arr;
                }
                function getId(href){
                    var id = 0;
                    if (!!href && href.indexOf('?v=') > 0){
                        id = getBefore(href.split('?v=')[1],'&');
                    } else if (!!href && href.indexOf('/embed/')){
                        id = getBefore(href.split('/embed/')[1], '?');
                    }
                    return id;
                }
                function getBefore(str, before){
                    if (str.indexOf(before)){
                        str = str.split(before)[0];
                    }
                    return str;
                }
            }

            options =  $.extend(defaults, options);
            return this.each(function(i, el){
                load($(el), options);
            });
        }
    });

})(window.jQuery);