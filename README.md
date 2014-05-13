xjax (beta)
====

xjax is a library for making jquery and object/function calls from PHP eliminating the writing of $.ajax Success functions.


### the problem
Most Programming is done in three steps (sometimes referred to as MVC).

1. input
2. process
3. output

However with ajax there is an extra step

1. input (ajax request)
2. process (php/backend)
3. format (on backend) to JSON/XML
4. output (javscript) by processing JSON/XML to know how to manipulate dom

### proposed solution, remove format step

xjax eliminates the extra formatting middleman step by allowing you to call javascript functons, jQuery, and set javascript variables in php. This means no need to write a success function.

example syntax below and functional/working examples with forms and more http://laconic.io/xjax/

#### the javascript
```javascript
// instead of $.ajax use $.xjax
// $.xjax is identicle to $.ajax. Except it forces a json type
$.xjax({url: '/some/url',  context:document.body,  type: 'post'});
// all works exactly the same as $.ajax();
```

#### the php
```php
// create class
$xj = new xjax;

// call window function
$xj->win('alert', 'hello world');
// calls: window.alert('hello world');
$xj->win('test.func', 'hello', 'world');
// calls: window.test.func('hello, 'world');

// call jquery functions
$xj->jq('a')->x('css', 'style', 'blue');
// calls: $('a').css('style', 'blue');

// $('a').css('style', 'blue');
$xj->jq('a')->x('css', 'style', 'blue');
// or (same as above, little short cut)
$xj->jq('a', 'css', 'style', 'blue');

// call functions starting at ajax/xjax context
// $.xjax({url:'/xjax', context:[context]});
$xj->at('sampleFunc', ['value',100]);
// calls: [context].sampleFunc(['value', 100]);

// call jQuery functions starting at context
$xj->jqat('.status')->x('html', 'success!!!');
// calls: $([context]).find('.status').html('success!!!');
// usefull if you set context to the form on submitted, see below

// set variabels
$xj->set('test.value', ['first'=>1, 'second'=>2]);
// sets: window.test.value = {'first':1, 'second':2}

// still set data objects
$xj->data('key', ['large'=> ['crazy', 'object'], 'thingy'=> 'over 9000!!');
// $.xjax({url:'/xjax/page', success:function(data, text, jqXHR){
//   data.key.large[0]; // return 'crazy';
// });

// set whole json object
$xj->json = ['stuff' => 'here', etc...];

// done outputs json
$xj->done();
```

As you can tell from above there is no need to write a success function. xjax takes the data and parses it for you making the changes.

#### functions list
```php
// starting functions
xjax->win([func], [params[]]); starting at window
xjax->jq([jquery select], [func], [params[]]); 

// starting at xjax/ajax context
xjax->at([func], [params[]]);
xjax->jqat([jquery], [func], [params[]]);

// chaining function to append to any above
xjax->x([func], [params[]]);

// data
xjax->data(key, value);
xjax->json = [whole object to return];
```

