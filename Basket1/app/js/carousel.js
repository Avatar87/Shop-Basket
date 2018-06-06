$(document).ready(function(){
	var t = setInterval(function(){
		$("#carousel ul").animate({marginLeft:-350},2000,function(){
			$(this).find("li:last").after($(this).find("li:first"));
			$(this).css({marginLeft:0});
		})
	},5000);
});