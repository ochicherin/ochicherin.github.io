<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<xsl:template match="/xml">
<span>
<!--left>
  <h2><xsl:value-of select="@title"/></h2>
<xsl:value-of select="@desc"/>
</left-->
<ul>
<xsl:apply-templates select="item"/>
</ul>
</span>
</xsl:template> 
<xsl:template match="item"> 
<li>
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
</li>
</xsl:template> 
</xsl:stylesheet>
