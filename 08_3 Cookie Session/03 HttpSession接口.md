
## HttpSession接口
	1. 概念：服务器端会话技术。在一次会话的多次请求间共享数据，将数据保存在服务器端的对象中。
	2. 快速入门。
		1. 获取HttpSession对象。
			HttpSession httpSession = request.getSession();
		2. 使用HttpSession对象。HttpSession也是一个域对象。
			* 方法，同Request域对象。  
				1. void setAttribute(String name, Object obj)：存储数据。
				2. Object getAttribute(String name)：通过键获取值。
				3. void removeAttribute(String name)：通过键移除键值对。
	
	3. 原理。
		* HttpSession的实现是依赖于Cookie。（见图片）
	
	4. HttpSession的细节。
		1. 客户端关闭后，服务器不关闭，两次获取的HttpSession是否为同一个？
			1. 默认情况下，不是同一个HttpSession。
			2. 可以通过设置，来获取到同一个HttpSession。如下：
				Cookie c = new Cookie("JSESSIONID",session.getId());
				c.setMaxAge(60*60);
				response.addCookie(c);
		2. 客户端不关闭，服务器关闭后，两次获取的HttpSession是否为同一个？
			* 不是同一个，但是前后获取的两个HttpSession中的数据相同。
				* Tomcat自动完成以下工作:
					1. Session的钝化：
						* 在服务器正常关闭之前，将Session对象序列化为硬盘上的Session文件。
					2. Session的活化：
						* 在服务器启动后，将Session文件反序列化为内存中的Session对象。			
		3. HttpSession什么时候被销毁？
			1. httpSession.invalidate();
			2. 在会话保持连接的前提下，客户端30分钟内无请求，HttpSession自动失效。
				* 在web.xml文件中设置HttpSession自动失效的时间。（单位：分钟）
	                <session-config>
	                     <session-timeout>30</session-timeout>
	                 </session-config>
	
	 5. Session与Cookie的区别。
			1. Session存储的数据在服务器端；Cookie存储的数据在客户端浏览器。
			2. Session存储的数据没有大小限制，可以存储任何数据；Cookie存储的数据有大小限制，只能存储字符串		   类型的数据。
			3. Session不用担心中文乱码，Cookie需要解决此问题。
			4. Session安全，Cookie相对于不安全。
