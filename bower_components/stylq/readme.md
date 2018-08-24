# Stlyq
Stylq is the cool syntax HTML Preprocessor.
Stylq will allow user to make HTML file more easily.
Stlyq is the Rich Syntax file to generator HTML file in the easy way.  Stylq is the easy readable and writable.

## Command Line Usage
For NPM
```
  npm i stylq
```
For YARN
```
  yarn add stylq
```
## General Syntax

  Every Tag name should only defined in blocks.
  1. Only at the end of Tag Name the curly braces should be placed.
  2. The Order should be exactly as same as below and nested tags can be used.
```
 tagName{
   <!-- Any Content -->
 }
```
## Note  : While using Atomic or Void Tag Use either two syntax below
  Ending with Opening and Closing Curly Braces
```
  br{}

  link rel="stylesheet" type="text/css" href="dir/stylesheet.css"{}
```
  OR
  Ending without any Curly Braces
```
  br

  link rel="stylesheet" type="text/css" href="dir/stylesheet.css"
```
## Usage and Example

```
  var stylq = require('stylq');

  stylq.process('sample.stylq');

```
To Send to another location
```
  stylq.processAndSend('sample.stylq','targetFileName.html');
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
      p id="paragraph-id"{
        This is paragraph
      }
      h2 style="color: blue;" id="heading-line"{
        The Multi attributes
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
      <p id="paragraph-id">
        This is paragraph
      </p>
      <h2 style="color: blue;" id="heading-line">
        The Multi attributes
      </h2>
    </body>
  </html>
  ```

  Output on the console

  ```
  Stylq  : sample.stylq Exported to sample.html
  ```

  Comment is like mentioned below.
  Only Multiline Comment is allowed.
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
       h1{
         This is header
       }
       <!--
        The Comment
        is here.
        -->
       p{
         This is paragraph
       }
     }
   }
  ```
