<?xml version="1.0" encoding="windows-1251"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> 
   <xsl:param name="nodes" select="''"/> 
   <xsl:key name="cat" match="category" use="generate-id(.)"/> 
   <xsl:variable name="path" select="(//catalog//category[contains($nodes, concat('[', generate-id(.), ']'))]/ancestor-or-self::category)"/> 
   <!-- ������ ��������� �������� --> 
   <xsl:template match="catalog"> 
      <xsl:apply-templates select="category"/> 
   </xsl:template> 
   <!-- ������ ��������� ��������� --> 
   <xsl:template match="category"> 
      <!-- ��������, ����������� ������ --> 
      <xsl:param name="indent"/> 
      <!-- ������� ������ --> 
      <xsl:value-of select="$indent"/> 
      <xsl:variable name="this"> 
         <xsl:choose> 
            <xsl:when test="count(.|$path)=count($path)"> 
               <xsl:value-of select="generate-id(./..)"/> 
            </xsl:when> 
            <xsl:otherwise> 
               <xsl:value-of select="generate-id(.)"/> 
            </xsl:otherwise> 
         </xsl:choose> 
      </xsl:variable> 
      <xsl:variable name="nodes"> 
         [<xsl:value-of select="$this"/>] 
         <xsl:variable name="current" select="."/> 
         <xsl:for-each select="$path"> 
            <xsl:if test="count(./ancestor-or-self::category|*|$current)!=count(./ancestor-or-self::category|*)"> 
               [<xsl:value-of select="generate-id(.)"/>] 
            </xsl:if> 
         </xsl:for-each> 
      </xsl:variable> 
      <a href="javascript:expand('{$nodes}')"> 
         <!-- ������� �������� ��������� --> 
         <xsl:value-of select="@title"/> 
      </a> 
      <br/> 
      <!-- ���� ��������� ����������� ������������ ������, �� ������������ �� ������������ --> 
      <xsl:if test="count(.|$path)=count($path)"> 
         <xsl:apply-templates select="category"> 
            <!-- ����������� ������ �� ��� ������� --> 
            <xsl:with-param name="indent" select="concat($indent,'&#xA0;&#xA0;&#xA0;')"/> 
         </xsl:apply-templates> 
      </xsl:if> 
   </xsl:template> 
</xsl:stylesheet> 
