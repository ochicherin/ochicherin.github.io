<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<xsl:template match="/content">
<xsl:apply-templates select="page"/>
<!--select-->
</xsl:template> 
<xsl:template match="page"> 
<option><xsl:attribute name="value"><xsl:value-of select="@src"/></xsl:attribute>
  <xsl:value-of select="text()"/>
</option>
</xsl:template> 
</xsl:stylesheet>