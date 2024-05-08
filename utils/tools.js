//获取富文本内的图片url地址
export function getImgSrc(richtext,num=3) {
	let imgList = [];
	richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
		  imgList.push(capture);
	});
	imgList=imgList.slice(0,num)
	return imgList;
}

//获取昵称
export function giveName(item){
	return  item.user_id[0].nickname ||  item.user_id[0].username || item.user_id[0].mobile || "请设置昵称"	
}

//获取默认头像
export function giveAvatar(item){	
	return item.user_id[0]?.avatar_file?.url ?? '../../static/images/user-default.jpg'
}



