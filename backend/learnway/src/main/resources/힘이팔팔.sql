CREATE TABLE `tb_user` (
	`user_id`	INT	NOT NULL,
	`user_email`	VARCHAR(50)	NOT NULL,
	`user_pwd`	VARCHAR(50)	NOT NULL,
	`token`	VARCHAR(100)	NOT NULL,
	`name`	VARCHAR(30)	NOT NULL,
	`birthday`	DATE	NOT NULL,
	`language_id`	INT	NOT NULL,
	`bad_user`	TINYINT(1)	NULL,
	`register_time`	DATE	NOT NULL,
	`img_url`	VARCHAR(100)	NOT NULL,
	`bio`	VARCHAR(100)	NOT NULL
);

CREATE TABLE `tb_study` (
	`video_id`	INT	NOT NULL,
	`user_id`	INT	NOT NULL,
	`friend_id`	INT	NOT NULL,
	`script`	TEXT	NULL,
	`study_datetime`	DATETIME	NOT NULL
);

CREATE TABLE `tb_report` (
	`user_id`	INT	NOT NULL,
	`report_id`	INT	NOT NULL,
	`report_datetime`	DATETIME	NOT NULL
);

CREATE TABLE `tb_content` (
	`contents_id`	INT	NOT NULL,
	`contents`	TEXT	NOT NULL
);

CREATE TABLE `tb_friend` (
	`relation_id`	INT	NOT NULL,
	`user_id`	INT	NOT NULL,
	`friend_id`	INT	NOT NULL
);

CREATE TABLE `tb_interest` (
	`interest_id`	INT	NOT NULL,
	`interest_ field`	VARCHAR(50)	NOT NULL
);

CREATE TABLE `tb_language` (
	`language_id`	INT	NOT NULL,
	`language_name`	VARCHAR(50)	NOT NULL
);

CREATE TABLE `tb_user_interest` (
	`user_id`	INT	NOT NULL,
	`interest_id`	INT	NOT NULL
);

CREATE TABLE `tb_rpdetail` (
	`report_id`	INT	NOT NULL,
	`name`	VARCHAR(20)	NOT NULL
);

CREATE TABLE `tb_room` (
	`relation_id`	INT	NOT NULL,
	`last_sent`	DATETIME	NOT NULL,
	`last_msg`	VARCHAR(50)	NOT NULL
);

ALTER TABLE `tb_user` ADD CONSTRAINT `PK_TB_USER` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `tb_study` ADD CONSTRAINT `PK_TB_STUDY` PRIMARY KEY (
	`video_id`
);

ALTER TABLE `tb_report` ADD CONSTRAINT `PK_TB_REPORT` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `tb_content` ADD CONSTRAINT `PK_TB_CONTENT` PRIMARY KEY (
	`contents_id`
);

ALTER TABLE `tb_friend` ADD CONSTRAINT `PK_TB_FRIEND` PRIMARY KEY (
	`relation_id`
);

ALTER TABLE `tb_interest` ADD CONSTRAINT `PK_TB_INTEREST` PRIMARY KEY (
	`interest_id`
);

ALTER TABLE `tb_language` ADD CONSTRAINT `PK_TB_LANGUAGE` PRIMARY KEY (
	`language_id`
);

ALTER TABLE `tb_user_interest` ADD CONSTRAINT `PK_TB_USER_INTEREST` PRIMARY KEY (
	`user_id`,
	`interest_id`
);

ALTER TABLE `tb_rpdetail` ADD CONSTRAINT `PK_TB_RPDETAIL` PRIMARY KEY (
	`report_id`
);

ALTER TABLE `tb_room` ADD CONSTRAINT `PK_TB_ROOM` PRIMARY KEY (
	`relation_id`
);

ALTER TABLE `tb_report` ADD CONSTRAINT `FK_tb_user_TO_tb_report_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `tb_user` (
	`user_id`
);

ALTER TABLE `tb_user_interest` ADD CONSTRAINT `FK_tb_user_TO_tb_user_interest_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `tb_user` (
	`user_id`
);

ALTER TABLE `tb_user_interest` ADD CONSTRAINT `FK_tb_interest_TO_tb_user_interest_1` FOREIGN KEY (
	`interest_id`
)
REFERENCES `tb_interest` (
	`interest_id`
);

ALTER TABLE `tb_room` ADD CONSTRAINT `FK_tb_friend_TO_tb_room_1` FOREIGN KEY (
	`relation_id`
)
REFERENCES `tb_friend` (
	`relation_id`
);

