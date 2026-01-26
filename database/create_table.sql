CREATE TABLE IF NOT EXIST user_table (
    user_id int PRIMARY KEY AUTO_INCREMENT,
    discord_id varchar(100),
    cookie text,
    game_id int,
    game_role_id varchar(100),
    nickname varchar(255),
    region varchar(30)
)

CREATE TABLE IF NOT EXIST task_table (
    id int PRIMARY KEY AUTO_INCREMENT,
    user_id FOREIGN KEY REFERENCES user_db(user_id), 
    task_type varchar(100),
    schedule datetime
)