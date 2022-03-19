## Cookie类

	1. 概念：客户端会话技术，将数据保存到客户端。
	
	2. 使用步骤：
		1. 创建Cookie，绑定数据。
			* new Cookie(String name, String value) 
		2. 发送Cookie。
			* response.addCookie(Cookie cookie) 
		3. 获取Cookie，获取数据。
			* Cookie[] request.getCookies()
	
	3. 实现原理。
		* 基于响应头set-cookie和请求头cookie实现。
	
	4. Cookie的细节。
		1. 一次可不可以发送多个Cookie？
			1. 可以。
			2. 首先创建多个Cookie，然后多次调用response.addCookie(Cookie cookie)方法来发送Cookie。
		2. Cookie在客户端浏览器中保存多长时间？
			1. 默认情况下，当客户端浏览器关闭后，Cookie数据会被销毁。
			2. 持久化存储：cookie.setMaxAge(int seconds)
				1. 正数：将Cookie数据写到硬盘的文件中，并指定Cookie存活的时间，到期后Cookie文件自动失效。
				2. 负数：默认值，非持久化存储。
				3. 零：删除Cookie信息，谁调用删除谁。
		3. Cookie能不能存中文？
			1. 在Tomcat8之前，Cookie不能直接存储中文数据，需要将中文数据转码，一般采用URL编码(%E3)。
				1. URL编码：str_date = URLEncoder.encode(字符串, "本字符串原来的编码方式");
				2. URL解码：value = URLDecoder.decode(字符串, "本字符串将要的编码方式");
			2. 在Tomcat8之后，Cookie支持中文数据，特殊字符还是不支持，建议使用URL编码。
		4. Cookie共享问题？
			1. 假设在一个Tomcat服务器中，部署了多个Web项目，那么在这些Web项目中Cookie能不能共享？
				* cookie.setPath(String path)：设置Cookie的获取范围。
					1. 默认情况下，path设置为当前项目的虚拟目录，此时Cookie不能共享。
					2. 如果要共享，可以将path设置为“/”（当前项目的根目录）。
			2. 不同的Tomcat服务器间Cookie的共享问题？
				* 如果要共享，可以将path设置为：不同服务器的不同项目间的相同的高级域名。
					* 例如：setDomain(".baidu.com")，那么tieba.baidu.com和news.baidu.com中Cookie				可以共享。
	
	5. Cookie的特点和作用。
		1. 特点。
			1. Cookie存储的数据在客户端浏览器。
			2. 客户端浏览器对于单个Cookie的大小有限制(4kb)，以及对同一个域名下的总Cookie的数量也有限制(20		  个)。
		2. 作用。
			1. Cookie一般用于存储少量的不太敏感的数据。
			2. 在不登录的情况下，完成服务器对客户端浏览器的身份识别。
	
	6. 同名Cookie的覆盖问题。
		* 上网去查。
