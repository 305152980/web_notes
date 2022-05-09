## JDBC工具类 

	1. 目的：简化书写。
	
	2. 分析。
		1. 注册驱动也抽取。
		2. 抽取一个方法获取连接对象。
			1. 需求：不想传递参数（麻烦），还得保证工具类的通用性。
			2. 解决：配置文件。
				jdbc.properties
		3. 抽取一个方法释放资源。
		
	3. 代码实现：
	    public class JDBCUtils {
	        private static String url;
	        private static String user;
	        private static String password;
	        private static String driver;
	        static{
	        try {
	            //1.创建Properties集合类。
	            Properties pro = new Properties();
	            ClassLoader classLoader = JDBCUtils.class.getClassLoader();
	            URL res = classLoader.getResource("jdbc.properties");
	            String path = res.getPath();
	            //2.加载文件。
	            pro.load(new FileReader(path));
	            //3.获取数据，赋值。
	            url = pro.getProperty("url");
	            user = pro.getProperty("user");
	            password = pro.getProperty("password");
	            driver = pro.getProperty("driver");
	            //4.注册驱动。
	            Class.forName(driver);
	        } catch (IOException e) {
	            e.printStackTrace();
	        } catch (ClassNotFoundException e) {
	            e.printStackTrace();
	            }
	        }
	         /**
	         * 获取连接
	         * @return 连接对象
	         */
	        public static Connection getConnection() throws SQLException {
	            return DriverManager.getConnection(url, user, password);
	        }
	        /**
	         * 释放资源
	         * @param stmt
	         * @param conn
	         */
	        public static void close(Statement stmt, Connection conn){
	            if( stmt != null){
	                try {
	                    stmt.close();
	                } catch (SQLException e) {
	                    e.printStackTrace();
	                }
	            }
	            if( conn != null){
	                try {
	                    conn.close();
	                } catch (SQLException e) {
	                    e.printStackTrace();
	                }
	            }
	        }
	    }


​			