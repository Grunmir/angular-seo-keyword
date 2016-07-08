# angular-seo-keyword

Service SEO for angular, is responsible for updating the main html tags if you pass an object which define the SEO.

- supports [Open Graph protocol](http://ogp.me/) meta elements
- supports [schema.org protocol](http://schema.org/) meta elements
- update your url dynamically
- update your document title dynamically
- update your meta tags dynamically
- It has an attribute for the h1 tag that dynamically updates (seo-h1)


## Usage

First install the module using bower:
 
```bash
$ bower install angular-seo-keyword
```

Then add the `angular-seo-keyword` module to the dependencies of your AngularJS application module:

```javascript
angular.module('yourApp', ['angular-seo-keyword']);
```

Inject the seoOptionProvider in the config and define your meta tags

```javascript
yourApp.config(['seoOptionProvider', function(seoOptionProvider) {
	
	...
  	...

  	seoOptionProvider.setOptions({
    	title: {
    		default: 'Domain web',   /* default: document.title */
    		prefix: 'Domain', /* default: "" */
    		postfix: ' | Domain' /* default:  */
    	}
	});
	
}]);
```

Using SEO service

```javascript
app.controller('myCtrl', ['$scope', 'seoService', function($scope, seoService) { 
  
  var seo = {
    url: "hello-world",
    title: "Hello World",
    h1: "Hello world, this cloudy day?",
    meta: {
      description: "The world is crazy, but GitHub comfortable life.",
      keywords: "hello word cloud crazy",
    }
  };
  
  seoService.setSeo(seo);

}]);
```

SEO full object

```javascript
  var seo = {
    url: "hello-world",
    title: "Hello World",
    h1: "Hello world, this cloudy day?",
    meta: {
      description: "The world is crazy, but GitHub comfortable life.",
      keywords: "hello word cloud crazy",
      ...
      ...
    },
    open_graph: {
      og: {
        title: null,
        type: null,
        url: null,
        image: null,
        description: null,
        site_name: null
      },
      article: {
        published_time: null,
        modified_time: null,
        section: null,
        tag: null
      },
      fb: {
        admins: null
      }
    },
    twitter: {
      card: null,
      site: null,
      title: null,
      description: null,
      creator: null
    },
    google_plues: {
      name: null,
      description: null,
      image: null
    }
  };
```

If we want to dynamically update our labels __h1__ and use the attribute __seo-h1__

```html
  <h1 seo-h1></h1>
```

You can use the following methods to specifically update some labels individually

```javascript
app.controller('myCtrl', ['$scope', 'seoService', function($scope, seoService) {

	seoService.setSeo(seoObject);
	seoService.setTitle(titleString);
	seoService.setH1(h1String);
	seoService.seoUrl(urlString);
	seoService.setMeta(metaObjet);
	seoService.setTwitter(twitterObjet);
	seoService.setOpenGraph(openGraphObjet);
	seoService.setGooglePlus(googleObjet);
	
}]);
```
