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
//alert(xmlhttp.responseText);
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




