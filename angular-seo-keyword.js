/**!
 * AngularJS SEO keyword service
 * @author Eduardo Aranda <eduardo@adaixgroup.com>
 */

(function () {
    'use strict';

    angular.module('angular-seo-keyword', [])
        .provider('seoOption', function () {
            var option = {
                title: {
                    'default': document.title,
                    'prefix': '',
                    'postfix': ''
                }
            };

            return {
                setOptions: function (newOption) {
                    angular.extend(option.title, newOption.title);
                },
                $get: function () {
                    return option;
                }
            };
        })
        .service('seoService', ['$document', '$rootScope', '$route', 'seoOption', function ($document, $rootScope, $route, seoOption) {
            var head = $document[0].head,
                seoObject = {};

            this.setSeo = function(seoObject) {
                this.seoObject = seoObject;
                $rootScope.seoObject = this.seoObject;

                this.setTitle(seoObject.title);
                this.setH1(seoObject.h1);
                this.seoUrl(seoObject.url);
                this.setMeta(seoObject.meta);
                this.setTwitter(seoObject.twitter);
                this.setOpenGraph(seoObject.open_graph);
                this.setGooglePlus(seoObject.google_plus);
            };
                
            this.setTitle = function(newTitle) {
                var title = newTitle || seoOption.title.default,
                    titleElem = angular.element(head).children('title');

                titleElem.text([
                    (seoOption.title.prefix || ''),
                    (title || ''),
                    (seoOption.title.postfix || ''),
                ].join(''));
            };

            this.setH1 = function(h1) {
               seoObject.h1 = h1;
            };

            this.seoUrl = function(url) {
                $route.updateParams({seo: url});
            };

            this.setMeta = function(metaObjet) {
                var metas = [];

                angular.forEach(metaObjet, function(meta, key) {
                    
                    angular.forEach(angular.element(head).children('meta'), function(value) {
                        var prop = angular.element(value).prop('name');
                        if(prop == key) {
                            angular.element(value).remove();
                        }
                        
                    });                       
                    
                    metas.push([
                        '<meta name="', key, '" content="', meta, '">'
                    ].join(''));
                });

                angular.element(head).append(metas.join(''));
                
            };

            this.setTwitter = function(twitterObjet) {
                // <-- Twitter Card data -->
                var metas = [];

                angular.forEach(twitterObjet, function(meta, key) {
                    metas.push([
                        '<meta name="twitter:', key, '" content="', meta, '">'
                    ].join(''));
                });

                angular.element(head).append(metas.join(''));
            };

            this.setOpenGraph = function(openGraphObjet) {
                // <-- Open Graph data -->
                var metas = [];

                angular.forEach(openGraphObjet, function(openGraph, key) {
                    angular.forEach(openGraph, function(meta, k)  {
                        metas.push([
                            '<meta property="', key, ':', k, '" content="', meta, '">'
                        ].join(''));
                    });
                });

                angular.element(head).append(metas.join(''));                
            };

            this.setGooglePlus = function(googleObjet) {
                // <-- Schema.org markup for Google+ -->
                var metas = [];

                angular.forEach(googleObjet, function(meta, key) {
                    metas.push([
                        '<meta itemprop="', key, '" content="', meta, '">'
                    ].join(''));
                });

                angular.element(head).append(metas.join(''));  
            };

        }])
        .directive('seoH1', ['$rootScope', 'seoService', function ($rootScope, seoService) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {

                    $rootScope.$watch('seoObject.h1', function(newH1) {
                        element.text(newH1);
                    });
                }
            };
        }]);
})();
