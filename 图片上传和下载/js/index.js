// 页面加载事件 等页面渲染完毕在执行 js 脚本。
window.addEventListener('load', () => {
	let list = document.querySelector('.list');
	let fileBox = document.querySelector('.file');
  let selectFile = document.querySelector('#file');
  // 待上传图片数组。
  let fileList = [];

  let index = 0;
  // 选择待上传的图片。
	selectFile.addEventListener('change', function(e) {
    // 判断选中的文件是否是都是图片类型。
    for(let item of e.target.files) {
      if(!/image\/\w+/.test(item.type)) {
				alert('只能选择图片进行上传');
				return;
			}
    }
		for(let item of e.target.files) {
      // 预览待上传的图片。
      (function(index) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(item);
        fileReader.addEventListener('load', function() {
          let li = document.createElement('li');
          li.innerHTML = `
            <div class='close'>×</div>
            <img src='${this.result}' data-index='${index}'/>
          `;
          list.insertBefore(li, fileBox);
        });
      })(index);
      fileList.push(item);
      index++;
		}
	});

	// 事件委托，删除待上传的图片。
	list.addEventListener('click', (e) => {
		if(e.target.nodeName === 'DIV') {
      let index = e.target.parentNode.lastElementChild.getAttribute('data-index');
      if(index <= fileList.length) {
        fileList[index] = null;
      }
      list.removeChild(e.target.parentNode);
		}
	});

  // 上传图片。
  let upload = document.querySelector('#upload');
  upload.addEventListener('click', () => {
    if(fileList.length === 0) {
      alert('请先选择待上传的图片');
			return;
    }
    const promiseArr = [];
		fileList.forEach(function(item) {
      if(item) {
        promiseArr.push(uploadFile(item));
      }
    });
    Promise.all(promiseArr).then(result => {
      // 清空列表信息。
      list.innerHTML = `
        <li class="file">
          <input type="file" name="file" id="file" multiple />
          <span>请选择图片</span>
        </li>
      `;
      fileList = [];
      index = 0;
      alert('图片上传成功');
    }).catch(error => {
      // 提示报错信息。
      fileList = [];
      index = 0;
      alert('图片上传失败');
    });
	});

  let download = document.querySelector('#download');
  download.addEventListener('click', () => {
    let url = 'https://img1.baidu.com/it/u=2320211849,2262495367&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500';
    downloadFile(url);
	});

  function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    return new Promise(function(resolve, reject) {
      // 发送 Ajax 请求将图片上传至服务器。
      resolve('图片上传成功');
      // reject('图片上传失败');
    });
  };

  function downloadFile(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function() {
      const fileBlob = xhr.response;
      const fileUrl = window.URL.createObjectURL(fileBlob);
      const a = document.createElement('a');
      a.setAttribute('href', fileUrl);
      // 设置下载文件的文件名。
      a.setAttribute('download', 'test');
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(fileUrl);
    };
  };
});
