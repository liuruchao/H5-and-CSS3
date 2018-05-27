$(function(){
	//左导航列表点击菜单
	$(".list>li>a>span").click(function(){
		$(this).parent().toggleClass("select")
		.end()
		.next(".sec-list").slideToggle(100)
		.end()
		.parents("li").toggleClass("bg-select");

	});
	$(".list .sec-list>li>span").click(function(){
		$(this).parent().toggleClass("select")
		.end()
		.next("ul").slideToggle(100);
		var $angle=$(this).prev();
		if($angle.hasClass("fa-angle-right")){
			$angle.removeClass("fa-angle-right")
			.addClass("fa-angle-down");
		}else{
			$angle.removeClass("fa-angle-down")
			.addClass("fa-angle-right");
		}
		return false;
	})
})