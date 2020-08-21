<?xml version="1.0" encoding="windows-1251"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.loc.gov/MARC21/slim">
<xsl:template match="/s:collection">
<hr/>
<table>
<tr><td></td><td></td><th>�����</th><th>���������</th><!--th>���-��</th--><th>��� �������</th><th>����� �������</th><!--th>ISBN</th--><th>�����</th><th colspan="3">���������������</th></tr>
	<xsl:for-each select="s:outdata/s:record">
<tr>
<td width="10">
<xsl:choose>
 <xsl:when test="s:url">
  <a>
    <xsl:attribute name="href"><xsl:value-of select="s:url"/></xsl:attribute>
    <xsl:attribute name="target">_blank</xsl:attribute>
  �
  </a>
 </xsl:when>
</xsl:choose>
</td>
<td width="10">
<xsl:choose>
 <xsl:when test="s:preview">
  <a>
    <xsl:attribute name="href"><xsl:value-of select="s:preview"/></xsl:attribute>
    <xsl:attribute name="target">_blank</xsl:attribute>
   �
  </a>
 </xsl:when>
</xsl:choose>
</td>
		<td width="60"><xsl:value-of select="s:author" /> </td>
		<td width="150"><xsl:value-of select="s:title" /> </td>
		<!--td width="70"><xsl:value-of select="s:publisher" /> </td-->
		<td width="40"><xsl:value-of select="s:year" /> </td>
		<td width="60"><xsl:value-of select="s:publishplace" /> </td>
		<!--td width="40"><xsl:value-of select="s:ISBN" /> </td-->
		<td width="40"><xsl:value-of select="s:pages" /> </td>
		<td width="10"><xsl:value-of select="s:keeporg" />  </td>
                <td width="10"><xsl:value-of select="s:keepdept" /> </td>
                <td width="40"><xsl:value-of select="s:keepcode" /> </td>

</tr>
	</xsl:for-each>
</table>
<hr/>
������� <b><xsl:value-of select="s:debugdata/s:rows"/></b> �����. <br/>
��������� <b><xsl:value-of select="s:debugdata/s:elapsed"/></b> ���.
  </xsl:template>
</xsl:stylesheet>