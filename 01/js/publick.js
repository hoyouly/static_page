// js组件01: 关于分页的组件( imgData 为imgjson数组, pageSize为每页显示条数 )
function createDomByData( imgData, pageSize ){
	var Img_ul = document.getElementById('ul_detail_list');
	var Img_li = Img_ul.getElementsByTagName('li')[0];
	var Page_li = Img_ul.getElementsByTagName('li')[1];
	if(imgData && imgData.length > 0){
		if(imgData.length > pageSize){
			// 1: 大于1页, 写分页效果
			var imgStr = '';
			var imgArr = [];
			var numArr = [];
			var totalNum = Math.ceil(imgData.length/Number(pageSize));
			var pagePickerStr = '第&nbsp;&nbsp;';
			for(var i=0; i<totalNum; i++){
				numArr.push(i);
				if(i==0){
					pagePickerStr += '&nbsp;&nbsp;<span class="pageFont alivePage" indexFlag="' +i+ '">[' + (i+1) + ']</span>&nbsp;'
					// 1.1 初始化图片容器
					imgArr = imgData.slice(0, (i+1)*pageSize);
					imgStr = '';
					imgArr.forEach(function(singleSrc){
						imgStr += '<img src="' +singleSrc+ '" />'
					})
					Img_li.innerHTML = imgStr;
				}else if(i == totalNum-1){
					pagePickerStr += '&nbsp;<span class="pageFont" indexFlag="' +i+ '">[' + (i+1) + ']</span>&nbsp;&nbsp;'
				}else{
					pagePickerStr += '&nbsp;<span class="pageFont" indexFlag="' +i+ '">[' + (i+1) + ']</span>&nbsp;'
				}
			}
			pagePickerStr += '&nbsp;&nbsp;页';
			Page_li.innerHTML = pagePickerStr;
			// 1.2 分页数字显示不同的图片内容
			var spanTag = Page_li.getElementsByTagName('span');
			for(var i=0; i<totalNum; i++){
				spanTag[i].addEventListener('click',function(e){
					var indexFlag = Number(e.target.getAttribute('indexFlag'));
					for(var j=0; j<spanTag.length; j++){
						if(indexFlag == j){
							spanTag[j].setAttribute('class','pageFont alivePage');
							// 1.3 截取图片片段 并重绘页面
							imgArr = imgData.slice(j*pageSize, (j+1)*pageSize);
							imgStr = '';
							imgArr.forEach(function(singleSrc){
								imgStr += '<img src="' +singleSrc+ '" />'
							})
							Img_li.innerHTML = imgStr;
						}else{
							spanTag[j].setAttribute('class','pageFont');
						}
					}
				})
			}
		}else{
			// 2: 只有一页, 正常显示即可
			var imgStr = '';
			imgData.forEach(function(singleSrc){
				imgStr += '<img src="' +singleSrc+ '" />'
			})
			Img_li.innerHTML = imgStr;
		}
	}else{
		// 页面中没有数据
		Img_li.innerHTML = '暂无数据！！！';
		return false;
	}
}
