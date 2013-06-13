/**
 * youtubeVideoGallery plugin for jquery
 * Simple video gallery for youtube, for more details see http://plugins.jquery.com/youtubevideogallery
 *
 * @author clanceyp
 * @see http://plugins.jquery.com/youtubevideogallery/
 * @version 1.2.0
 *
 */


;(function($) {
"use strict";

    $.fn.extend({
        youtubeVideoGallery:function(options) {
            var version = '1.2.0',
                defaults = {
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
                    style:'',
                    thumbWidth:150,
                    titleLimit:true,
                    videos:[],
                    urlImg : 'http://img.youtube.com/vi/$id/0.jpg',
                    urlEmbed : 'http://www.youtube.com/embed/$id',
                    urlLink : 'http://www.youtube.com/watch?v=$id'
                };

            this.test = {};
            this.version = version;

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
                } else if (!!href && href.indexOf('video:') > 0){
                    id = getBefore(href.split('video:')[1], ':');
                } else if (!!href){
                    id = href;
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
            function getStyle(style){
                if (!!style){
                    return "youtube-videogallery-" + style;
                }
                return '';
            }
            function getTitleStyle(allow){
                return allow ? 'youtube-videogallery-allowtitle' : '';
            }
            function getVideosFromFeed(data){
                var videos = [],
                    items = (data && data.feed && data.feed.entry) ? data.feed.entry : (data && data.data && data.data.items) ? data.data.items : [];
                $( items ).each(function(i, item){
                    videos.push({
                        id: getId(item.id.$t || item.id),
                        title: item.title.$t || item.title
                    });
                });
                return videos;
            }
            /**
             * this.test = object
             *
             * Test object to expose private methods to a test API.
             * This allows us to test private methods, without
             * exposing them (e.g. they can't be overwritten)
             *
             */
            this.test = {
                getBefore:getBefore,
                getId:getId,
                getVideoLinks:getVideoLinks,
                getIframeTemplate:getIframeTemplate,
                getTitleStyle:getTitleStyle,
                getStyle:getStyle,
                getVideosFromFeed:getVideosFromFeed
            };
            function load($this, options) {
                var videos = ( options.videos.length ) ? options.videos : getVideoLinks($this),
                    html = '',
                    href, src, titleSpan, video,
                    playButtonSrc = (!!options.assetFolder) ? options.assetFolder +'/'+ options.playButton : options.playButton ,
                    img = document.createElement('img');
                img.onload = function(){
                    setButtonMargin(this.width, this.height, $this);
                };
                img.onerror = function(){
                    setButtonMargin(0, 0, $this);
                };
                img.src = playButtonSrc+'?'+ +(new Date());

                for (var i = 0, l = videos.length; i < l; i++){
                    video = videos[i];
                    if (!video.id){continue;}
                    href = options.urlLink.replace("$id", video.id);
                    src = options.urlImg.replace("$id", video.id);
                    titleSpan = (!!video.title && options.showTitle) ? '<span class="youtube-videogallery-title">'+ video.title +'</span>' : '';

                    html+= '<li class="youtube-videogallery-item"><a title="'+video.title+'" data-youtube-id="'+ video.id +'" href="'+ href +'" class="youtube-videogallery-link" style="width:'+options.thumbWidth+'px"><img class="youtube-videogallery-play" src="'+ playButtonSrc +'" title="play" /><img class="youtube-videogallery-img" src="'+ src +'" style="width:'+options.thumbWidth+'px" />'+ titleSpan +'</a></li>';
                }
                $this.empty()
                    .append(html)
                    .addClass('youtube-videogallery-container')
                    .addClass( getStyle( options.style ) )
                    .addClass( getTitleStyle( options.titleLimit ) );

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
            options.supported = (
            /* don't show lightbox if: old untested jquery version, or the lightbox is bigger than the viewport */
                    !!$().on &&
                    ( $(window).width() > options.innerWidth || $(window).height() > options.innerHeight)
                );
            if (!!options.apiUrl){
                var $this = this,
                    apiUrl = options.apiUrl,
                    jqxhr = $.ajax({
                        url:apiUrl,
                        dataType:"jsonp",
                        beforeSend:function(){
                            if (!options.apiFallbackUrl){
                                return;
                            }
                            $this.each(function(i, el){
                                $(el).empty()
                                    .append('<li><a /></li>')
                                    .find('a')
                                    .attr('href', options.apiFallbackUrl)
                                    .text(options.apiFallbackUrl);
                            });
                        }})
                        .done(function(data) {
                            options.videos = getVideosFromFeed(data);
                            $this.each(function(i, el){
                               load($(el), options);
                            });
                        })
                        .fail(function(){
                            if ('console' in window && window.console.log){
                                window.console.log('Error getting youtube API requested by jQuery.youtubeVideoGallery: '+ apiUrl);
                            }
                        });
                return $this;
            }
            return this.each(function(i, el){
                load($(el), options);
            });
        }
    });

})(window.jQuery);