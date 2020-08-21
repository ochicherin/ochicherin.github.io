<?xml version="1.0" encoding="windows-1251"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
     xmlns:dc="http://purl.org/dc/elements/1.1/" version="1.0">
<xsl:template match="//rss">
  <div>
    <h1><xsl:value-of select="/rss/channel/title"/></h1>
    <p><xsl:value-of select="/rss/channel/description"/></p>
    <xsl:element name="a">
      	<xsl:attribute name="href">
      		<xsl:value-of select="link"/>
      	</xsl:attribute>
      	Подробнее...
    </xsl:element>
    <xsl:for-each select="/rss/channel/item">
        <h2><xsl:value-of select="title"/></h2>
        <p>
	        <i style="float: left;"><xsl:value-of select="pubDate"/></i>
        	<b style="float: right;"><xsl:value-of select="author"/></b>
		<br/><xsl:value-of select="description"/>
	</p>
        <p>
	<xsl:element name="a">
      		<xsl:attribute name="href">
        		<xsl:value-of select="link"/>
	      	</xsl:attribute>
      		Подробнее здесь ...
	</xsl:element>
	</p>
    </xsl:for-each>
  </div>
</xsl:template>
</xsl:stylesheet>