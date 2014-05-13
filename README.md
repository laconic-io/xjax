xjax (beta)
====

XJAX is a library for making jquery and object/function calls from PHP.

Most Programming is done in three steps (refered to as MVC).

- 1. input
- 2. process
- 3. output

However with ajax there is an extra step

- 1. input (ajax request)
- 2. process (php or backend)
- 3a. output format to JSON/XML
- 3b. process JSON/XML for outputting in javascript

What xjax does is eliminates the extra formatting step (3a) and allows you to call javascript functons and set values "directly". Meaning no need for a "success" function on xjax.

#### the javascript
```javscript
// instead of ajax use xjax, works identicle
// the only difference is xjax forces dataType JSON and adds success function
$.ajax(); to $.xjax();
$.xjax({
  url: '/some/url' ,
  context: 'form' ,
  type: 'post' ,
  error: function(){
    alert('error');
  }
});
// all works exactly the same
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

#### main functions list
```php
the list of xjax functions are as follow
$xjax->win([func], [params[]]); starting at window
$xjax->doc([func], [params[]]); starting at document
$xjax->jq([jquery select]); or
$xjax->jq([jquery select], [func], [params[]]); 
```

#### chaining function 
x takes the last input and chains it
```php
$xjax->x([func], [params[]]);
```

#### context functions
if the context parameter is passed on jquery, you can start at the context (target) object.
```php
xjax->at([func], [params[]]);
xjax->jqat([jquery], [func], [params[]]);
```

#### data functions
```php
xjax->data('key', [object|var|whatever..];
xjax->json = ['set', 'whole', 'json'];
```
