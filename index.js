

exports.process = function(fileName){
  var fs = require('fs');
  var content = fs.readFileSync(fileName,'utf-8');
  var fileNE = fileName.split('.');
  var saveFileName = fileNE[0];
  var saveFileExtension = fileNE[1];
  if(saveFileExtension !== 'stylq'){
    return;
  }
  var lines = content.split('\r');
  var n = lines.length;
  for(i=0;i<n;++i){
    lines[i] = lines[i].replace("\n","");
  }
  var oTag = 0;
  var eTag = 0;
  var tag = 0;
  var first = false;
  var startIndex = 0;
  var endIndex = 0;
  for(var t=0;t<n;++t){
    for(var i=t;i<n;++i){
      if(lines[i].endsWith('{')){
        if(first === false){
          startIndex = i;
          first = true;
          //console.log("In the Open tag "+lines[i]);
        }
        oTag++;
      }else if(lines[i].includes('}')){
        eTag++;
        endIndex = i;
      }
      if(oTag!=0 && eTag!=0 && oTag === eTag){
        //console.log("\n"+oTag+" "+eTag)
        first = false;
        // console.log("\n Start Index "+startIndex+" End Index "+endIndex);
        // console.log("\nStart Tag is "+lines[startIndex]);
        // console.log("\nEnd Tag   is "+lines[endIndex]);
        var tagName = lines[startIndex].replace("{","");
        var j=0;
        var tagNameList = tagName.trim().split(' ');
        var headTagName = tagNameList[0];
        var startTagName="";
        while(tagName[j]===' '){
          startTagName+=" ";
          j++;
        }
        //startTagName+=" ";
        startTagName+="<"+tagName.trim()+">";
        var endTagName="";
        var j=0;
        var endTagString = tagName;
        while(tagName[j]===' '){
          endTagName+=" ";
          j++;
        }
        //console.log(headTagName);
        endTagName+="</"+headTagName.trim()+">";
        lines[startIndex]=startTagName;

        lines[endIndex]=endTagName;
        //console.log(startTagName+" "+endTagName);
        oTag=eTag=0;
      }
    }
  }
  lines = lines.join("\n");
  for(var i=0;i<n;++i){
    //console.log(lines[i]);
    //console.log(lines);
  }
  fs.writeFile(saveFileName+'.html','<!doctype html>\n'+lines,(err)=>{
    if(err) throw err;
    console.log('\nStylq  : '+fileName+' Exported to '+saveFileName+'.html');
  });
}
