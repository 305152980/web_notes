## Spring的JDBC模板

	1. Spring框架对JDBC的简单封装。提供了一个JDBCTemplate对象简化JDBC的开发。
	
	2. 步骤：
		1. 导入jar包。
		2. 创建JdbcTemplate对象，依赖于数据源DataSource。
			* JdbcTemplate template = new JdbcTemplate(ds);
		3. 调用JdbcTemplate的方法来完成CRUD的操作。
			1. update()：执行DML语句。增、删、改语句。
			2. queryForMap()：查询结果并将结果集封装为map集合。将名作为key，将值作为value，将这条记录			封装为一个map集合。
				* 注意：这个方法查询的结果集长度只能是1，封装一条记录。
			3. queryForList()：查询结果并将结果集封装为list集合。
				* 注意：这个方法将每一条记录封装为一个Map集合，再将Map集合装载到List集合中。
			4. query()：查询结果并将结果封装为JavaBean对象。
				* query的参数：RowMapper。
					1. 一般我们使用BeanPropertyRowMapper实现类。可以完成数据到JavaBean的自动封装。
					2. new BeanPropertyRowMapper<类型>(类型.class)
			5. queryForObject：查询结果并将结果封装为对象，一般为基本数据类型的对象。
				1. 一般用于聚合函数的查询。
				2. 示例：
					//查询总记录数。
					String sql = "select count(id) from emp";
					Long total = template.queryForObject(sql, Long.class);
