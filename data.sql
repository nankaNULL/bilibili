#设置客户端语言
SET NAMES UTF8;
#放弃数据库(如果存在)tedu
DROP DATABASE IF EXISTS bilibili;
#创建数据库bilibili
CREATE DATABASE bilibili CHARSET=UTF8;
#1:进入库中
USE bilibili;
#2:创建表
CREATE TABLE bilibili_video(
 vid    INT PRIMARY KEY AUTO_INCREMENT, 
 title VARCHAR(255),
 img_url VARCHAR(255),
 vtime DATETIME,
 uid INT,
 contribute_time date,
 play_num int(255),
 collect_num int(255),
 type int
);
#:推荐 type1
INSERT INTO bilibili_video VALUES(null,'【漫画屋】小学生惨遭怪物吞食！为寻求生路展开烧脑越狱！','http://localhost:3000/images/card1.jpg','00:04:33.000000',12,'2018-09-23',105000, 21000,1);
INSERT INTO bilibili_video VALUES(null,'【动画公司图鉴】宅久了看个船都眉清目秀的（三次元下）','http://localhost:3000/images/card2.jpg','00:04:33.000000',13,'2018-09-23',61000, 21000,1);
INSERT INTO bilibili_video VALUES(null,'自己画的好没人看，别人画的烂却被吹捧？如何推广自己的作品【抖抖村】','http://localhost:3000/images/card3.jpg','00:04:33.000000',14,'2018-09-23',68000, 21000,1);
INSERT INTO bilibili_video VALUES(null,'【漫画屋】小学生惨遭怪物吞食！为寻求生路展开烧脑越狱！','http://localhost:3000/images/card1.jpg','00:04:33.000000',12,'2018-09-23',105000, 21000,1);
INSERT INTO bilibili_video VALUES(null,'【动画公司图鉴】宅久了看个船都眉清目秀的（三次元下）','http://localhost:3000/images/card2.jpg','00:04:33.000000',13,'2018-09-23',61000, 21000,1);
INSERT INTO bilibili_video VALUES(null,'自己画的好没人看，别人画的烂却被吹捧？如何推广自己的作品【抖抖村】','http://localhost:3000/images/card3.jpg','00:04:33.000000',14,'2018-09-23',68000, 21000,1);

#:推广 type2
INSERT INTO bilibili_video VALUES(null,'【乐正绫原创曲】起航【星辉p】','http://localhost:3000/images/spread1.webp','00:04:26.000000',15,'2018-09-23',105000, 21000,2);
INSERT INTO bilibili_video VALUES(null,'和优酱一起来聊聊你最喜欢的漫画叭~','http://localhost:3000/images/spread2.webp','00:24:02.000000',16,'2018-09-23',105000, 21000,2);
INSERT INTO bilibili_video VALUES(null,'《历史那些事》主题曲MV《灯塔与星辰》','http://localhost:3000/images/spread3.webp','00:04:10.000000',17,'2018-09-23',105000, 21000,2);
INSERT INTO bilibili_video VALUES(null,'【小焦】少女时代-说出愿望吧(genie)12厘米死亡高跟！','http://localhost:3000/images/spread4.webp','00:06:50.000000',18,'2018-09-23',105000, 21000,2);

#:动画 type4
INSERT INTO bilibili_video VALUES(null,'何为营销号？用爱发电对UP主而言意味着什么？网络原创生态的窘迫现状及其成因【动话说#02】','http://localhost:3000/images/anime1.webp','00:34:29.000000',19,'2018-09-23',947000, 39000,4);
INSERT INTO bilibili_video VALUES(null,'【轰爆】有人告白了(～￣▽￣)～','http://localhost:3000/images/anime2.webp','00:01:55.000000',20,'2018-09-23',118000, 1737,4);
INSERT INTO bilibili_video VALUES(null,'#56 这次真的生气了！！','http://localhost:3000/images/anime3.webp','00:02:22.000000',21,'2018-09-23',36000, 268,4);
INSERT INTO bilibili_video VALUES(null,'【工作细胞】各细胞寿命长短比较','http://localhost:3000/images/anime4.webp','00:03:30.000000',22,'2018-09-23',200000, 1533,4);
INSERT INTO bilibili_video VALUES(null,'【魔道祖师】忘羡一曲远，曲终人不散。','http://localhost:3000/images/anime5.webp','00:05:09.000000',23,'2018-09-23',30000, 552,4);
INSERT INTO bilibili_video VALUES(null,'【泛式/单集MAD】海贼王：顶上战争篇——这个时代的名字叫白胡子！','http://localhost:3000/images/anime6.webp','00:04:15.000000',24,'2018-09-23',5561, 103,4);
INSERT INTO bilibili_video VALUES(null,'【乱入向】小埋乱入妹抖龙op】','http://localhost:3000/images/anime7.webp','00:01:31.000000',25,'2018-09-23',947000, 39000,4);
INSERT INTO bilibili_video VALUES(null,'【这可能式b站唯一一个灰太狼燃向mad/片尾正片/燃不起了炒饭香就完事了】我，炒饭灰太狼Here','http://localhost:3000/images/anime8.webp','00:01:56.000000',26,'2018-09-23',5816, 70,4);