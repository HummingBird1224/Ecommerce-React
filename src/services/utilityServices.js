const getTime = (time) => {
	if(time === undefined){
		return undefined;
	}
	let year = parseInt(time.substring(0,4));
	let month = parseInt(time.substring(5,7));
	let day = parseInt(time.substring(8,10));
	let hour = parseInt(time.substring(11,13));
	let min = parseInt(time.substring(14,16));

	const days = [31,28,31,30,31,30,31,31,30,31,30,31];

	let carry = 0;
	if(min + 30 > 60){
		min = min - 30;
		carry = 1;
	}else{
		min = min + 30;
	}

	if(hour + carry > 19){
		hour = hour + carry -19;
		carry = 1;
	}else{
		hour = hour + carry + 5;
		carry = 0;
	}

	if(day + carry > days[month-1]){
		day = 1;
		carry = 1;
	}else{
		day = day + carry;
		carry = 0;
	}

	if(month + carry > 12){
		month = 1;
		carry = 1;
	}else{
		month = month + carry;
		carry = 0;
	}

	year = "" +  (year + carry);

	if(month < 10){
		month = "0" + month;
	}else{
		month = "" + month;
	}

	if(day < 10){
		day = "0" + day;
	}else{
		day = "" + day;
	}

	if(hour < 10){
		hour = "0" + hour;
	}else{
		hour = "" + hour;
	}

	if(min < 10){
		min = "0" + min;
	}else{
		min = "" + min;
	}

	return(year + "-" + month + "-" + day + " " + hour + ":" + min);

};

const testHelpValidity = (time) => {

	const date2 = new Date();
	const date1 = new Date(time);
	const Difference_In_Days = (date2.getTime() - date1.getTime())/(1000 * 3600 * 24);
	return Difference_In_Days > 14;


};

const utilityServices = {
	getTime,
	testHelpValidity
};

export default utilityServices;