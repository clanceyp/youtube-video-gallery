(function($) {
"use strict";

    $.fn.extend({
        youtubeVideoGallery:function(options) {
            var defaults = {
                    urlLink : 'http://www.youtube.com/watch?v=$id',
                    urlEmbed : 'http://www.youtube.com/embed/$id',
                    urlImg : 'http://img.youtube.com/vi/$id/0.jpg',
                    assetFolder : '',
                    playButton: 'play-button-red@300.png',
                    newWindow: '(opens in a new window)',
                    innerWidth:425,
                    innerHeight:344,
                    plugin:'self',
                    showTitle:true,
                    iframeTemplate:'<iframe title="Youtube video player" id="youtube-videogallery-iframe" style="height:{options.innerHeight}px;width:{options.innerWidth}px;" frameborder="0" src="about:blank" />',
                    videos:[]
                };

            this.test = {};

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
                var id = '';
                if (!!href && href.indexOf('?v=') > 0){
                    id = getBefore(href.split('?v=')[1],'&');
                } else if (!!href && href.indexOf('/embed/') > 0){
                    id = getBefore(href.split('/embed/')[1], '?');
                }
                return id;
            }
            function getBefore(str, before){
                if (!!str && str.indexOf(before)){
                    str = str.split(before)[0];
                }
                return str;
            }
            function getIframeTemplate(innerWidth, innerHeight){
                var str = options.iframeTemplate;
                return str.replace('{options.innerHeight}', innerHeight).replace('{options.innerWidth}', innerWidth);
            }
            function open(e){
                var el = e.currentTarget;
                e.preventDefault();
                $('div.youtube-videogallery-bodycover').css( { 'height':$(document).height()} );
                $('div.youtube-videogallery-display').css({
                    'marginLeft':-options.innerWidth/2,
                    'marginTop':-options.innerHeight/2
                });
                $('#youtube-videogallery-iframe').attr( 'src', options.urlEmbed.replace("$id", $(el).attr('data-youtube-id') ) );
                $('body').addClass('youtube-videogallery-active');
            }
            function close(e){
                $('#youtube-videogallery-iframe').attr( 'src', 'about:blank');
                $('body').removeClass('youtube-videogallery-active');
            }

            this.test = {
                getBefore:getBefore,
                getId:getId,
                getVideoLinks:getVideoLinks,
                getIframeTemplate:getIframeTemplate
            };

            function load($this, options) {
                var videos = ( options.videos.length ) ? options.videos : getVideoLinks($this),
                    html = '',
                    href, src, titleSpan, video, playButtonSrc;

                for (var i = 0, l = videos.length; i < l; i++){
                    video = videos[i];
                    if (!video.id){continue;}
                    href = options.urlLink.replace("$id", video.id);
                    src = options.urlImg.replace("$id", video.id);
                    playButtonSrc = (!!options.assetFolder) ? options.assetFolder +'/'+ options.playButton : options.playButton ;
                    titleSpan = (!!video.title && options.showTitle) ? '<span class="youtube-videogallery-title">'+ video.title +'</span>' : '';

                    html+= '<li class="youtube-videogallery-item"><a title="'+video.title+'" data-youtube-id="'+ video.id +'" href="'+ href +'" class="youtube-videogallery-link"><img class="youtube-videogallery-play" src="'+ playButtonSrc +'" title="play" /><img class="youtube-videogallery-img" src="'+ src +'" />'+ titleSpan +'</a></li>';
                }
                $this.empty().append(html).addClass('youtube-videogallery-container');
                if (options.plugin === 'colorbox' && $.colorbox){
                    $this.find("a.youtube-videogallery-link").each(function(i, el){
                        $(el)
                            .attr('href', options.urlEmbed.replace("$id", $(el).attr('data-youtube-id') ) )
                            .attr('aria-controls','youtube-videogallery-iframe')
                            .colorbox({iframe:true, innerWidth:options.innerWidth, innerHeight:options.innerHeight});
                    });
                } else if (options.plugin === 'lightbox' && $('#lightbox').length){
                    $this.find("a.youtube-videogallery-link").each(function(i, el){
                        $(el)
                            .attr('href', $(el).find('img.youtube-videogallery-img').attr('src') )
                            .attr('aria-controls','youtube-videogallery-iframe')
                            .attr('rel','lightbox');
                    });
                    $('#lightbox img.lb-image, #lightbox div.lb-nav').css({'position':'absolute','left':'-99999px','top':'-99999px'});
                    $('#lightbox div.lb-container').append( getIframeTemplate(options.innerWidth, options.innerHeight) );
                    $('#lightbox, #lightboxOverlay').on('click',function(){
                        $('#youtube-videogallery-iframe').attr('src','about:blank');
                    });
                    $this.delegate('a.youtube-videogallery-link','click',function(e){
                        var el = e.currentTarget;
                        $('#youtube-videogallery-iframe').attr( 'src', options.urlEmbed.replace("$id", $(el).attr('data-youtube-id') ) );
                    });
                } else if (options.plugin === 'self'){
                    if (!$('div.youtube-videogallery-bodycover').length){
                        $('body')
                            .append('<div class="youtube-videogallery-bodycover"/>')
                            .append('<div class="youtube-videogallery-display">'+ getIframeTemplate(options.innerWidth, options.innerHeight) +'</div>');
                        $('div.youtube-videogallery-bodycover').on('click',close);
                        $(document).on('keydown', function(e) {
                            if (e.which === 27) {
                                close();
                            }
                        });
                    }
                    $this.find("a.youtube-videogallery-link").on('click',open);
                } else {
                    $this.find("a.youtube-videogallery-link")
                        .attr('target','_blank')
                        .append('<span class="youtube-videogallery-screen-reader-only">'+options.newWindow+'</span>')
                        .each(function(i, el){
                            $(el).attr('title', $(el).attr('title')+' '+ options.newWindow);
                        });
                }

                return $this;

            }

            options =  $.extend(defaults, options);
            return this.each(function(i, el){
                load($(el), options);
            });
        }
    });

})(window.jQuery);