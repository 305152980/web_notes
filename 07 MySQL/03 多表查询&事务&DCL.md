
## 多表查询
	1. 查询语法。
		select
			列名列表
		from
			表名列表
		where...;
	
	2. 准备SQL。
		# 创建部门表
		CREATE TABLE dept(
			id INT PRIMARY KEY AUTO_INCREMENT,
			NAME VARCHAR(20)
		);
		INSERT INTO dept (NAME) VALUES ('开发部'),('市场部'),('财务部');
		# 创建员工表
		CREATE TABLE emp (
			id INT PRIMARY KEY AUTO_INCREMENT,
			NAME VARCHAR(10),
			gender CHAR(1), -- 性别
			salary DOUBLE, -- 工资
			join_date DATE, -- 入职日期
			dept_id INT,
			FOREIGN KEY (dept_id) REFERENCES dept(id) -- 外键，关联部门表(部门表的主键)
		);
		INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('孙悟空','男',7200,'2013-02-24',1);
		INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('猪八戒','男',3600,'2010-12-02',2);
		INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('唐僧','男',9000,'2008-08-08',2);
		INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('白骨精','女',5000,'2015-10-07',3);
		INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('蜘蛛精','女',4500,'2011-03-14',1);
	
	3. 笛卡尔积。
		1. 两个集合A、B中元素排列组合的所有情况的集合称为笛卡尔积。
		2. 要完成多表查询，需要消除笛卡尔积中的无用数据。
	
	4. 多表查询的分类。
		1. 内连接查询。
			1. 隐式内连接：使用where条件消除无用数据。
				* 示例：
				-- 查询所有员工信息和员工对应的部门信息。
				SELECT * FROM emp, dept WHERE emp.`dept_id` = dept.`id`;
	            -- 查询员工的名称、性别和员工对应的部门的名称。
	            SELECT 
					t1.name, -- 员工表的姓名
					t1.gender,-- 员工表的性别
					t2.name -- 部门表的名称
				FROM
					emp t1,
					dept t2
				WHERE 
					t1.`dept_id` = t2.`id`;
			2. 显式内连接。
				1. 语法：select 字段列表 from 表名1 [inner] join 表名2 on 条件;
				2. 示例：
	                SELECT * FROM emp INNER JOIN dept ON emp.`dept_id` = dept.`id`;	
	                SELECT * FROM emp JOIN dept ON emp.`dept_id` = dept.`id`;	
			3. 内连接查询需确定的要素。
				1. 从哪些表中查询数据。
				2. 条件是什么。
				3. 查询哪些字段。
		2. 外链接查询。
			1. 左外连接。
				1. 语法：select 字段列表 from 表1 left [outer] join 表2 on 条件;
				2. 查询的是左表所有数据以及其交集部分。
				3. 示例：
	                -- 查询所有员工的信息，如果员工有部门，则也查询部门名称。
	                SELECT 	t1.*, t2.`name` FROM emp t1 LEFT JOIN dept t2 ON t1.`dept_id` = 				t2.`id`;
			2. 右外连接。
				1. 语法：select 字段列表 from 表1 right [outer] join 表2 on 条件；
				2. 查询的是右表所有数据以及其交集部分。
				3. 示例：
					SELECT * FROM dept t2 RIGHT JOIN emp t1 ON t1.`dept_id` = t2.`id`;
		3. 子查询。
			1. 概念：查询中如果嵌套查询，称嵌套查询为子查询。
			2. 示例：
	            -- 查询工资最高的员工信息。
	            -- 1.查询最高的工资是多少。9000
	            SELECT MAX(salary) FROM emp;
	            -- 2.查询工资等于9000的员工的信息。
	            SELECT * FROM emp WHERE emp.`salary` = 9000;
	            -- 一条SQL就完成这个操作。子查询。
	            SELECT * FROM emp WHERE emp.`salary` = (SELECT MAX(salary) FROM emp);
			2. 子查询的各种情况。
				1. 子查询的结果是单行单列的。
					1. 子查询可以作为条件，使用运算符去判断。 运算符：>/>=/</<=/=。
					2. 示例：
						-- 查询工资小于平均工资的员工的信息。
	                    SELECT * FROM emp WHERE emp.salary < (SELECT AVG(salary) FROM emp);
				2. 子查询的结果是多行单列的。
					1. 子查询可以作为条件，使用运算符in来判断。
					2. 示例：
	                    -- 查询'财务部'和'市场部'所有的员工信息。
	                    SELECT id FROM dept WHERE NAME = '财务部' OR NAME = '市场部';
	                    SELECT * FROM emp WHERE dept_id = 3 OR dept_id = 2;
	                    -- 子查询。
	                    SELECT * FROM emp WHERE dept_id IN (SELECT id FROM dept WHERE NAME = 					 '财务部' OR NAME = '市场部');
				3. 子查询的结果是多行多列的。
					1. 子查询可以作为一张虚拟的表参与查询。
					2. 示例：
	                    -- 子查询：查询2011-11-11之后入职的员工的员工信息和其部门信息。
	                    SELECT * FROM dept t1, (SELECT * FROM emp WHERE emp.`join_date` > 						'2011-11-11') t2 WHERE t1.id = t2.dept_id;
	                    -- 普通内连接：查询2011-11-11之后入职的员工的员工信息和其部门信息。
	                    SELECT * FROM emp t1, dept t2 WHERE t1.`dept_id` = t2.`id` AND 							t1.`join_date` > '2011-11-11';


​						

## 事务

	1. 事务的基本介绍。
		1. 概念：
			* 如果一个包含多个步骤的业务操作被事务管理，那么这些操作要么同时成功，要么同时失败。	
		2. 操作。
			1. 开启事务：start transaction;
			2. 回滚：rollback;
			3. 提交：commit;
		3. 准备SQL。
			CREATE TABLE account (
				id INT PRIMARY KEY AUTO_INCREMENT,
				NAME VARCHAR(10),
				balance DOUBLE
			);
			-- 添加数据
			INSERT INTO account (NAME, balance) VALUES ('zhangsan', 1000), ('lisi', 1000);
			* 示例：	
	            SELECT * FROM account;
	            UPDATE account SET balance = 1000;
	            -- 张三给李四转账500元。
	            -- 0. 开启事务。
	            START TRANSACTION;
	            -- 1. 张三账户-500。
	            UPDATE account SET balance = balance - 500 WHERE NAME = 'zhangsan';
	            -- 2. 李四账户+500。
	            -- 出错了...
	            UPDATE account SET balance = balance + 500 WHERE NAME = 'lisi';
	            -- 发现执行没有问题，提交事务。
	            COMMIT;
	            -- 发现执行出了问题，回滚事务。
	            ROLLBACK;
		4. MySQL数据库中事务默认自动提交。
			1. 事务提交的两种方式。
				1. 自动提交。
					1. MySQL就是自动提交的。
					2. 一条DML(增删改)语句会自动提交一次事务。
				2. 手动提交。
					1. Oracle数据库默认是手动提交事务。
					2. 需要先开启事务，再提交。
			2. 修改事务的默认提交方式。
				1. 查看事务的默认提交方式：SELECT @@autocommit;-- 1代表自动提交，0代表手动提交。
				2. 修改默认提交方式：set @@autocommit = 0;
	
	2. 事务的四大特征。
		1. 原子性：事务是不可分割的最小操作单位，要么同时成功，要么同时失败。
		2. 持久性：当事务提交或回滚后，数据库会持久化的保存数据。
		3. 隔离性：多个事务之间，相互独立。
		4. 一致性：事务操作前后，数据总量保持不变。
	
	3. 事务的隔离级别。（了解）
		1. 概念：多个事务之间是隔离的相互独立的，但是如果多个事务操作同一批数据，则会引发一些问题。设置不同的	隔离级别就可以解决这些问题。
		2. 存在的问题。
			1. 脏读：一个事务读取到另一个事务中没有提交的数据。
			2. 不可重复读(虚读)：在同一个事务中两次读取到的数据不一样。
			3. 幻读：在一个事务操作(DML)数据表中所有记录的时候，另一个事务向此表中添加了一条数据，则第一个事		务准备提交时会发现表中还存在没有被操作的记录。
		3. 隔离级别。
			1. read uncommitted：读未提交。
				* 产生的问题：脏读、不可重复读、幻读。
			2. read committed：读已提交。（Oracle默认）
				* 产生的问题：不可重复读、幻读。
			3. repeatable read：可重复读。（MySQL默认）
				* 产生的问题：幻读。
			4. serializable：串行化。
				* 可以解决所有问题。
			* 注意：隔离级别从小到大安全性越来越高，但是效率越来越低。
			5. 数据库查询隔离级别。
				* select @@tx_isolation;
			6. 数据库设置隔离级别。
				* set global transaction isolation level 级别字符串;



## DCL
	1. SQL分类。
		1. DDL：操作数据库和表。
		2. DML：增删改表中数据。
		3. DQL：查询表中数据。
		4. DCL：管理用户，授权。
	
	2. DBA：数据库管理员。
	
	3. DCL。
		1. 管理用户。
			1. 添加用户。
				* 语法：CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';
			2. 删除用户。
				* 语法：DROP USER '用户名'@'主机名';
			3. 修改用户密码。
				UPDATE USER SET PASSWORD = PASSWORD('新密码') WHERE USER = '用户名';
				UPDATE USER SET PASSWORD = PASSWORD('abc') WHERE USER = 'lisi';
				SET PASSWORD FOR '用户名'@'主机名' = PASSWORD('新密码');
				SET PASSWORD FOR 'root'@'localhost' = PASSWORD('123');
				注意：MySQL中忘记了root用户的密码？
					1. 停止MySQL服务:cmd --> net stop mysql
						* 需要管理员运行该cmd。
					2. 使用无验证方式启动MySQL服务：mysqld --skip-grant-tables
					3. 打开新的cmd窗口，直接输入MySQL命令并且敲回车。就可以登录成功。
					4. use mysql;
					5. update user set password = password('你的新密码') where user = 'root';
					6. 关闭两个窗口。
					7. 打开任务管理器，手动结束mysqld.exe的进程。
					8. 启动MySQL服务。
					9. 使用新密码登录。
			4. 查询用户。
				-- 1. 切换到MySQL数据库。
				USE myql;
				-- 2. 查询user表。
				SELECT * FROM USER;
				* 通配符：% 表示可以在任意主机使用用户登录数据库。
		2. 权限管理。
			1. 查询权限。
				* 示例：
	                SHOW GRANTS FOR '用户名'@'主机名';
	                SHOW GRANTS FOR 'lisi'@'%';
			2. 授予权限。
				1. 语法：grant 权限列表 on 数据库名.表名 to '用户名'@'主机名';
				2. 示例：
	                -- 给张三用户授予在任意数据库任意表上的所有权限。
	                GRANT ALL ON *.* TO 'zhangsan'@'localhost';
			3. 撤销权限。
				1. 语法：revoke 权限列表 on 数据库名.表名 from '用户名'@'主机名';
				2. 示例：
					REVOKE UPDATE ON db3.`account` FROM 'lisi'@'%';