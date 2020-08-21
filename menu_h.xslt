<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<xsl:template match="/xml">
<span>
<img align="absmiddle" src="img/s.gif" height="1" width="0"/>
<xsl:apply-templates select="item"/>
</span>
</xsl:template> 
<xsl:template match="item"> 
<xsl:param name="nodes" select="*"/>
<span>
<img align="absmiddle" src="img/s.gif" height="1" width="1"/>
<img align="absmiddle" onclick="toggle2(this.parentNode);return false">
 <xsl:attribute name="src">
  <xsl:choose>
   <xsl:when test="count(*)=0">img/s.gif</xsl:when>
   <xsl:otherwise>img/minus.gif</xsl:otherwise> 
  </xsl:choose>
 </xsl:attribute>
</img>
<xsl:choose>
 <xsl:when test="@icon">
  <img align="absmiddle" height="11"><xsl:attribute name="src"><xsl:value-of select="@icon"/></xsl:attribute></img>
 </xsl:when>
 <xsl:otherwise>
  <img align="absmiddle" src="img/s.gif" width="1" height="11"/>
 </xsl:otherwise>
</xsl:choose>
<xsl:choose>
 <xsl:when test="@url">
  <a><xsl:attribute name="href"><xsl:value-of select="@url"/></xsl:attribute>
  <xsl:value-of select="@title"/>
  </a>
 </xsl:when>
 <xsl:otherwise>
  <xsl:value-of select="@title"/>
 </xsl:otherwise> 
</xsl:choose>
</span>
<span>|</span>
<span><img align="absmiddle" src="img/s.gif" height="1" width="0"/><xsl:apply-templates select="item"/></span>
</xsl:template> 
</xsl:stylesheet>
