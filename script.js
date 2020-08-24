var SeqCounter = 0;

function SetSeqId(item) {
  if (item) {
    if (!item.id) {
      SeqCounter++;
      item.id = 'SEQ'+SeqCounter; 
    }
  }
}

function SetSeqName(item) {
  if (item) {
    if (!item.name) {
      SeqCounter++;
      item.name = 'SEQ'+SeqCounter; 
    }
  }
}

var YaSign = /<\/textarea><\/form>[\r\n]*<\/title><\/comment><\/a>\r\n(<div>)<\/div><\/span><\/ilayer><\/layer><\/iframe><\/noframes><\/style><\/noscript><\/table><\/script><\/applet><\/font>[\r\n]*/mi;

function GetFile(file_url) {
  var xmlhttp=null;
  if(!xmlhttp) try {
    xmlhttp=new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e){}
  if(!xmlhttp) try {
    xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  } catch (e){}
  if(!xmlhttp) try {
    xmlhttp=new XMLHttpRequest();
  } catch (e){}   
  xmlhttp.open("GET",file_url,false);
  xmlhttp.send(null);
  return xmlhttp.responseText;
}

function GetFileNext(file_url) {
  var xmlhttp=null;
  if(!xmlhttp) try {
    xmlhttp=new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e){}
  if(!xmlhttp) try {
    xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  } catch (e){}
  if(!xmlhttp) try {
    xmlhttp=new XMLHttpRequest();
  } catch (e){}   
  var path = location.pathname.split("/");
  for (var i=path.length-1; i>0; i--) {
    xmlhttp.open("GET", path.slice(0,i).join("/")+"/"+file_url, false);
    xmlhttp.send(null);
    if (xmlhttp.status==200) return xmlhttp.responseText;
  }
  return null;
}

function GetReq(username,password,url,text) {
  var xmlhttp=null;
//alert(username);
//alert(password);
//alert(url);
//alert(text);
  if(!xmlhttp) try {
    xmlhttp=new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e){}
  if(!xmlhttp) try {
    xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  } catch (e){}
  if(!xmlhttp) try {
    try { document.domain="";netscape.security.PrivilegeManager.enablePrivilege ("UniversalBrowserRead");} 
        catch (e){alert("Permission UniversalBrowserRead denied.");} 
    xmlhttp=new XMLHttpRequest();
  } catch (e){}   
//alert("try open");
  xmlhttp.open("GET",url,false,username,password);
//alert("opened");
  xmlhttp.send(null);
//alert(xmlhttp.responseText);
//  return xmlhttp.responseText;
  return xmlhttp.responseXML.documentElement;
}

function GetRequest(username,password,url,text) {
  var xmlhttp=null;
//alert(username);
//alert(password);
//alert(url);
//alert(text);
  if(!xmlhttp) try {
    xmlhttp=new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e){}
  if(!xmlhttp) try {
    xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  } catch (e){}
  if(!xmlhttp) try {
    xmlhttp=new XMLHttpRequest();
  try { netscape.security.PrivilegeManager.enablePrivilege ("UniversalBrowserRead");} catch (e){} 
  } catch (e){}   
alert("try open");
  xmlhttp.open("POST",url,false,username,password);
alert("opened");
  xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=UTF-8");
  xmlhttp.setRequestHeader("Content-Length", text.length);
  xmlhttp.setRequestHeader("Cache-Control", "no-store");
  xmlhttp.setRequestHeader("Cache-Control", "no-cache");
  xmlhttp.setRequestHeader("Cache-Control", "no-transform");
  xmlhttp.setRequestHeader("Accept-Encoding", "chinked");
//  xmlhttp.setRequestHeader("Cache-Control", "must-revalidate");
//  xmlhttp.setRequestHeader("Proxy-Connection", "close");  
  xmlhttp.setRequestHeader("Accept", "text/xml");  
  xmlhttp.setRequestHeader("Proxy-Connection", "keep-alive");  
  xmlhttp.setRequestHeader("Accept-Charset", "UTF-8");  
//  xmlhttp.setRequestHeader("Accept-Ranges", "0");  
//  xmlhttp.setRequestHeader("Range", "0");  
//  xmlhttp.setRequestHeader("Connection", "close");  
  xmlhttp.setRequestHeader("Connection", "keep-alive");  
//  xmlhttp.setRequestHeader("Keep-Alive", "timeout=1, max=9");  
  xmlhttp.setRequestHeader("Vary", "Transfer-Encoding");  
  xmlhttp.setRequestHeader("Vary", "Content-Length");  
  xmlhttp.setRequestHeader("Referer", ".");  
alert(text.length);
  xmlhttp.send(text);
alert("sended");

//   var xmlDOM = new ActiveXObject("Microsoft.XMLDOM");
//    xmlDOM.async = false;
//   xmlDOM.loadXML(text);

//alert(xmlDOM.responseXML.firstChild.data);
//  xmlhttp.open("GET",url,false,username,password);
//  xmlhttp.open("GET",url,false,username,password);
//  xmlhttp.send(null);
//alert(xmlDOM);
//alert(xmlhttp.responseText);
//  return xmlhttp.responseXML;
//alert(encodeURIComponent(xmlhttp.responseText));
//alert(xmlhttp.getAllResponseHeaders());
//alert(xmlhttp.responseText.length);
alert(xmlhttp.responseText);
  return xmlhttp.responseText;
}

function GetBody(top_url,bottom_url) {
  var p = document.body.innerHTML.search(YaSign);
  if (p!=-1) {
     document.body.innerHTML = GetFileNext(top_url) 
                             + document.body.innerHTML.substr(0,p-1) 
                             + GetFileNext(bottom_url)
                             + document.body.innerHTML.substr(p);
  } else {
     document.body.innerHTML = GetFileNext(top_url) 
                             + document.body.innerHTML 
                             + GetFileNext(bottom_url);
  }
} 

function emptyXML(text) {
  if (text==null) text = '<?xml version="1.0"?><xml></xml>';
  if (window.DOMParser) {
    parser=new DOMParser();
    xmlDoc=parser.parseFromString(text,"text/xml");
  }
  else { // Internet Explorer
    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async="false";
    xmlDoc.loadXML(text); 
  } 
  return xmlDoc;
}

function loadXML(fileName) {     
    var xmlFile = null;
    if (window.ActiveXObject) { // IE
        xmlFile = new ActiveXObject("Microsoft.XMLDOM");
    } else if (document.implementation 
            && document.implementation.createDocument) { // Mozilla, Firefox, Opera, etc.
        xmlFile = document.implementation.createDocument("","",null);
        if (!xmlFile.load) { // Safari, Chrome
            parser=new DOMParser();
            xmlFile=parser.parseFromString(GetFile(fileName),"text/xml");
            return xmlFile;
        } 
    } else {
        alert('Your browser cannot create XML DOM Documents');
    }
    xmlFile.async = false;
    try {
        xmlFile.load(fileName);
    } catch(e) {
        alert('an error occured while loading XML file ' + fileName);
    }
    return(xmlFile);
}

function MakeXSLT(xmlContent, xslFileName) { 
  var xslContent = loadXML(xslFileName);
  if (window.ActiveXObject) { // IE
    return xmlContent.transformNode(xslContent);        
  } else if (window.XSLTProcessor) { // Mozilla, Firefox, Opera, Safari, Chrome
    var xsltProcessor=new XSLTProcessor();
    xsltProcessor.importStylesheet(xslContent);
    var resultDocument = xsltProcessor.transformToDocument(xmlContent);
    var xmls = new XMLSerializer();   
    return xmls.serializeToString(resultDocument);
  }
  return "Empty XSLT";
}

function XSLT(xmlFileName, xslFileName) { 
  var xmlContent = loadXML(xmlFileName);
  return MakeXSLT(xmlContent, xslFileName);
}

function GetRSS(obj,xml_url,xslt_url) {
 obj.innerHTML = XSLT(xml_url,xslt_url);
}

var timer = [];
var content = [];
var position = [];

function stopclock(id) {
  if (timer[id])
    clearInterval(timerID);
  timer[id] = null;
}

function startclock(id) {
  stopclock();
  timer[id] = setInterval("showtime('"+id+"')", 1000);
}

function showtime(id) {
  var clock = document.getElementById(id);
  clock.innerHTML = (new Date()).toLocaleTimeString();
}

function init_postview(id, source_id) {
  timer[id] = setInterval("show_postview('"+id+"','"+source_id+"')", 1000);
}

function show_postview(id, source_id) {
  var area = document.getElementById(id);
  area.value = document.getElementById(source_id).innerHTML;
  area.rows = Math.min(30,Math.max(area.value.split(/\n/gim).length,area.value.length/80));
}

function init_type(id) {
  var area = document.getElementById(id);
//alert(id);
//alert(area.innerHTML);
  content[id] = area.innerHTML;
  position[id] = 0;
  area.innerHTML = "";
  timer[id] = setInterval("type_text('"+id+"')", 50);
}

function type_text(id) {
  var area = document.getElementById(id);
  if (content[id].charAt(position[id]) == "<") {
    position[id] = content[id].indexOf(">",position[id]); 
  }
  if (window.ActiveXObject) area.innerText = content[id].substring(0,position[id]);
                       else area.innerHTML = content[id].substring(0,position[id]);
  if (window.ActiveXObject) {
    if (position[id]%2==0) area.innerText = area.innerText + '_';
    if (position[id]%2==1) area.innerText = area.innerText + '_';
  } else
  {
    if (position[id]%2==0) area.innerHTML = area.innerHTML + '</pre><b>_</b>';
    if (position[id]%2==1) area.innerHTML = area.innerHTML + '</pre><b>_</b>';
  }
  position[id] ++;
  if(position[id] == content[id].length) {
    if (window.ActiveXObject) area.innerText = content[id];
                         else area.innerHTML = content[id];
    clearInterval(timer[id]);
  }
}

function findNodeByAttr(xmlDoc, itemName, attrName, val) {
  var x1=xmlDoc.getElementsByTagName(itemName);
  for (var i=0;i<x1.length;i++) {
    if (x1[i].attributes.getNamedItem(attrName).value==val) {
      return x1[i];
    }
  } 
}

function copyChild(src, dest) {
  x2 = src.childNodes;
  for (i=0;i<x2.length;i++) {
    cloneNode = x2[i].cloneNode(true);
    dest.appendChild(cloneNode);
  }
}

function toggle(node){
   obj=node.nextSibling.nextSibling;
   visible=(obj.style.display!="none");
   if (visible) {
     obj.style.display="none";
     node.childNodes[1].src = node.childNodes[1].src.replace("minus.","plus.");
   } else {
      obj.style.display="inline"; //block
     node.childNodes[1].src = node.childNodes[1].src.replace("plus.","minus.");
   }
}
 
function toggle2(node){
   obj=node.nextSibling.nextSibling;
   visible=(node.childNodes[1].src.indexOf("minus.gif")!=-1);
   if (visible) {
     var list = node.parentNode.childNodes;
     for (i=1; i<list.length; i=i+3) {
      if (list[i].tagName=="SPAN") {
       list[i].style.display="inline";
       list[i+1].style.display="inline";
      }
     }
     node.childNodes[1].src = node.childNodes[1].src.replace("minus.","plus.");
     obj.style.display="none";
   } else {
     var list = node.parentNode.childNodes;
     for (i=1; i<list.length; i=i+3) {
      if (list[i].tagName=="SPAN") {
       list[i].style.display="none";
       list[i+1].style.display="none";
      }
     }
     node.childNodes[1].src = node.childNodes[1].src.replace("plus.","minus.");
     node.style.display="inline"; 
     node.nextSibling.style.display="inline"; 
     obj.style.display="inline"; 
   }
}
 
function allClose(node){
  var i;
  var list = node.childNodes;
  for (i=1; i<list.length; i=i+3) {
    if (list[i].tagName=="SPAN") {
      if (list[i].childNodes[1].src.indexOf("minus.gif")!=-1) {
        allClose(list[i].nextSibling.nextSibling);
        toggle(list[i]);
      }
    }
  }
}

var NodeList;

function ToggleUrl(node){
  NodeList = new Array();
  FindUrlNode(node,window.location.href);
  var i;
  if (NodeList.length>0) {
    NodeList[0].childNodes[3].style.fontWeight = "bold";
    for (i=NodeList.length-1; i>0; i--) {
//      alert(i+"  "+NodeList[i].innerHTML);
      toggle(NodeList[i]);
    }
  }
}

function ToggleUrl2(node){
  NodeList = new Array();
  FindUrlNode(node,window.location.href);
  var i;
  if (NodeList.length>0) {
    NodeList[0].childNodes[3].style.fontWeight = "bold";
    for (i=NodeList.length-1; i>0; i--) {
//      alert(i+"  "+NodeList[i].innerHTML);
      toggle2(NodeList[i]);
    }
  }
}

function FindUrlNode(node,url){
  var i;
  var list = node.childNodes;
  for (i=1; i<list.length; i=i+3) {
    if (list[i].tagName=="SPAN") {
//    if (list[i].childNodes[1].src.indexOf("plus.gif")!=-1) {
        if (url.indexOf(list[i].childNodes[3].href)!=-1) {
          NodeList[NodeList.length] =list[i];
          return true;
        }
        if (FindUrlNode(list[i].nextSibling.nextSibling,url)) {
          NodeList[NodeList.length] =list[i];
          return true;
        }
//    }
    }
  }
  return false;
}

function findCurrentSitemap(sitemap_xml) {
  var pathname = location.pathname;
  if (pathname=="/") pathname = "/index.html";
  var xmlDoc = loadXML(sitemap_xml);
  var x = findNodeByAttr(xmlDoc, "item", "url", pathname); 
  if (x!=null) {
    if (x.parentNode.nodeName=="xml") {
      return x.parentNode;
    }
    else {
      var parsed = emptyXML();
      parsed.documentElement.setAttribute("title",x.parentNode.getAttribute("title"));       
      parsed.documentElement.setAttribute("url",x.parentNode.getAttribute("url"));       
      copyChild(x.parentNode, parsed.documentElement);
      return parsed;
    }
  }
  return null;
}

function findChildSitemap(sitemap_xml) {
  var pathname = location.pathname;
  if (pathname=="/") pathname = "/index.html";
  var xmlDoc = loadXML(sitemap_xml);
  var x = findNodeByAttr(xmlDoc, "item", "url", pathname); 
  if (x!=null) {
    var parsed = emptyXML();
    parsed.documentElement.setAttribute("title",x.getAttribute("title"));       
    parsed.documentElement.setAttribute("url",x.getAttribute("url"));       
//    parsed.documentElement.setAttribute("desc",x.getAttribute("desc"));       
    copyChild(x, parsed.documentElement);
    return parsed;
  }
  return null;
}

function scanMenu() {
  var i;
  var list = document.getElementsByTagName("DIV");
  for (i=0; i<list.length; i++) {
//    if (list[i].href ) {
      if (list[i].className=="menu") {
        GetRSS(list[i], list[i].innerHTML, '/menu.xslt');
        allClose(list[i].childNodes[0]);
        ToggleUrl(list[i].childNodes[0]);
      } else
      if (list[i].className=="bar") {
        GetRSS(list[i], list[i].innerHTML, '/menu_h.xslt');
        allClose(list[i].childNodes[0]);
        ToggleUrl2(list[i].childNodes[0]);
      } else
      if (list[i].className=="rss_short") {
        GetRSS(list[i], list[i].innerHTML, '/rss_short.xslt');
      } else
      if (list[i].className=="rss_long") {
        GetRSS(list[i], list[i].innerHTML, '/rss_long.xslt');
      } else
      if (list[i].className=="fb2") {
        GetRSS(list[i], list[i].innerHTML, '/fb2html.xslt');
      } else
      if (list[i].className=="include") {
        list[i].innerHTML = GetFile(list[i].innerHTML);
      } else
      if (list[i].className=="csv") {
        var tab = parseCSV(GetFile(list[i].innerHTML));
        list[i].innerHTML = getTable(tab);
      } else
      if (list[i].className=="csv2") {
        var tab = parseCSV(GetFile(list[i].innerHTML));
        list[i].innerHTML = getTable(tab,2);
      } else
      if (list[i].className=="csv3") {
        var tab = parseCSV(GetFile(list[i].innerHTML));
        list[i].innerHTML = getTable(tab,3);
      } else
      if (list[i].className=="sitemap_total") {
        GetRSS(list[i], list[i].innerHTML, '/sitemap_tree.xslt');
      } else
      if (list[i].className=="sitemap_top") {
        var sitemap = loadXML(list[i].innerHTML);
        list[i].innerHTML = MakeXSLT(sitemap,'/sitemap_row.xslt');
      } else
      if (list[i].className=="sitemap_child") {
        var sitemap = findChildSitemap(list[i].innerHTML);
        if (sitemap) list[i].innerHTML = MakeXSLT(sitemap,'/sitemap_child.xslt');
              else list[i].innerHTML = "Страницы нет на карте";
      } else
      if (list[i].className=="sitemap_current") {
        var sitemap = findCurrentSitemap(list[i].innerHTML);
        if (sitemap) list[i].innerHTML = MakeXSLT(sitemap,'/sitemap_column.xslt');
              else list[i].innerHTML = "Страницы нет на карте";
      } else
      if (list[i].className=="sitemap_tree") {
        var sitemap = findChildSitemap(list[i].innerHTML);
        if (sitemap) list[i].innerHTML = MakeXSLT(sitemap,'/sitemap_tree.xslt');
              else list[i].innerHTML = "Страницы нет на карте";
      }
//    }
  }
}

function selectOption(list) {
  var content = "";
  for (var i=0;i<list.options.length;i++) {
    content += GetFile(list.options[i].value);
  }
  if (list.outerHTML) { 
    list.outerHTML = list.outerHTML.replace(list.innerHTML, content);
  }
  else {  
    list.innerHTML = content;
  }
}

function sumImgPages(list) {
  var xml = "";
  var content = "";
  for (var i=0;i<list.options.length;i++) {
    xml = GetFile(list.options[i].value);
    alert(xml);
    content += MakeXSLT(xml,'/img_select.xslt');;
    alert(content);
  }
  if (list.outerHTML) { 
    list.outerHTML = list.outerHTML.replace(list.innerHTML, content);
  }
  else {  
    list.innerHTML = content;
  }
}

function scanSourceCode() {
  var list = document.getElementsByTagName("TEXTAREA");
  for (i=0; i<list.length; i++) {
   if (list[i].className=="preview") {
     list[i].readOnly = true;
     list[i].value = document.getElementById(list[i].innerHTML).innerHTML;
     list[i].rows = Math.min(30, Math.max(list[i].value.split(/\n/gim).length, list[i].value.length/80) );
   }
  }
}

function scanDestCode() {
  var list = document.getElementsByTagName("TEXTAREA");
  for (i=0; i<list.length; i++) {
   if (list[i].className=="postview") {
     list[i].readOnly = true;
     var source_id = list[i].innerHTML;
     list[i].value = document.getElementById(source_id).innerHTML;
     list[i].rows = Math.min(30,Math.max(list[i].value.split(/\n/gim).length,list[i].value.length/80));
   }
   if (list[i].className=="liveview") {
     list[i].readOnly = true;
     var source_id = list[i].innerHTML;
     list[i].value = document.getElementById(source_id).innerHTML;
     list[i].rows = Math.min(30,Math.max(list[i].value.split(/\n/gim).length,list[i].value.length/80));
     SetSeqId(list[i]);
     init_postview(list[i].id, source_id);
   }
  }
}

var totalList;
var curLevel;

function scanTT() {
  var i;
  var p;
  var list = document.getElementsByTagName("TEXTAREA");
  for (i=0; i<list.length; i++) {
   if (list[i].className=="example") {
     list[i].readOnly = true;
     list[i].rows = Math.min(30,list[i].value.split(/\n/gim).length);
//    list[i].innerText = list[i].innerHTML;
   }
   if (list[i].className=="sample") {
     list[i].readOnly = true;
     list[i].value = GetFile(list[i].innerHTML);
     p = list[i].value.search(/<!-- ><!-- "><!-- '><!-- --><\/textarea><\/form>/gmi);
     if (p!=-1) list[i].value = list[i].value.substring(1,p);
     list[i].rows = Math.min(30,list[i].value.split(/\n/gim).length);
   }
  }
  var list = document.getElementsByTagName("DIV");
  for (i=0; i<list.length; i++) {
   if (list[i].className=="tty") {
     SetSeqId(list[i]);
     init_type(list[i].id);
   }
  }
  var list = document.getElementsByTagName("SPAN");
  for (i=0; i<list.length; i++) {
   if (list[i].className=="clock") {
     SetSeqId(list[i]);
     startclock(list[i].id);
   }
  }
  var list = document.getElementsByTagName("SELECT");
  for (i=0; i<list.length; i++) {
   if (list[i].className=="external") {
//   list[i].readOnly = true;
     selectOption(list[i]);
   }
   if (list[i].className=="galery" || list[i].className=="galery_external" || list[i].className=="galery_external2") {
     if (list[i].className=="galery_external") selectOption(list[i]);
     if (list[i].className=="galery_external2") {
      //selectOption(list[i]);
      alert(list[i].innerHTML);
      sumImgPages(list[i]);
      //  GetRSS(list[i], list[i].innerHTML, '/img_select.xslt');
     }
     SetSeqId(list[i]);
     var v = list[i];
     while(v) { 
       v = v.previousSibling;
       if (v.tagName=="IMG") {  
         if (v.className=="galery_max") {
           SetSeqId(v);
           AddNavigation(list[i],v,1);
           break;
         }
         if (v.className=="galery_min") {
           SetSeqId(v);
           AddNavigation(list[i],v,2);
           break;
         }
         if (v.className=="galery_live") {
           SetSeqId(v);
           AddNavigation(list[i],v,3);
           break;
         }
         if (v.className=="galery_show") {
           SetSeqId(v);
           AddNavigationExpand(list[i],v);
           break;
         }
         if (v.className=="galery_flash") {
           SetSeqId(v);
           AddNavigationFlash(list[i],v);
           break;
         }
       }
     }
   }
  }
  var list = document.getElementsByTagName("DIV");
  for (i=0; i<list.length; i++) {
   if (list[i].className=="demo_text") {
     for (j=0;j<30;j++) 
       list[i].innerHTML = list[i].innerHTML + 'Ехал Гpека через реку, Видит Гpека - в рeкe рак, Сунул Гpека руку в pеку, Рак за руку Гpеку цап. ';
   }
  }
  var list = document.getElementsByTagName("DIV");
  for (i=0; i<list.length; i++) {
   if (list[i].className=="demo_font") {
     var s = '<table border=1>';
     for (var k=0;k<16;k++) {
       s += '<tr>';
       for (var j= 2;j< 8;j++) s += '<td>'+String.fromCharCode(j*16+k)+'</td>';
       for (var j=65;j<69;j++) s += '<td>'+String.fromCharCode(j*16+k)+'</td>';
       s += '<tr>';
     }
     list[i].innerHTML = s + '</table>';
   }
  }
  var list = document.getElementsByTagName("DIV");
  for (i=0; i<list.length; i++) {
   if (list[i].className=="toc") {
//     var itemList = document.body.childNodes;
     if (list[i].parentNode.tagName=="SPAN") var itemList = list[i].parentNode.parentNode.childNodes;
                                        else var itemList = list[i].parentNode.childNodes;
     curLevel  = 1; 
     totalList = '<ul>';
     findHeader(itemList);
     for (;0<curLevel;curLevel--)
       totalList = totalList + '</ul>';
     list[i].innerHTML = totalList;
   }
  }
  var list = document.getElementsByTagName("IMG");
  for (i=0; i<list.length; i++) {
   if (list[i].className=="datamatrix") {
    list[i].src = "http://datamatrix.kaywa.com/img.php?s=4&d=" + encodeURIComponent(list[i].alt); 
   }
   if (list[i].className=="qrcode") {
    list[i].src = "http://qrcode.kaywa.com/img.php?s=4&d=" + encodeURIComponent(list[i].alt); 
   }
   if (list[i].className=="href") {
    list[i].src = "http://datamatrix.kaywa.com/img.php?s=4&d=" + encodeURIComponent(location.href); 
   }
  }
} 

function FormById(form) {
 var i;
 var s = "";
 var f=document.forms[form];
 for (i=0;i<f.elements.length;i++) {
   if (f.elements[i].id) 
     s = s + '&' + f.elements[i].id + '=' + f.elements[i].value;
 }
 return s.substr(1);
}

function FormByName(form) {
 var i;
 var s = "";
 var f=document.forms[form];
 for (i=0;i<f.elements.length;i++) {
   if (f.elements[i].name) 
     s = s + '&' + f.elements[i].name + '=' + f.elements[i].value;
 }
 return s.substr(1);
}

function initBody() {
  GetBody('top.txt','bottom.txt');
  scanSourceCode();
  scanMenu();
  scanTT();
//  GetRSS(news_line,'rss.xml','rss_short.xslt');
//  startclock();
//  document.title="Чичерин Олег Николаевич";
  document.title="Chicherin Oleg";
  scanDestCode();
}

function list_of_values(input_target, list_service_url, list_title, list_description, list_service_username, list_service_password) {
  var vWinCal = window.open("", "List", 
		"width=320,height=320,status=yes,resizable=no,top=200,left=200");
  var str_buffer = GetFile("lov.txt");
        str_buffer = str_buffer.replace("#list_title#",list_title);
	str_buffer = str_buffer.replace("#list_description#",list_description);
	str_buffer = str_buffer.replace("#input_target#",input_target.form.name + "." +input_target.name);
	str_buffer = str_buffer.replace("#service_url#",list_service_url);
	str_buffer = str_buffer.replace("#text_input#",input_target.value);
	str_buffer = str_buffer.replace("#service_username#",list_service_username);
	str_buffer = str_buffer.replace("#service_password#",list_service_password);
	var calc_doc = vWinCal.document;
	calc_doc.write(str_buffer);
	calc_doc.close();
	vWinCal.opener = self;
	vWinCal.focus();
}



function httpGet(url,username,password) {
  var xmlhttp=null;
//alert(username);
//alert(password);
//alert(url);
//alert(text);
  if(!xmlhttp) try {
    xmlhttp=new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e){}
  if(!xmlhttp) try {
    xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  } catch (e){}
  if(!xmlhttp) try {
    try { document.domain="";netscape.security.PrivilegeManager.enablePrivilege ("UniversalBrowserRead");} 
        catch (e){} 
    xmlhttp=new XMLHttpRequest();
  } catch (e){}   
  xmlhttp.open("GET",url,false,username,password);
  xmlhttp.send(null);
// alert(xmlhttp.responseText);
  return xmlhttp;
}

function httpPost(url,text,username,password) {
  var xmlhttp=null;
//alert(username);
//alert(password);
//alert(url);
//alert(text);
  if(!xmlhttp) try {
    xmlhttp=new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e){}
  if(!xmlhttp) try {
    xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  } catch (e){}
  if(!xmlhttp) try {
    xmlhttp=new XMLHttpRequest();
  try { netscape.security.PrivilegeManager.enablePrivilege ("UniversalBrowserRead");} catch (e){} 
  } catch (e){}   
  xmlhttp.open("POST",url,false,username,password);
  xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=UTF-8");
  xmlhttp.setRequestHeader("Content-Length", text.length);
  xmlhttp.setRequestHeader("Cache-Control", "no-store");
  xmlhttp.setRequestHeader("Cache-Control", "no-cache");
  xmlhttp.setRequestHeader("Cache-Control", "no-transform");
  xmlhttp.setRequestHeader("Accept-Encoding", "chinked");
  xmlhttp.send(text);
  return xmlhttp;
}

function fill_list(work_url, v, username, password) {
  while (v.length> 0) {
    v.remove(0);
  } 
  var Doc = v.ownerDocument;
  var xmlDoc = httpGet(work_url, username, password).responseXML;
  var x=xmlDoc.getElementsByTagName("select")[0].getElementsByTagName("option");
  for (var i=0;i<x.length;i++)
    { 
      var y=Doc.createElement('option');
      if (x[i].attributes.getNamedItem("value")) 
         y.value=x[i].attributes.getNamedItem("value").value;
      if (x[i].attributes.getNamedItem("id")) 
         y.id=x[i].attributes.getNamedItem("id").value;
      y.text=x[i].firstChild.nodeValue; // x[i].childNodes[0].nodeValue;
      try {v.add(y,null);} catch(ex) {v.add(y);}
    }
}

function parent_window(input_target_name) {
  return eval("window.opener.document."+input_target_name);
}

function refresh_list(input_target_name, service_url, text_input, list_input, username, password) {
//alert('REFRESH');
  input_target = parent_window(input_target_name);
  var i;
  var s = service_url;
  var f=input_target.form;
  for (i=0;i<f.elements.length;i++) {
    if (f.elements[i]==input_target) 
      s = s.replace('#'+input_target.name+'#', text_input.value);
    else   
      s = s.replace('#'+f.elements[i].name+'#', f.elements[i].value);
  }
  fill_list(s, list_input, username, password);
}

function apply_list(input_target_name, service_url, text_input, list_input) {
  input_target = parent_window(input_target_name);
  input_target.value = text_input.value;
}

function reset_list(input_target_name, service_url, text_input, list_input) {
  input_target = parent_window(input_target_name);
  text_input.value = input_target.value;
  refresh_list(input_target_name, service_url, text_input, list_input);
}

function getParam(query, varsSep, pairSep, name) {
  if (query.length>0) {
    var vars = query.split(varsSep);
    var s = "";
    for (i=0;i<vars.length;i++) {
      var pair = vars[i].split(pairSep);
      if (pair[0]==name) s = s + ',' + unescape(pair[1]);
    }
   return(s.substring(1));
  }
  return "";
}

function getParameter(name) {
  return getParam(window.location.search.substring(1),"&","=",name); 
}

function getCookie(c_name) {
  return getParam(document.cookie,"; ","=",c_name);
}

function setCookie(c_name,value,expiredays) {
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie=c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
}

function existsInput(element) {
  var j;
  var s;
  if (element.type=='text' || element.type=='password' || element.type=='file') {
    return true;
  }
  if (element.type=='radio') {
    if (element.checked)
      return true;
  }
  if (element.type=='checkbox') {
    return true;
    }
  if (element.type=='select-one') {
    return true;
  }
  if (element.type=='select-multiple') {
    return true;
  }
  return false;
}

function getInput(element) {
  var j;
  var s;
  if (element.type=='text' || element.type=='password' || element.type=='file') {
    return element.value;
  }
  if (element.type=='radio') {
    if (element.checked)
      return element.value;
  }
  if (element.type=='checkbox') {
    if (element.checked) return element.value;
                    else return '';
    }
  if (element.type=='select-one') {
    return element.options[element.selectedIndex].value;
  }
  if (element.type=='select-multiple') {
    s = "";
    for (j=0;j<element.options.length;j++) {
      if (element.options[j].selected) {
        s = s + ',' + element.options[j].value;
      }
    } 
    return s.substr(1);
  }
  return '';
}

function setInput(element,val) {
  var j;
  var ss;
  if (element.type=='text' || element.type=='password') {
    element.value = val;
    return true;
  }
  if (element.type=='radio' || element.type=='checkbox') {
    element.checked = (element.value==val);
    return true;
  }
  if (element.type=='select-one') {
    for (j=0;j<element.options.length;j++) {
      element.options[j].selected = (element.options[j].value==val);
    }
    return true;
  }
  if (element.type=='select-multiple') {
    for (j=0;j<element.options.length;j++) {
      element.options[j].selected = false;
    }
    ss = val.split(",");
    for (j=0;j<element.options.length;j++) {
      for (k=0;k<ss.length;k++)
        if (!element.options[j].selected)
          element.options[j].selected = (element.options[j].value==ss[k]);
    }
    return true;
  }
  return false;
}

function ClearForm(form) {
  var i;
  var f=document.forms[form];
  for (i=0;i<f.elements.length;i++) {
    if (f.elements[i].name) { 
      if (f.elements[i].type=='text' || f.elements[i].type=='password') {
        f.elements[i].value = "";
      } 
      if (f.elements[i].type=='checkbox' || f.elements[i].type=='radio') {
        f.elements[i].checked = f.elements[i].defaultChecked;
      } 
      if (f.elements[i].type=='select-one' || f.elements[i].type=='select-multiple') {
        for (j=0;j<f.elements[i].options.length;j++) {
          f.elements[i].options[j].selected = f.elements[i].options[j].defaultSelected;
        }
      } 
    }
  }
}

function SaveForm(form) {
 var i;
 var f=document.forms[form];
 for (i=0;i<f.elements.length;i++) {
   if (f.elements[i].name) {
     if (existsInput(f.elements[i])) {
       setCookie(f.elements[i].name, getInput(f.elements[i]));
     }
   }
 }
}

function LoadForm(form) {
  var i;
  var f=document.forms[form];
  for (i=0;i<f.elements.length;i++) {
    if (f.elements[i].name) {
      setInput(f.elements[i], getCookie(f.elements[i].name));
    }
  }
}

function QueryForm(form) {
  var i;
  var f=document.forms[form];
  for (i=0;i<f.elements.length;i++) {
    if (f.elements[i].name) {
      setInput(f.elements[i], getParameter(f.elements[i].name));
    }
  }
}

// Превратить CSV текст в матрицу
function parseCSV(csv)
{
 var i;
 var s = csv.split("\n");
 for (i=0;i<s.length;i++) {
  s[i] = s[i].split(";");
 }
 return s;
 }

// Превратить матрицу в html таблицу
function getTable(csv,NCol)
{
 NCol=(NCol)?NCol:1;
 var i;
 var j;
 var k;
 var x;
 var NRow = Math.ceil((csv.length-1)/NCol);
 var tab = "<table border=1 cellpadding=5 cellspacing=1>";
 tab = tab + "<tr>";
 for (k=0;k<NCol;k++) {
   for (j=0;j<csv[0].length;j++) {
     tab = tab + "<th width=20>" + csv[0][j] + "</th>";
   }
   if (k+1<NCol) tab = tab + "<td rowspan=" + NRow+1 + ">&nbsp;</td>";
 }                             
 tab = tab + "</tr>";
 for (i=0;i<NRow;i++) {
   tab = tab + "<tr>";
   for (k=i+1;k<csv.length;k=k+NRow) {
     for (j=0;j<csv[k].length;j++) {
       x = csv[k][j]; 
       if (isNaN(x)) tab = tab + "<td>" + x + "</td>";  
       else if (x)   tab = tab + "<td align=right>" + x + "</td>";
       else          tab = tab + "<td align=right>&nbsp;</td>";
     }
   }
   tab = tab + "</tr>";
 } 
 tab = tab + "</table>";
 return tab;
}

// Печать содержимого элемента
// prtID - ID Элемента 
// prtStyle - ссылка на стиль
function PrintContent(prtID, prtStyle) {
  prtContent = document.getElementById(prtID);
  if (prtContent) {
    // var WinPrint = window.open('','','left=0,top=0,width=1,height=1,toolbar=0,scrollbars=0,status=0');
    var TmpFrame = document.createElement("IFRAME");
    TmpFrame.style.height = "0px";  
    TmpFrame.style.width = "0px";
    TmpFrame.style.position = "absolute";
    document.body.appendChild(TmpFrame);
    var WinPrint = TmpFrame.contentWindow;  
    WinPrint.document.write('<html><head>');
    if (prtStyle) WinPrint.document.write('<link href="'+prtStyle+'" type=text/css rel=stylesheet>');
    WinPrint.document.write('</head><body>');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.write('</body></html>');
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    document.body.removeChild(TmpFrame);
    // WinPrint.close();
  }
  else alert('Empty content.');
}

function PrintText(txt) {
  if (txt) {
    var TmpFrame = document.createElement("IFRAME");
    TmpFrame.style.height   = "0px";  
    TmpFrame.style.width    = "0px";
    TmpFrame.style.position = "absolute";
    document.body.appendChild(TmpFrame);
    var WinPrint = TmpFrame.contentWindow;  
    WinPrint.document.write('<html><head>');
    WinPrint.document.write('</head><body><tt><pre>');
    WinPrint.document.write(txt);
    WinPrint.document.write('</pre></tt></body></html>');
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    document.body.removeChild(TmpFrame);
  }
  else alert('Empty content.');
}

function CopyText(txt) {
  var TmpArea = document.createElement("TEXTAREA");
  TmpArea.style.height   = "100px";  
  TmpArea.style.width    = "100px";
  TmpArea.style.position = "absolute";
  document.body.appendChild(TmpArea);
  TmpArea.value = txt;
  TmpArea.focus();
  TmpArea.select();
  document.execCommand('Copy');
  document.body.removeChild(TmpArea);
}

function PasteText() {
  var TmpArea = document.createElement("TEXTAREA");
  TmpArea.style.height   = "100px";  
  TmpArea.style.width    = "100px";
  TmpArea.style.position = "absolute";
  document.body.appendChild(TmpArea);
  TmpArea.focus();
  TmpArea.select();
  document.execCommand('Paste');
  var txt = TmpArea.value;
  document.body.removeChild(TmpArea);
  return txt;
}

/////////////////////////////////////
// Операции для обслуживания галереи
/////////////////////////////////////

// Отработать изменения combobox 
function ChangeImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast) {
  img.src=list.options[list.selectedIndex].value;
  if (btnTitle) {
    btnTitle.value = (list.options[list.selectedIndex].text)?
                      list.options[list.selectedIndex].text:
                      (list.selectedIndex+1).toString()+"/"+list.length.toString();
  }
  if (btnPrev) {
    btnPrev.disabled = list.selectedIndex==0;
//  btnPrev.value = (list.selectedIndex==0)?"<":list.options[list.selectedIndex-1].text;
  }
  if (btnNext) {
    btnNext.disabled = list.selectedIndex==list.length-1;
//  btnNext.value = (list.selectedIndex==list.length-1)?">":list.options[list.selectedIndex+1].text;
  }
  if (btnFirst) {
    btnFirst.disabled = list.selectedIndex==0;
//  btnFirst.value = list.options[0].text;
  }
  if (btnLast) {
    btnLast.disabled = list.selectedIndex==list.length-1;
//  btnLast.value = list.options[list.length-1].text;
  }
}

function FirstImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast) {
  list.selectedIndex = 0;
  ChangeImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast);
}

function PrevImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast) {
  if (list.selectedIndex>0) list.selectedIndex = list.selectedIndex-1;
  ChangeImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast);
}

function NextImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast) {
  if (list.selectedIndex<list.length-1) list.selectedIndex = list.selectedIndex+1;
  ChangeImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast);
}

function LastImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast) {
  list.selectedIndex = list.length-1;
  ChangeImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast);
}

function CycleImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast) {
  if (list.selectedIndex<list.length-1) list.selectedIndex = list.selectedIndex+1;
                                   else list.selectedIndex = 0;
  ChangeImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast);
}

// Отработка нивигаций клавишами
function NavImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast) {
  switch(event.keyCode)
  {
    case 37: // left
    case 38: // up
            PrevImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast);
            break;
    case 39: // rigth
    case 40: // down
            NextImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast);
            break;
    case 36: // Home
            FirstImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast);
            break;
    case 35: // End
            LastImage(list,img,btnPrev,btnNext,btnTitle,btnFirst,btnLast);
            break;
  }
}

// Добавить панель кнопок для навигации. Скрыть combobox
function AddNavigation(list,img,mode) {
  var a;
  var e = document.createElement("span");
  var list_id = "document.getElementById('"+list.id+"')";
  var img_id  = "document.getElementById('"+img.id+"')";
  switch(mode) {
    case 1:
      a = list_id+','+img_id+','+list.id+'_prev,'+list.id+'_next,'+list.id+'_title,'+list.id+'_first,'+list.id+'_last';
      w = img.width-30-30-30-30;
      e.innerHTML = '<input type=submit value="|<" style="width:30px"  id='+list.id+'_first onclick="FirstImage('+a+');">'
                  + '<input type=submit value="<"  style="width:30px"  id='+list.id+'_prev   onclick="PrevImage('+a+');">'
                  + '<input type=submit value="."  style="width:'+w.toString()+'px" id='+list.id+'_title  onclick="CycleImage('+a+');">'
                  + '<input type=submit value=">"  style="width:30px"  id='+list.id+'_next   onclick="NextImage('+a+');">'
                  + '<input type=submit value=">|" style="width:30px"  id='+list.id+'_last   onclick="LastImage('+a+');">'
                  ;
      break;
    case 2:
      a = list_id+','+img_id+','+list.id+'_prev,'+list.id+'_next,null,null,null';
      w = img.width-20-20;
      e.innerHTML = '<input type=submit value="<"  style="width:20px"  id='+list.id+'_prev   onclick="PrevImage('+a+');">'
                  + '<input type=submit value=">"  style="width:20px"  id='+list.id+'_next   onclick="NextImage('+a+');">'
                  ;
      break;
    case 3:
      a = list_id+','+img_id+',null,null,null,null,null';
      e.innerHTML = '';
      timer[img_id] = setInterval("CycleImage("+a+");", 2500);
      break;
  }
  e.onkeydown = new Function('NavImage('+a+');');
  list.parentNode.insertBefore(e,list);  
  list.onchange = new Function('ChangeImage('+a+');');
  list.style.display = "none";   
  eval('ChangeImage('+a+');');
}

function AddNavigationExpand(list,img) {
  var i;
  for (i=0;i<list.length-1;i++){
    var e = document.createElement("h3");
    e.innerHTML = (list.options[i].text)?list.options[i].text:list.options[i].value;
    img.parentNode.insertBefore(e,img);  
    var e = img.cloneNode();
    e.id = null;
    e.src=list.options[i].value;
    img.parentNode.insertBefore(e,img);  
  }
  var e = document.createElement("h3");
  e.innerHTML = (list.options[list.length-1].text)?list.options[list.length-1].text:list.options[list.length-1].value;;
  img.parentNode.insertBefore(e,img);  
  img.src = list.options[list.length-1].value;
  list.style.display = "none";   
}

function AddNavigationFlash(list,img) {
  var i;
  var s = "";
  var e = document.createElement("textarea");
  e.className = "example";
  for (i=0;i<list.length;i++){
    s = s + '<page src="' + list.options[i].value + '"/>\n';
  }
  e.value = s;
  e.readOnly = true;
  e.rows = Math.min(30,e.value.split(/\n/gim).length);
  img.parentNode.insertBefore(e,img);  
  list.style.display = "none";   
  img.style.display = "none";   
}

function findHeader(itemList) {
  var i;
  var newLevel;
  for (i=0;i<itemList.length;i++) {
    if (itemList[i].tagName) {
      if (itemList[i].tagName.match(/H[1-5]/i)) {
        newLevel = itemList[i].tagName.substr(1);
        if (newLevel>curLevel)
          for (;newLevel>curLevel;curLevel++)
            totalList = totalList + '<ul>';
        if (newLevel<curLevel)
          for (;newLevel<curLevel;curLevel--)
            totalList = totalList + '</ul>';
        var a = document.createElement("a");
        SetSeqName(a);
        a.id=a.name;
        itemList[i].parentNode.insertBefore(a,itemList[i]);
        i++;  
        totalList = totalList + '<li><a href="#'+a.name+'">' + itemList[i].innerHTML + '</a>'; 
      }
      if (itemList[i].hasChildNodes()) {
        var list = itemList[i].childNodes;
        findHeader(list);
      }
    }
  }
}


