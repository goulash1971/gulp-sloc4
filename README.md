gulp-sloc4
==========

A port of the [grunt-sloc](https://github.com/rhiokim/grunt-sloc) plugin for gulp with some minor changes.

**NOTE** Taken from [gulp-sloc4](https://github.com/pnarielwala/gulp-sloc4) and modified for **Gulp 4.00**.

## Usage

First install the `gulp-sloc4` plugin as a development dependency:

```shell
npm install --save-dev gulp-sloc4
```

Then, add it to your `gulpfile.js`:

```javascript
var sloc = require('gulp-sloc4');

gulp.task('sloc', function(){
  gulp.src(['scripts/*.js'])
    .pipe(sloc());
});
```

This would output the following:

```shell
[gulp] -------------------------------
[gulp]         physical lines : 135
[gulp]   lines of source code : 97
[gulp]          total comment : 5
[gulp]             singleline : 5
[gulp]              multiline : 0
[gulp]                  empty : 33
[gulp]
[gulp]   number of files read : 2
[gulp]            strict mode
[gulp] -------------------------------
```

## API

### sloc(options)

#### options.tolerant
Type: `Boolean`, Default: `false`

Set as false to analyze only files with a subset of popular extensions. true to analyze files with any file extension. The default is false.

If true, the SLOC will be executed on all of the files specified, regardless of file extension. With `tolerant` set to `false`, or unspecified, only supported file extensions will be analyzed.

#### options.reportType
Type: `String`, Default: `stdout`

It will generate a JSON file with the SLOC analysis results and sends it further downstream. Use with the `reportFile` option if you want to customize the file name. You may want to pipe to the `gulp.dest()` method to write it out to specified folder. Example:

```javascript
var sloc = require('gulp-sloc4');

gulp.task('sloc', function(){
  gulp.src(['lib/**/*.js'])
    .pipe(sloc({
      reportType: 'json'
    }))
    .pipe(gulp.dest('./reports/'));
});
```

Would output the following in the file `./reports/sloc.json`:

``` js
{"total":138,"source":100,"comment":5,"single":5,"block":0,"empty":33,"file":2}
```

#### options.reportFile
Type: `String`, Default: `sloc.json`

 The name of the file which would contain you'd like to output the JSON file. Use with the `json` as `reportType`. Ignored if used with the `stdout` report type. Example:

``` js
var sloc = require('gulp-sloc4');

gulp.task('sloc', function(){
  gulp.src(['./test/**/*.js'])
    .pipe(sloc({
      reportType: 'json',
      reportFile: 'testSloc.json'
    }))
    .pipe(gulp.dest('./reports/'));
});
```

Would output the sloc results in the file `./reports/testSloc.json`.

#### options.reportElements
Type: `Object`, Default:
```
{
  before: '-------------------------------',
  after: '-------------------------------',
  mode: true
}
```

Options used to customize output message. Use with the `stdout` as `reportType`. Ignored if used with the `json` report type.

- `before` - Line printed before report. Set to `false` to disable line before report.
- `after` - Line printed after report. Set to `false` to disable line after report.
- `mode` - Print strict/tolerant mode information if `true`.

#### options.metrics
Type: `Array[String]`, Default: `['total', 'source', 'comment', 'single', 'block', 'mixed', 'empty', 'file']`

Metrics that are returned in report.  

## Supported Languages and Extensions

- JavaScript - `js`
- CoffeeScript - `coffee` or `coffeescript`
- C / C++ - `c` or `cc`
- Python - `py`
- Java - `java`
- PHP - `php`

## FAQ

- I'm getting a `TypeError: Cannot read property 'toString' of null;`.

    You probably have folders in your stream and `sloc` tries to read their contents. Change this:

        gulp.src(['src/**']).pipe(sloc())

    To this:

        gulp.src(['src/**'], {nodir: true}).pipe(sloc())

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
