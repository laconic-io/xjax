xjax (beta)
====

xjax is a library for making jquery and object/function calls from PHP eliminating the writing of $.ajax Success functions.

### the problem
most programming is done in three steps (sometimes referred to as MVC).

1. input (user does something)
2. process (processes the input to react correctly)
3. output (show results to use).

however with ajax/(RESTful) architecture there is an extra step

1. input (ajax request)
2. process (php/ruby/python/asp backend)
3. format (on backend) to JSON/XML to send to browser
4. output (javscript) by processing JSON/XML to know how to manipulate dom+variables

you basically end up writing api's for your own system. it's annoying, time consuming, and debugging becomes a bigger hassle when you icrease the possible locations for bugs to hide.

### proposed solution... simply remove the step
xjax attempts eliminates the extra formatting middleman step by allowing you to specify front end proccess/function to call on the back end. This means no need to write an ajax success function.

this is done in
- 1 javascript file, less than 2kb (uncompressed and documented)
- 1 php file, less than 2kb

for functional/working examples with forms and more goto http://laconic.io/xjax/

otherwise some syntax examples below.

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

// call any function
$xj->win('alert', 'hello world');
// calls: window.alert('hello world');
$xj->win('test.func', 'hello', 'world');
// calls: window.test.func('hello, 'world');

// call jquery functions
$xj->jq('a')->x('css', 'style', 'blue');
// calls: $('a').css('style', 'blue');
// x function can be chained infinite times

$xj->jq('h1')->x('html', 'New Header!!');
$xj->jq('h1', 'html', 'New Header!!');
// both call: $('h1').css('New Header!!);

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
as you can tell from above there is no need to write a success function. xjax takes the data and parses it for you making the changes.

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
