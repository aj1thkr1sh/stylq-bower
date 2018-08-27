

exports.process = function(fileName){
  var fs = require('fs');
  var content = fs.readFileSync(fileName,'utf-8');
  var fileNEn = fileName.lastIndexOf('.');
  var saveFileName = fileName.substring(fileNEn,fileName.length);
  saveFileExtension = '.html';
  if(!saveFileName.endsWith('.stylq')){
    return;
  }
  saveFileName = fileName.substring(0,fileName.lastIndexOf('.'));
  var lines = content.split('\n');
  //console.log(lines);
  var n = lines.length;
  //console.log(lines);
  for(i=0;i<n;++i){
    lines[i] = lines[i].replace("\n","");
    lines[i] = lines[i].replace("\r","");
  }
  var oTag = 0;
  var eTag = 0;
  var tag = 0;
  var first = false;
  var startIndex = 0;
  var endIndex = 0;
  var map = new Object();
  for(var t=0;t<n;++t){
    if(lines[t].trim().startsWith('assign')){
      lines[t]="";
      t++;
      while(!lines[t].trim().includes('}')){
        var fullAssign = lines[t].trim().replace(";","");
        lines[t++]="";
        //console.log('fullAssign  : '+fullAssign);
        var fullAssign = fullAssign.split('=');
        //console.log('fullAssign  : '+fullAssign);
        var lhs = fullAssign[0];
        var rhs = fullAssign[1];
        //console.log('lhs is  : '+lhs+' rhs  : '+rhs);
        map[lhs.trim()]=rhs.trim();
      }
      lines[t]="";
      continue;
    }
    for(var i=t;i<n;++i){
      if(lines[i].includes('[[') && lines[i].includes(']]')){
          //console.log(lines[i]+' is used');
          lines[i]=assignProcess(lines[i],map);
      }
      if(lines[i].trim().startsWith("link") || lines[i].trim().startsWith("br")
          || lines[i].trim().startsWith("area") || lines[i].trim().startsWith("base")
          || lines[i].trim().startsWith("command") || lines[i].trim().startsWith("hr")
          || lines[i].trim().startsWith("embed") || lines[i].trim().startsWith("input")
          || lines[i].trim().startsWith("keygen") || lines[i].trim().startsWith("menuitem")
          || lines[i].trim().startsWith("meta") || lines[i].trim().startsWith("param")
          || lines[i].trim().startsWith("source") || lines[i].trim().startsWith("track")
          || lines[i].trim().startsWith("wbr")
        ){
        var tLines = "";
        var tFullLine = lines[i];
        tFullLine = tFullLine.replace('{','');
        tFullLine = tFullLine.replace('}','');
        var a = 0;
        var aN = tFullLine.length;
        while(tFullLine[a]===' '){
          tLines += ' ';
          a++;
        }
        tLines += '<';
        tLines += tFullLine.trim();
        lines[i] = tLines+' />';
      }
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
        if(startTagName.includes('[[') && startTagName.includes(']]')){
          //console.log('Contains  : '+startTagName);
          startTagName=assignProcess(startTagName,map);
        }
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
  var joinLines = [];
  var joinLinesN=0;
  for(var i=0;i<n;++i){
    if(lines[i]!==''){
      joinLines[joinLinesN++]=lines[i];
    }
  }
  joinLines = joinLines.join("\n");
  //console.log(joinLines);
  fs.writeFile(saveFileName+'.html','<!doctype html>\n'+joinLines,(err)=>{
    if(err) throw err;
    console.log('\nStylq  : '+fileName+' Exported to '+saveFileName+'.html\n');
  });
}

exports.processAndSend = function(fileName,targetName){
  var fs = require('fs');
  var content = fs.readFileSync(fileName,'utf-8');
  var fileNE = fileName.split('.');
  var saveFileName = fileNE[0];
  var saveFileExtension = fileNE[1];
  if(!fileName.endsWith('.stylq')){
    return;
  }
  var lines = content.split('\n');
  //console.log(lines);
  var n = lines.length;
  //console.log(lines);
  var map = new Object();
  for(i=0;i<n;++i){
    lines[i] = lines[i].replace("\n","");
    lines[i] = lines[i].replace("\r","");
  }
  var oTag = 0;
  var eTag = 0;
  var tag = 0;
  var first = false;
  var startIndex = 0;
  var endIndex = 0;
  for(var t=0;t<n;++t){
    if(lines[t].trim().startsWith('assign')){
      lines[t]="";
      t++;
      while(!lines[t].trim().includes('}')){
        var fullAssign = lines[t].trim().replace(";","");
        lines[t++]="";
        //console.log('fullAssign  : '+fullAssign);
        var fullAssign = fullAssign.split('=');
        //console.log('fullAssign  : '+fullAssign);
        var lhs = fullAssign[0];
        var rhs = fullAssign[1];
        //console.log('lhs is  : '+lhs+' rhs  : '+rhs);
        map[lhs.trim()]=rhs.trim();
      }
      lines[t]="";
      continue;
    }
    for(var i=t;i<n;++i){
      if(lines[i].includes('[[') && lines[i].includes(']]')){
          //console.log(lines[i]+' is used');
          lines[i]=assignProcess(lines[i],map);
      }
      if(lines[i].trim().startsWith("link") || lines[i].trim().startsWith("br")
          || lines[i].trim().startsWith("area") || lines[i].trim().startsWith("base")
          || lines[i].trim().startsWith("command") || lines[i].trim().startsWith("hr")
          || lines[i].trim().startsWith("embed") || lines[i].trim().startsWith("input")
          || lines[i].trim().startsWith("keygen") || lines[i].trim().startsWith("menuitem")
          || lines[i].trim().startsWith("meta") || lines[i].trim().startsWith("param")
          || lines[i].trim().startsWith("source") || lines[i].trim().startsWith("track")
          || lines[i].trim().startsWith("wbr")
        ){
        var tLines = "";
        var tFullLine = lines[i];
        tFullLine = tFullLine.replace('{','');
        tFullLine = tFullLine.replace('}','');
        var a = 0;
        var aN = tFullLine.length;
        while(tFullLine[a]===' '){
          tLines += ' ';
          a++;
        }
        tLines += '<';
        tLines += tFullLine.trim();
        lines[i] = tLines+' />';
      }
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
        if(startTagName.includes('[[') && startTagName.includes(']]')){
          //console.log('Contains  : '+startTagName);
          startTagName=assignProcess(startTagName,map);
        }
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
  var joinLines = [];
  var joinLinesN=0;
  for(var i=0;i<n;++i){
    if(lines[i]!==''){
      joinLines[joinLinesN++]=lines[i];
    }
  }
  joinLines = joinLines.join("\n");
  fs.writeFile(targetName,'<!doctype html>\n'+joinLines,(err)=>{
    if(err) throw err;
    console.log('\nStylq  : '+fileName+' Exported to '+targetName+'\n');
  });
}

function getNextLine(lines,n,index){
  if(index<n && lines[index]===''){
    lines[index]=getNextLine(lines,n,index+1);
  }
  if(index<n){
    return lines[index];
  }
}

function assignProcess(startTagName,map){
  var sentence = ''+startTagName;
  var sentencei = sentence.indexOf('[[');
  var word = "";
  var replaceWord = "";
  sentencei+=2;
  while(sentence[sentencei]!=']'){
    word+=sentence[sentencei++];
  }
  replaceWord = '[['+word+']]';
  //console.log('Word  : '+word+' Replaced Word  : '+replaceWord);
  word = map[word];
  startTagName = startTagName.replace(replaceWord,word);
  if(startTagName.includes('[[') && startTagName.includes(']]')){
    //console.log('in if '+startTagName);
    startTagName=assignProcess(startTagName,map);
  }
  return startTagName;
}
