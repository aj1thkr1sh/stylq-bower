# Stlyq
Stylq is the cool syntaxed HTML Preprocessor.
Stylq will allow user to make HTML file more easily.
Stlyq is the Rich Syntaxed file to generator HTML file in the easy way.  Stylq is the easy readable and writable.

## Command Line Usage

```
  npm i stylq
```

## Usage and Example

```
  var stylq = require('stylq');

  stylq.process('sample.stylq');

```
  Here is the sample file that is given as input.
```
 //sample.stylq

  html{
    head{
      title{
        The Title of the Page
      }
    }
    body{
      h1{
        This is header
      }
      p{
        This is paragraph
      }
    }
  }
  ```

  Here is the output of the file.

  ```
  //sample.html
<!doctype html>
<html>
  <head>
    <title>
      The Title of the Page
    </title>
  </head>
  <body>
    <h1>
      This is header
    </h1>
    <p>
      This is paragraph
    </p>
  </body>
</html>
  ```

  Ouput on the console

  ```
  Stylq  : sample.stylq Exported to sample.html
  ```

  Comment is as same as HTML Comment.
  Example
  ```
  //sample.stylq

   html{
     head{
       title{
         The Title of the Page
       }
     }
     body{
       <!-- The Heading -->
       h1{
         This is header
       }
       <!--
        A long Comment
        is here.
        -->
       p{
         This is paragraph
       }
     }
   }
  ```
