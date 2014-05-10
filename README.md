xjax
====

making jquery and function calls from PHP

```javscript
$.xjax('.url.php');

```

```php
// create class
$xj = new xjax();

// $('a').css('style', 'blue');
$xj->jq('a', 'css', 'style', 'blue');

// $('h1').html('New Header').css('color', 'green');
$xj->jq('h1', 'html', 'New Header')->x('css', 'color', 'green');

// done
$xj->dump();
```
