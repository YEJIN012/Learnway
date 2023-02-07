SELECT * FROM learnway.tb_language;


ALTER TABLE `tb_language` AUTO_INCREMENT=1;

insert into tb_language (`language_name`) values ('Korean');
insert into tb_language (`language_name`) values ('English');
insert into tb_language (`language_name`) values ('Japanese');
insert into tb_language (`language_name`) values ('Chinese');
insert into tb_language (`language_name`) values ('Spanish');
insert into tb_language (`language_name`) values ('French');
insert into tb_language (`language_name`) values ('Vietnamese');
insert into tb_language (`language_name`) values ('Thai');
insert into tb_language (`language_name`) values ('Indonesian');
insert into tb_language (`language_name`) values ('Russian');
insert into tb_language (`language_name`) values ('German');
insert into tb_language (`language_name`) values ('Italian');


update tb_language set `language_code`='ko' where language_id=1;
update tb_language set `language_code`='en' where language_id=2;
update tb_language set `language_code`='ja' where language_id=3;
update tb_language set `language_code`='zh-CH' where language_id=4;
update tb_language set `language_code`='es' where language_id=5;
update tb_language set `language_code`='fr' where language_id=6;
update tb_language set `language_code`='vi' where language_id=7;
update tb_language set `language_code`='th' where language_id=8;
update tb_language set `language_code`='id' where language_id=9;
update tb_language set `language_code`='ru' where language_id=10;
update tb_language set `language_code`='de' where language_id=11;
update tb_language set `language_code`='it' where language_id=12;