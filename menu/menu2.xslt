<?xml version="1.0" encoding="windows-1251"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/xml">
<html>
<head>
<title>Вертикальное раскрывающиеся menu</title>
<script type="text/javascript" src="menu2.js">
</script>
<!--<style type="text/css">
#menu{background:#81A192;width:200px;list-style-type:none;padding:0;margin:0}
#menu li{border-bottom:1px solid #fff;padding:3px}
#menu li a{color:#fff;font-family:verdana,arial,sans-serif;text-decoration:none}
#menu li ul{border-top:1px solid #fff;padding:0;margin:0;list-style-type:square;list-style-position:inside}
#menu li ul li{border:0;list-style-type:square;color:#fff;list-style-position:inside}
</style>-->
</head>
<body onload="allClose()">
<div id="menu">
<xsl:apply-templates select="item"/>
</div>
</body>
</html>
</xsl:template> 
<xsl:template match="item"> 
<li><a href="#" onclick="openMenu(this);return false"><xsl:value-of select="@title" /></a></li>
<ul>
  <xsl:apply-templates select="item"/>
</ul>
</xsl:template> 
</xsl:stylesheet>
