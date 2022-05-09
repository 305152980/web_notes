
## JDBC
	1. 概念：Java DataBase Connectivity  Java 数据库连接，Java语言操作数据库。
		* JDBC本质：JDBC是官方（sun公司）定义的一套操作所有关系型数据库的规则，即接口。各个数据库厂商去实现这套接口，提供数据库驱动所需的jar包。我们可以使用这套接口（JDBC）编程，真正执行的代码是驱动jar包中的实现类。
	
	2. 快速入门。
		1. 步骤：
			1. 导入驱动jar包 mysql-connector-java-5.1.37-bin.jar。
				1.复制mysql-connector-java-5.1.37-bin.jar到项目的libs目录下。
				2.右键 --> Add As Library。
			2. 注册驱动。
			3. 获取数据库连接对象Connection。
			4. 定义SQL。
			5. 获取执行SQL语句的对象Statement。
			6. 执行SQL，接受返回结果。
			7. 处理结果。
			8. 释放资源。
		2. 代码实现：
		  	//1.导入驱动jar包。
	        //2.注册驱动。
	        Class.forName("com.mysql.jdbc.Driver");
	        //3.获取数据库连接对象。
	        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/db3", 		 "root", "root");
	        //4.定义SQL语句。
	        String sql = "update account set balance = 500 where id = 1";
	        //5.获取执行SQL的对象Statement。
	        Statement stmt = conn.createStatement();
	        //6.执行SQL。
	        int count = stmt.executeUpdate(sql);
	        //7.处理结果。
	        System.out.println(count);
	        //8.释放资源。
	        stmt.close();
	        conn.close();
	
	3. 详解各个对象。
		1. DriverManager：驱动管理对象。
			* 功能：
				1. 注册驱动：告诉程序该使用哪一个数据库的驱动jar包。
					1. static void registerDriver(Driver driver)：注册给定的驱动DriverManager。 
					2. 写代码使用：Class.forName("com.mysql.jdbc.Driver");
					3. 通过查看源码发现：在com.mysql.jdbc.Driver类中存在静态代码块。
	                     static {
	                            try {
	                                java.sql.DriverManager.registerDriver(new Driver());
	                            } catch (SQLException E) {
	                                throw new RuntimeException("Can't register driver!");
	                            }
	                        }
					注意：MySQL5之后的驱动jar包可以省略注册驱动的步骤。
				2. 获取数据库连接。
					1. 方法：
					static Connection getConnection(String url, String user, String password) 
					2. 参数。
						1. url：指定连接的路径。
							1. 语法：jdbc:mysql://ip地址(域名):端口号/数据库名称
							2. 例子：jdbc:mysql://localhost:3306/db3
								注意：如果连接的是本机MySQL服务器，并且MySQL默认端口是3306，则url可以							简写为：jdbc:mysql:///数据库名称。
						2. user：用户名。
						3. password：密码 。
		2. Connection：数据库连接对象。
			1. 功能。
				1. 获取执行SQL的对象。
					1. Statement createStatement()
					2. PreparedStatement prepareStatement(String sql)  
				2. 管理事务。
					1. 开启事务：setAutoCommit(boolean autoCommit)：调用该方法设置参数为false，即开				启事务。
					2. 提交事务：commit()
					3. 回滚事务：rollback()
		3. Statement：执行SQL的对象。
			* 执行SQL。
				1. boolean execute(String sql)：可以执行任意的SQL。（了解 ）
				2. int executeUpdate(String sql)：执行DML（insert、update、delete）语句、					DDL(create，alter、drop)语句。
					 * 返回值：影响的行数。可以通过影响的行数判断DML语句是否执行成功：返回值>0的执行成功，			   反之执行失败。
				3. ResultSet executeQuery(String sql)：执行DQL（select)语句。	
		4. ResultSet：结果集对象，封装查询结果。
			1. boolean next()：游标向下移动一行，判断当前行是否是末尾行(是否有数据)。如果是，则返回			false；如果不是，则返回true。
			2. getXxx(参数)：获取数据。
				1. Xxx：代表数据类型。如：int getInt(), String getString()。
				2. 参数：
					1. int：代表列的编号，从1开始。如：getString(1)
					2. String：代表列名称。如：getDouble("balance")
			注意：使用步骤：1.游标向下移动一行；2.判断是否有数据；3.获取数据。					
		5. PreparedStatement：执行SQL的对象。
			1. SQL注入问题：在拼接SQL时，有一些SQL的特殊关键字参与字符串的拼接，会造成安全性问题
				1. 输入用户随便，输入密码：a' or 'a' = 'a
				2. SQL：select * from user where username = 'fhdsjkf' and password = 'a' or 				'a' = 'a'
	
			2. 解决SQL注入问题：使用PreparedStatement对象来解决。
			3. 预编译的SQL：参数使用“?”作为占位符。
			4. 步骤：
				1. 导入驱动jar包mysql-connector-java-5.1.37-bin.jar。
				2. 注册驱动。
				3. 获取数据库连接对象Connection。
				4. 定义SQL。
					注意：SQL的参数使用“？”作为占位符。如：select * from user where username = ? 			and password = ?
				5. 获取执行SQL语句的对象PreparedStatement：Connection.prepareStatement(String 			sql) 
				6. 给“？”赋值。
					* 方法：setXxx(参数1, 参数2)
						1. 参数1：“？”的位置编号，从1开始。
						2. 参数2：“？”的值。
				7. 执行SQL，接受返回结果，不需要传递SQL语句。
				8. 处理结果。
				9. 释放资源。
			5. 注意：后期都会使用PreparedStatement来完成增删改查的所有操作。
				1. 可以防止SQL注入。
				2. 效率更高。
