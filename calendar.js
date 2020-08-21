function show_list(str_target) {
 var str_buffer = new String (
	"<html>\n"+
	"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=windows-1251\">\n"+
	"<head>\n"+
	"<title>Выбор Списка</title>\n"+
       "<LINK REL=StyleSheet TYPE=text/css HREF=index_files/style.css>\n"+
	"</head>\n"+
      "<body>\n"+
	"html\n"+
        "<form name=list_form ONSUBMIT=\"javascript:window.opener.document."+str_target.form.name+"."+str_target.name+".value=list_form.list_text.value;self.close();\">\n"+
//        "<INPUT TYPE=\"TEXT\" NAME=\"list_text\" VALUE=\""+eval(str_target+".value")+"\"><br>\n"+ 
        "<INPUT TYPE=\"TEXT\" NAME=\"list_text\" VALUE=\""+str_target.value+"\"><br>\n"+ 
        "<SELECT size=5 name=\"List_list\" onChange=\"list_text.value=this.options[this.selectedIndex].text\">\n"+
        "<OPTION VALUE=\"158\">Газпром</option>\n"+
        "<OPTION VALUE=\"34\">Газпром КИП</option>\n"+
        "<OPTION VALUE=\"495\">Гидропресс</option>\n"+
        "</SELECT><br>\n"+
        "<INPUT TYPE=\"SUBMIT\" VALUE=\"Изменить\">\n"+
        "<INPUT TYPE=\"RESET\" VALUE=\"Сбросить\"><br> \n"+
        "</form>\n"+ 
        "</body>\n"+
        "</html>");

  var vWinCal = window.open("", "List", 
		"width=320,height=200,status=no,resizable=no,top=200,left=200");
	vWinCal.opener = self;
	vWinCal.focus();
	var calc_doc = vWinCal.document;
	calc_doc.write(str_buffer);
	calc_doc.close();

}

function show_calendar(str_target, str_date, str_type) {
	var arr_months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
		"Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
	var week_days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
	var n_weekstart = 1; 

	if (str_date != null && str_date != "") {
		if (str2dt2(str_date, str_type) == false) {
		 	alert("Неверный формат даты"+(str_type == 1 ? "/времени" : "")+": '"+str_date+"'");
			return;
		}
	}
	var dt_date = (str_date == null || str_date =="" ?  new Date() : str2dt2(str_date, str_type));
	var dt_prev_month = new Date(dt_date);
	dt_prev_month.setMonth(dt_date.getMonth()-1);
	if (dt_date.getMonth()%12 != (dt_prev_month.getMonth()+1)%12) {
		dt_prev_month.setMonth(dt_date.getMonth());
		dt_prev_month.setDate(0);
	}
	var dt_next_month = new Date(dt_date);
	dt_next_month.setMonth(dt_date.getMonth()+1);
	if ((dt_date.getMonth() + 1)%12 != dt_next_month.getMonth()%12)
		dt_next_month.setDate(0);
	
	var dt_firstday = new Date(dt_date);
	dt_firstday.setDate(1);
	dt_firstday.setDate(1-(7+dt_firstday.getDay()-n_weekstart)%7);
	var dt_lastday = new Date(dt_next_month);
	dt_lastday.setDate(0);
	
	var str_buffer = new String (
		"<html>\n"+
		"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=windows-1251\">\n"+
		"<head>\n"+
		"	<title>Выбор даты</title>\n"+
        "<LINK REL=StyleSheet TYPE=text/css HREF=/adm/css/css.css>\n"+
		"</head>\n"+
        "<body bgcolor=\"#fafafa\" text=\"#000000\" alink=\"#660000\" link=\"#000000\" vlink=\"#000000\" marginwidth=\"10\" marginheight=\"10\" topmargin=\"10\" bottommargin=\"10\" leftmargin=\"10\" rightmargin=\"10\">\n"+
		"<table align=center cellspacing=\"0\" cellpadding=\"1\" border=\"0\" width=200>\n"+
		"<tr bgcolor=\"#c3dbd3\">\n<td align=center><a title=\"Предыдущий месяц\" style=\"text-decoration: none; color:#000000; font-size:9pt; font-family: arial\" href=\"javascript:window.opener.show_calendar('"+
		str_target+"', '"+ dt2dtstr2(dt_prev_month)+
		(str_type == 1 ? " '+document.TimeForm.hours.options[document.TimeForm.hours.selectedIndex].value+':'+document.TimeForm.minutes.options[document.TimeForm.minutes.selectedIndex].value, 1" : "'")+
		");\">"+
		"<b>&lt;</b></a></td>\n"+
		"<td colspan=\"5\" align=center ><font style=\"color:#000000; font-size:9pt; font-family: arial\">"
		+arr_months[dt_date.getMonth()]+" "+dt_date.getFullYear()+"</font></td>\n"+
		"<td align=\"center\" ><a title=\"Следующий месяц\" style=\"text-decoration: none; color:#000000; font-size:9pt; font-family: arial\" href=\"javascript:window.opener.show_calendar('"+
		str_target+"', '"+dt2dtstr2(dt_next_month)+
		(str_type == 1 ? " '+document.TimeForm.hours.options[document.TimeForm.hours.selectedIndex].value+':'+document.TimeForm.minutes.options[document.TimeForm.minutes.selectedIndex].value, 1" : "'")+
		");\">"+
		"<b>&gt;</b></a></td>\n</tr>\n"
	);

	var dt_current_day = new Date(dt_firstday);
	str_buffer += "<tr bgcolor=\"#f5f5f5\">\n";
	for (var n=0; n<7; n++)
		str_buffer += "<td align=center><font style=\"color:#b22222; font-size:9pt; font-family: arial\">"+
		week_days[(n_weekstart+n)%7]+"</font></td>\n";
	str_buffer += "</tr>\n";
	while (dt_current_day.getMonth() == dt_date.getMonth() ||
		dt_current_day.getMonth() == dt_firstday.getMonth()) {
		str_buffer += "<tr>\n";
		for (var n_current_wday=0; n_current_wday<7; n_current_wday++) {
				if (dt_current_day.getDate() == dt_date.getDate() &&
					dt_current_day.getMonth() == dt_date.getMonth())
					
					str_buffer += "	<td  align=\"center\" bgcolor=\"#c3dbd3\">";
				else if (dt_current_day.getDay() == 0 || dt_current_day.getDay() == 6)
					
					str_buffer += "	<td align=\"center\">";
				else
					
					str_buffer += "	<td align=\"center\">";

				if (dt_current_day.getMonth() == dt_date.getMonth())
					
					str_buffer += "<a style=\"color:#330066; font-size:9pt; font-family: arial; text-decoration: none;\" href=\"javascript:window.opener."+str_target+
					".value='"+dt2dtstr2(dt_current_day)+
					(str_type == 1 ? " '+document.TimeForm.hours.options[document.TimeForm.hours.selectedIndex].value+':'+document.TimeForm.minutes.options[document.TimeForm.minutes.selectedIndex].value" : "'")+
					"; self.close();\">"+
					"";
				else 
					
					str_buffer += "<a style=\"color:#ababab; font-size:9pt; font-family: arial; text-decoration: none;\" href=\"javascript:window.opener."+str_target+
					".value='"+dt2dtstr2(dt_current_day)+
					(str_type == 1 ? " '+document.TimeForm.hours.options[document.TimeForm.hours.selectedIndex].value+':'+document.TimeForm.minutes.options[document.TimeForm.minutes.selectedIndex].value" : "'")+
					"; self.close();\">"+
					"";
				str_buffer += dt_current_day.getDate()+"</a></td>\n";
				dt_current_day.setDate(dt_current_day.getDate()+1);
		}
		
		str_buffer += "</tr>\n";
	}

	// форма "часы/минуты"
	if (str_type == 1) {
		str_buffer +=
			"<tr>\n\t<td colspan=\"7\"><hr size=\"1\"><\/td>\n<\/tr>\n" +
			"<tr>\n\t<form name=\"TimeForm\">\n\t<td colspan=\"7\" align=\"center\">" +
			"<font style=\"color:#b22222; font-size:9pt; font-family: arial\">время<\/font>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
			"<select name=\"hours\" onChange=\"dt_date.setHours(this.options[this.selectedIndex].value)\">";
		for (hrs = 0; hrs < 24; hrs++) {
			str_buffer +=
				"<option value=\"" + (hrs.toString().length == 1 ? "0" : "") + hrs +
				"\"" + (hrs == dt_date.getHours() ? " selected" : "") + ">" +
				(hrs.toString().length == 1 ? "0" : "") + hrs;
		}
		str_buffer +=
			"<\/select> ч. " +
			"<select name=\"minutes\" onChange=\"dt_date.setMinutes(this.options[this.selectedIndex].value)\">";
		for (mns = 0; mns < 60; mns++) {
			str_buffer +=
				"<option value=\"" + (mns.toString().length == 1 ? "0" : "") + mns +
				"\"" + (mns == dt_date.getMinutes() ? " selected" : "") + ">" +
				(mns.toString().length == 1 ? "0" : "")+mns;
		}
		str_buffer +=
			"<\/select> мин." +
			"<\/td>\n\t<\/form>\n<\/tr>\n";
	}

	str_buffer +=
		"</table>\n" +
		"</body>\n" +
		"</html>\n";

	var vWinCal = window.open("", "Calendar", 
		"width=220,height="+(str_type == 1 ? "195" : "160")+",status=no,resizable=no,top=200,left=200");
	vWinCal.opener = self;
	vWinCal.focus();
	var calc_doc = vWinCal.document;
	calc_doc.write (str_buffer);
	calc_doc.close();
}

function str2dt2 (str_date, str_type) {
	var re_date;
	if (str_type == 1) {
		re_date = /^(\d+)\.(\d+)\.(\d+) (\d+)\:(\d+)$/;
	}
	else {
		re_date = /^(\d+)\.(\d+)\.(\d+)$/;
	}
	if (!re_date.exec(str_date)) {
		return (false);
	} else {
		if (str_type == 1) {
			var arrDT = new Array();
			var arrD = new Array();
			var arrT = new Array();
			var m, d, Y, HH, mm;
			arrDT = str_date.split(" ");
			arrD = arrDT[0].split(".");
			arrT = arrDT[1].split(":");
			d = parseInt(correct_number(arrD[0]));
			m = parseInt(correct_number(arrD[1])) - 1;
			Y = parseInt(arrD[2]);
			HH = parseInt(correct_number(arrT[0]));
			mm = parseInt(correct_number(arrT[1]));
			return (new Date(Y, m, d, HH, mm));
		}
		else {
			var arrD = new Array();
			var m, d, Y;
			arrD = str_date.split(".");
			d = parseInt(correct_number(arrD[0]));
			m = parseInt(correct_number(arrD[1])) - 1;
			Y = parseInt(arrD[2]);
			return (new Date(Y, m, d));
		}
		//return (new Date (RegExp.$3, RegExp.$2-1, RegExp.$1));
	}
}

function dt2dtstr2 (dt_date) {
var bday, bmonth;
bday = dt_date.getDate().toString();
bmonth = (dt_date.getMonth()+1).toString();

if (bmonth.length == 1) {
	bmonth = "0" + bmonth;
}
if (bday.length == 1) {
	bday = "0" + bday;
}

	return (new String (
			bday+"."+bmonth+"."+dt_date.getFullYear()));
}

function correct_number(strIn) {
	var res;
	if (strIn.length == 2 && (strIn.substr(0, 1) == '0')) {
		res = strIn.substr(1, 1);
	} else {
		res = strIn;
	}
	return (res);
}
