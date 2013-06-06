(function($) {
"use strict";

    $.fn.extend({
        youtubeVideoGallery:function(options) {
            var defaults = {
                    assetFolder : '',
                    fancybox : {
                        openEffect : 'none',
                        closeEffect : 'none',

                        arrows : false,
                        helpers : {
                            media : {},
                            buttons : {}
                        }
                    },
                    iframeTemplate:'<iframe title="Youtube video player" id="youtube-videogallery-iframe" style="height:{options.innerHeight}px;width:{options.innerWidth}px;" frameborder="0" src="about:blank" />',
                    innerHeight:344,
                    innerWidth:425,
                    newWindow: '(opens in a new window)',
                    playButton: 'play-button-red@40.png',
                    plugin:'self',
                    showTitle:true,
                    thumbWidth:150,
                    videos:[],
                    urlImg : 'http://img.youtube.com/vi/$id/0.jpg',
                    urlEmbed : 'http://www.youtube.com/embed/$id',
                    urlLink : 'http://www.youtube.com/watch?v=$id'
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
            function setButtonMargin(w, h, context){
                if (w === 0 || h === 0){
                    $(context).find("img.youtube-videogallery-play").remove();
                    return;
                }
                $(context).find("img.youtube-videogallery-play").css({
                    'marginLeft':-w/2 +'px',
                    'marginTop':-h/2 +'px'
                });
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
                    href, src, titleSpan, video,
                    playButtonSrc = (!!options.assetFolder) ? options.assetFolder +'/'+ options.playButton : options.playButton ,
                    img = document.createElement('img');
                img.onload = function(){
                    setButtonMargin(this.width, this.height, $this);
                }
                img.onerror = function(){
                    setButtonMargin(0, 0, $this);
                }
                img.src = playButtonSrc;

                for (var i = 0, l = videos.length; i < l; i++){
                    video = videos[i];
                    if (!video.id){continue;}
                    href = options.urlLink.replace("$id", video.id);
                    src = options.urlImg.replace("$id", video.id);
                    titleSpan = (!!video.title && options.showTitle) ? '<span class="youtube-videogallery-title">'+ video.title +'</span>' : '';

                    html+= '<li class="youtube-videogallery-item"><a title="'+video.title+'" data-youtube-id="'+ video.id +'" href="'+ href +'" class="youtube-videogallery-link" style="width:'+options.thumbWidth+'px"><img class="youtube-videogallery-play" src="'+ playButtonSrc +'" title="play" /><img class="youtube-videogallery-img" src="'+ src +'" style="width:'+options.thumbWidth+'px" />'+ titleSpan +'</a></li>';
                }
                $this.empty().append(html).addClass('youtube-videogallery-container');
                if (options.supported && options.plugin === 'colorbox' && $.colorbox){
                    $this.find("a.youtube-videogallery-link").each(function(i, el){
                        $(el)
                            .attr('href', options.urlEmbed.replace("$id", $(el).attr('data-youtube-id') ) )
                            .attr('aria-controls','youtube-videogallery-iframe')
                            .colorbox({iframe:true, innerWidth:options.innerWidth, innerHeight:options.innerHeight});
                    });
                } else if (options.supported && options.plugin === 'fancybox' && !!$().fancybox){
                    $this.find("a.youtube-videogallery-link").each(function(i, el){
                        $(el)
                            .attr('rel', 'media-gallery')
                            .fancybox({
                                openEffect : options.fancybox.openEffect,
                                closeEffect : options.fancybox.closeEffect,
                                prevEffect : options.fancybox.prevEffect,
                                nextEffect : options.fancybox.nextEffect,

                                arrows : false,
                                helpers : {
                                    media : options.fancybox.helpers.media,
                                    buttons : options.fancybox.helpers.buttons
                                }
                            });
                    });
                } else if (options.supported && options.plugin === 'self'){
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
            options.supported = !!$().on;
            return this.each(function(i, el){
                load($(el), options);
            });
        }
    });

})(window.jQuery);