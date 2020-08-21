<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/rss">
<div>
		<hr />
	<xsl:for-each select="channel/item">
		<xsl:value-of select="pubDate" /> <br />
		<a href="{link}"><xsl:value-of select="title"/></a>
		<hr />
	</xsl:for-each>
	<xsl:value-of select="channel/copyright" />
</div>
</xsl:template>
</xsl:stylesheet>