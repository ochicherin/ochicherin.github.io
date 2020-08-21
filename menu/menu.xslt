<?xml version="1.0" encoding="windows-1251"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl"> 
<xsl:template>
<xsl:apply-templates match="/xml"/>
</xsl:template>
<xsl:template match="/xml">
<xsl:apply-templates select="item"/>
</xsl:template> 
<xsl:template match="item"> 
<span>
<img align="absmiddle" src="s.gif" height="1">
 <xsl:attribute name="width">
  <xsl:eval>(depth(this)-2)*24</xsl:eval>
 </xsl:attribute>
</img>
<img align="absmiddle" onclick="toggle(this.parentNode);return false">
 <xsl:attribute name="src">
  <xsl:eval>
   this.firstChild == null ? this.nextSibling!=null ? "nothing.gif" : "last.gif" : "minus.gif"
  </xsl:eval>
 </xsl:attribute>
</img>
<xsl:choose>
 <xsl:when test=".[@icon]">
  <img align="absmiddle" height="11"><xsl:attribute name="src"><xsl:value-of select="@icon"/></xsl:attribute></img>
 </xsl:when>
</xsl:choose>
<xsl:choose>
 <xsl:when test=".[@url]">
  <a><xsl:attribute name="href"><xsl:value-of select="@url"/></xsl:attribute>
  <xsl:value-of select="@title"/>
  </a>
 </xsl:when>
 <xsl:otherwise>
  <xsl:value-of select="@title"/>
 </xsl:otherwise> 
</xsl:choose>
</span>
<BR/>
<span>
<xsl:apply-templates select="item"/>
</span>
</xsl:template> 
</xsl:stylesheet>
