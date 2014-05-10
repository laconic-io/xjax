xjax
====

XJAX is a library for making jquery and object/function calls from PHP.

###Step 1
Use $.xjax instead of $.ajax. xjax operates the same as ajax in all manners except it forces a json data type and does an extra success function on the returned json.

```javscript
$.ajax(); to $.xjax();
```

```php
// create class
$xj = new xjax();

// $('a').css('style', 'blue');
$xj->jq('a')->x('css', 'style', 'blue');
// or (same as above, little short cut)
$xj->jq('a', 'css', 'style', 'blue');

// $('h1').html('New Header').css('color', 'green');
$xj->jq('h1', 'html', 'New Header')->x('css', 'color', 'green');

// done
$xj->done();
```
As you can tell from above there is no need to write a success function. xjax takes the data and parses it for you making the changes.

#### main starter functions
```php
the list of xjax functions are as follow
$xjax->win([func], [params[]]); starting at window
$xjax->doc([func], [params[]]); starting at document
$xjax->jq([jquery select]); or
$xjax->jq([jquery select], [func], [params[]]); 
```

#### chaining functions 
x takes the last input and chains it
```php
$xjax->x([func], [params[]]);
// example
$xjax->jq('#id', 'html', 'new header')->x('style', 'color', 'red');
```

#### context functions
if the context parameter is passed on jquery, you can start at the context (target) object.
```php
xjax->at([func], [params[]]);
xjax->jqat([jquery], [func], [params[]]);
xjax->jqat([jquery], [func], [params[]]);
```


