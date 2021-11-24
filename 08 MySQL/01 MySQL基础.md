
## MySQL基础
	1. 数据库的基本概念。
	    1. 数据库的英文单词：DataBase，简称DB。
	    2. 数据库的定义：
	        * 用于存储和管理数据的仓库。
	    3. 数据库的特点：
	        1. 持久化存储数据。其实数据库就是一个文件系统。
	        2. 方便存储和管理数据。
	        3. 使用了统一的方式操作数据库——SQL。
		4. 常见的数据库软件。
	        * 参见《MySQL基础.pdf》
	
	2. MySQL数据库软件。
	    1. 安装。
	        * 参见《MySQL基础.pdf》
	    2. 卸载：
	        1. 在MySQL的安装目录找到my.ini文件。
	            * 复制datadir="C:/ProgramData/MySQL/MySQL Server 5.5/Data/"。
	        2. 卸载MySQL。
	        3. 删除C:/ProgramData目录下的MySQL文件夹。
	    3. 配置
	        1. MySQL服务启动：
	            1. 手动。
	            2. cmd--> services.msc打开服务的窗口。
	            3. 使用管理员打开cmd：
	                1. net start mysql：启动MySQL的服务。
	                2. net stop mysql：关闭MySQL服务。
	        2. MySQL登录：
	            1. mysql -uroot -p密码。
	            2. mysql -hip -uroot -p连接目标的密码。
	            3. mysql --host=ip --user=root --password=连接目标的密码。
	        3. MySQL退出：
	            1. exit。
	            2. quit。
		4. MySQL目录结构：
			1. MySQL安装目录：basedir="D:/develop/MySQL/"。
				* 配置文件：my.ini。
			2. MySQL数据目录：datadir="C:/ProgramData/MySQL/MySQL Server 5.5/Data/"。
			3. 几个概念：
	            1. 数据库：文件夹。
	            2. 表：文件。
	            3. 数据：数据。
	            
	3. SQL。
	    1. SQL定义：
	        Structured Query Language：结构化查询语言。SQL定义了操作所有关系型数据库的规则。每一种数据库	的操作方式存在不一样的地方，称为“方言”。
	    2.SQL通用语法：
	        1. SQL可以单行或多行书写，以分号结尾。
	        2. 可使用空格和缩进来增强语句的可读性。
	        3. MySQL数据库的SQL语句不区分大小写，关键字建议使用大写。
	        4. 3种注释：
	            1. 单行注释: -- 注释内容 或 # 注释内容(mysql特有)。 
	            2. 多行注释: /* 注释 */。
	    3. SQL分类：
	        1. DDL(Data Definition Language)数据定义语言。
	            用来定义数据库对象：数据库、表、列等。关键字：create、drop、alter等
	        2. DML(Data Manipulation Language)数据操作语言。
	            用来对数据库中表的数据进行增删改。关键字：insert、delete、update等
	        3. DQL(Data Query Language)数据查询语言。
	            用来查询数据库中表的记录(数据)。关键字：select、where等
	        4. DCL(Data Control Language)数据控制语言。
	            用来定义数据库的访问权限和安全级别及用户的创建。关键字：GRAN、REVOKE等
	
	4.DDL:操作数据库、表。
	    1. 操作数据库：CRUD。
	        1. C(Create):创建。
	            1. 创建数据库：
	                * create database 数据库名称;
	            2. 创建数据库，判断不存在，再创建：
	                * create database if not exists 数据库名称;
	            3. 创建数据库，并指定字符集：
	                * create database 数据库名称 character set 字符集名;
	            * 练习： 创建db4数据库，判断是否存在，并制定字符集为gbk。
	                * create database if not exists db4 character set gbk;
	        2. R(Retrieve)：查询。
	            1. 查询所有数据库的名称:
	                * show databases;
	            2. 查询某个数据库的创建语句，简介查询该数据库的字符集：
	                * show create database 数据库名称;
	        3. U(Update)：修改。
	            * 修改数据库的字符集：
	                * alter database 数据库名称 character set 字符集名称;
	        4. D(Delete)：删除。
	            1. 删除数据库：
	                * drop database 数据库名称;
	            2. 判断数据库存在，存在再删除：
	                * drop database if exists 数据库名称;
	        5. 使用数据库。
	            1. 查询当前正在使用的数据库名称：
	                * select database();
	            2. 使用数据库：
	                * use 数据库名称;
	    2. 操作表。
	        1. C(Create)：创建。
	            1. 语法：
	                create table 表名(
	                    列名1 数据类型1,
	                    列名2 数据类型2,
	                    ....
	                    列名n 数据类型n
	                );
	                * 注意：最后一列，不需要加逗号","。
					* 数据库类型：
						1. int：整数类型。
							* age int
						2. double：小数类型。
							* score double(5,2)
						3. date：日期类型。只包含年月日：yyyy-MM-dd。
						4. datetime：日期类型。包含年月日时分秒：yyyy-MM-dd HH:mm:ss。
						5. timestamp：时间戳类型。包含年月日时分秒：yyyy-MM-dd HH:mm:ss。	
							* 如果将来不给这个字段赋值或赋值为null，则默认使用当前的系统时间来自动赋值。
						6. varchar：字符串类型。
							* name varchar(20)：姓名最多20个字符。
							* zhangsan：8个字符；张三：2个字符。
	            2. 创建表。
	                create table student(
	                    id int,
	                    name varchar(32),
	                    age int ,
	                    score double(4,1),
	                    birthday date,
	                    insert_time timestamp
	                );
	            3. 复制表：
	                * create table 表名 like 被复制的表名;
	                * like方法只复制表的结构和相关属性，并不复制里面的数据。
	        2. R(Retrieve)：查询。
	            1. 查询某个数据库中所有的表名称。
	                * show tables;
	            2. 查询表结构。
	                * desc 表名;
	        3. U(Update)：修改。
	            1. 修改表名。
	                alter table 表名 rename to 新的表名;
	            2. 修改表的字符集。
	                alter table 表名 character set 字符集名称;
	            3. 添加一列。
	                alter table 表名 add 列名 数据类型;
	            4. 修改列名称和类型。
	                alter table 表名 change 列名 新列别 新数据类型;
	                alter table 表名 modify 列名 新数据类型;
	            5. 删除列。
	                alter table 表名 drop 列名;
	        4. D(Delete)：删除。
	            * drop table 表名;
	            * drop table if exists 表名;
	            
	5. DML：增删改表中的数据。
	    1. 添加数据：
	        * 语法：
	            * insert into 表名(列名1,列名2,...,列名n) values(值1,值2,...,值n);
	        * 注意：
	            1. 列名和值要相对应。
	            2. 如果表名后不定义列名，则默认给所有列添加值。
	                * insert into 表名 values(值1,值2,...,值n);
	            3. 除了数字类型，其他类型需要使用引号(单双都可以)。
	    2. 删除数据：
	        * 语法：
	            * delete from 表名 [where 条件];
	        * 注意：
	            1. 如果不加条件，则删除表中的所有记录。
	            2. 删除表中的所有记录：
	                1. delete from 表名; -- 不推荐使用。有多少条记录就会执行多少次删除操作。
	                2. TRUNCATE TABLE 表名; -- 推荐使用。先删除该表，然后再创建一张相同表结构的空表。
	    3. 修改数据：
	        * 语法：
	            * update 表名 set 列名1 = 值1, 列名2 = 值2,..., 列名n = 值n [where 条件];
	        * 注意：
	            * 如果不加任何条件，则会将表中所有记录将全部修改。
	            
	6. DQL：查询表中的记录。
	    1. 语法：
	        select
	            字段列表
	        from
	            表名列表
	        where
	            条件列表
	        group by
	            分组字段
	        having
	            分组之后的条件
	        order by
	            排序
	        limit
	            分页限定
	    2. 基础查询：
	        1. 多个字段的查询：
	            * select 字段名1,字段名2,...,字段n from 表名;
	            * 注意：
	                * 如果查询所有字段，则可以使用*来替代字段列表。
	        2. 去除重复：
	            * distinct。
	            * select distinct 字段名1,字段名2,...,字段n from 表名;
	        3. 计算列：
	            * 一般可以使用四则运算计算一些列的值。（一般只会进行数值类型的计算）
	            * ifnull(字段名,值)：null参与的运算，计算结果都为null。
	                * 字段名：哪个字段需要判断是否为null。
	                * 值：如果该字段为null就用该值来替换。
	        4. 起别名：
	            * as：as也可以省略。
	            * select 字段名 as 新字段名 from 表名;
	    3. 条件/模糊查询：
	        1. where子句后跟条件。
	        2. 运算符：
	            1. > 、< 、<= 、>= 、= 、<>
	            2. BETWEEN...AND...  
	            2. IN(值1,值2,...,值n) 
	            3. LIKE：模糊查询
	                * 占位符：
	                    1. _：单个任意字符。
	                    2. %：多个任意字符。
	            4. IS NULL  
	            5. and或&&
	            6. or或|| 
	            7. not或!
			3. 代码案例：
				-- 查询年龄大于20岁。
				SELECT * FROM student WHERE age > 20;
				-- 查询年龄等于20岁。
				SELECT * FROM student WHERE age = 20;
				-- 查询年龄不等于20岁。
				SELECT * FROM student WHERE age != 20;
				SELECT * FROM student WHERE age <> 20;
				-- 查询年龄大于等于20岁且小于等于30岁。
				SELECT * FROM student WHERE age >= 20 && age <=30;
				SELECT * FROM student WHERE age >= 20 AND age <=30;
				SELECT * FROM student WHERE age BETWEEN 20 AND 30;
				-- 查询年龄22岁，18岁，25岁。
				SELECT * FROM student WHERE age = 22 OR age = 18 OR age = 25;
				SELECT * FROM student WHERE age IN (22,18,25);
				-- 查询英语成绩为null。
				SELECT * FROM student WHERE english = NULL; -- 不对的。null值不能使用=/!=判断。
				SELECT * FROM student WHERE english IS NULL;
				-- 查询英语成绩不为null。
				SELECT * FROM student WHERE english  IS NOT NULL;
				-- 查询姓马的人。
				SELECT * FROM student WHERE NAME LIKE '马%';
				-- 查询姓名第二个字是化的人。
				SELECT * FROM student WHERE NAME LIKE "_化%";
				-- 查询姓名是3个字的人。
				SELECT * FROM student WHERE NAME LIKE '___';
				-- 查询姓名中包含德的人
				SELECT * FROM student WHERE NAME LIKE '%德%';
	    4. 排序查询：
	        1. 语法：order by 子句;
	            * order by 排序字段1 排序方式1, 排序字段2 排序方式2,..., 排序字段n 排序方式n;
	        2. 排序方式：
	            1. ASC：升序，默认的。
	            2. DESC：降序。
	        * 注意：
	            * 如果有多个排序条件，则当前边的条件值一样时，后一个判断条件才会去作用。
	    5. 聚合函数：将一列数据作为一个整体进行纵向的计算。
	        1. count：计算个数。
	            1. 一般选择非空的列：主键。
	            2. count(*)。
	        2. max：计算最大值。
	        3. min：计算最小值。
	        4. sum：计算和。
	        5. avg：计算平均值。
	        * 注意：聚合函数的计算，会自动排除null值。
	            解决方案：
	                1. 选择不包含非空的列进行计算。
	                2. 用IFNULL函数来替换null值。
	   6. 分组查询:
	        1. 语法：group by 分组字段;
	        2. 注意：
	            1. 分组之后查询的字段：分组字段、聚合函数。
	            	* SELECT sex, AVG(math) FROM student GROUP BY sex;
	            2. where和having 的区别：
	                1. where在分组之前进行限定，如果不满足条件，则不参与分组；having在分组之后进行限定，			如果不满足条件，则不会被查询出来。
	                2. where后不可以跟聚合函数，having可以进行聚合函数的判断。
			3. 代码案例：
	            -- 按照性别分组。分别查询男、女同学的平均分。
	            SELECT sex, AVG(math) FROM student GROUP BY sex;
	            -- 按照性别分组。分别查询男、女同学的平均分、人数。
	            SELECT sex, AVG(math) , COUNT(id) FROM student GROUP BY sex;
	            --  按照性别分组。分别查询男、女同学的平均分、人数。要求：分数低于70分的人，不参与分组。
	            SELECT sex, AVG(math) , COUNT(id) FROM student WHERE math > 70 GROUP BY sex;
	            --  按照性别分组。分别查询男、女同学的平均分、人数。要求：分数低于70分的人，不参与分组,分组			 之后。人数要大于2个人。
	            SELECT sex, AVG(math) , COUNT(id) FROM student WHERE math > 70 GROUP BY sex 			HAVING COUNT(id) > 2;
	            SELECT sex, AVG(math) , COUNT(id) 人数 FROM student WHERE math > 70 GROUP BY 				sex HAVING 人数 > 2;
		7. 分页查询:
			1. 语法：limit 开始的索引, 每页查询的条数;
			2. 公式：开始的索引 = （当前的页码 - 1） * 每页显示的条数。
				-- 每页显示3条记录 
	            SELECT * FROM student LIMIT 0, 3; -- 第1页
	            SELECT * FROM student LIMIT 3, 3; -- 第2页
	            SELECT * FROM student LIMIT 6, 3; -- 第3页
	        3. limit是一个MySQL的"方言"。
