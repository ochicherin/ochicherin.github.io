function toggle(node){
   obj=node.nextSibling.nextSibling;
   visible=(obj.style.display!="none");
   if (visible) {
     obj.style.display="none";
     node.childNodes[2].src = node.childNodes[2].src.replace("/minus.","/plus.");
   } else {
      obj.style.display="block";
     node.childNodes[2].src = node.childNodes[2].src.replace("/plus.","/minus.");
   }
}
 
function allClose(node){
  var i;
  var list = node.childNodes;
  for (i=0; i<list.length; i=i+3) {
    if (list[i].childNodes[2].src.indexOf("minus.gif")!=-1) {
      allClose(list[i].nextSibling.nextSibling);
      toggle(list[i]);
    }
  }
}
