## JDBC事务控制

	1. 事务。
	2. 操作。
		1. 开启事务。
		2. 提交事务。
		3. 回滚事务。
	3. 使用Connection对象来管理事务。
		1. 开启事务：setAutoCommit(boolean autoCommit)：调用该方法设置参数为false，即开启事务。
			* 在执行SQL之前开启事务。
		2. 提交事务：commit()。 
			* 当所有SQL都执行完提交事务。
		3. 回滚事务：rollback()。
			* 在catch中回滚事务。


​			