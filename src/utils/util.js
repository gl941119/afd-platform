export default class Util {
	/**
	 * date format
	 * @param {Date} date => new Date()
	 * @param {String} type => 'date'(default)/'time'/'pureTime'
	 */
	dateFormat(date, type = 'date') {
		if(date instanceof Date) {
			let mat = {};

			mat.Y = date.getFullYear();
			mat.M = this._check(date.getMonth() + 1); // Month+1
			mat.D = this._check(date.getDate());
			mat.H = this._check(date.getHours());
			mat.m = this._check(date.getMinutes());
			mat.s = this._check(date.getSeconds());

			let result;

			switch(type) {
				case 'time':
					result = `${mat.Y}-${mat.M}-${mat.D} ${mat.H}:${mat.m}:${mat.s}`;
					break;
				case 'pureTime':
					result = `${mat.H}:${mat.m}:${mat.s}`;
					break;
				default:
					result = `${mat.Y}-${mat.M}-${mat.D}`;
					break;
			}
			return result;
		} else if(typeof date === 'number') {
			try {
				let dateForm = new Date(date);
				let Y = dateForm.getFullYear();
				let M = this._check(dateForm.getMonth() + 1); // Month+1
				let D = this._check(dateForm.getDate());
				let H = this._check(dateForm.getHours());
				let m = this._check(dateForm.getMinutes());
				let s = this._check(dateForm.getSeconds());
				let result;

				switch(type) {
					case 'time':
						result = `${Y}-${M}-${D} ${H}:${m}:${s}`;
						break;
					case 'pureTime':
						result = `${H}:${m}:${s}`;
						break;
					default:
						result = `${Y}-${M}-${D}`;
						break;
				}
				return result;
			} catch(error) {
				console.error('date params error!', date, error);
			}
		} else {
			return date;
		}
	}
	// 检查是不是两位数字，不足补全
	_check(str) {
		str = str.toString();
		if(str.length < 2) {
			str = '0' + str;
		}
		return str;
	}

	// power add and delete
	arrayAddOrDel(sel, ids, list) {
		try {
			let temp = list.filter(item => !ids.includes(item));

			temp.push(...sel);
			return temp;
		} catch(error) {
			console.error('arrayAddOrDel ->', error);
			return [];
		}
	}

	// 深度复制对象
	deepClone(target) {
		let ctx = this;
		let result = {};

		if(typeof target === 'object') {
			if(target instanceof Array) {
				result = [];
			} else if(target instanceof Date) {
				result = new Date(target);
			}

			for(let key in target) {
				result[key] = typeof target[key] === 'object' ? ctx.deepClone(target[key]) : target[key];
			}
		} else {
			result = target;
		}
		return result;
	}

    /**
     * 剩余时间和状态
     * @param {Object} data {startTime: timestamp, endTime: timestamp}
     * @param {Date} systemTime timestamp
     * @returns {Object} { status: 0default/1->未开始/2->正在开始/3->已结束, remainTime: String, dayArr: Array }
     */
    handleTime(data, systemTime, text = null) {
        let {
            startTime,
            endTime
        } = data;
        let startDiff = systemTime - startTime; // 即将开始
        let endDiff = endTime - systemTime; // 剩余时间
        let status = endDiff < 0 ? 3 : 0;
        let remainTime = undefined;
        // console.log('diff___>', startDiff, endDiff, new Date(startTime), new Date(systemTime), new Date(endTime));
        let dayArr = [];
        if (startDiff < 0) {
            status = 1;
            dayArr = this.formatDuring(-startDiff);
            remainTime = dayArr[0] > 0 ? dayArr[0] + text : `${dayArr[1]}:${dayArr[2]}:${dayArr[3]}`;
        } else if (startDiff > 0 && endDiff > 0) {
            dayArr = this.formatDuring(endDiff);
            status = 2;
            remainTime = dayArr[0] > 0 ? dayArr[0] + text : `${dayArr[1]}:${dayArr[2]}:${dayArr[3]}`;
        }
        return {status, remainTime, dayArr}
    }

    randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }
    
    /**
     * 生成随机code
     * @param {String} o -> code resource 
     * @param {Number} len -> create code length
     * @return {String}
     */
    makeCode(o, len) {
        let code = '';
        for (let i = 0; i < len; i++) {
            code += o[this.randomNum(0, o.length)]
        }
        return code;
    }
	// 毫秒数 转 天 小时 分钟 秒
	formatDuring(mss) {
		try {
			var days = parseInt(mss / (1000 * 60 * 60 * 24));
			var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = parseInt(((mss % (1000 * 60)) / 1000));
			return [this._check(days), this._check(hours), this._check(minutes), this._check(seconds)];
		} catch(error) {
			console.error('formatDuring error_>', error);
			return [];
		}
    }
    
    getCurrLanguage(store){
        return store.state.slangChange || 'EN';
    }
	
	// 读取反馈代码
	judgeLanguage(lang, key){
		switch(lang){
			case 'zh': 
				return feedbackZh[key];
				break;
			default:
				return feedbackEn[key];
				break;
		}
	}
    newWin(url) {
        console.log('url_>', url);
        var tempWindow = window.open('', '_blank', ''); //打开一个新的空白窗口
        tempWindow.location.href = url;  //对新打开的页面进行重定向
    }

}