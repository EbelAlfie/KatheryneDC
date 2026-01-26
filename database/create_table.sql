CREATE TABLE IF NOT EXISTS user_table (
    user_id int PRIMARY KEY AUTO_INCREMENT,
    discord_id varchar(100) UNIQUE NOT NULL,
    cookie text NOT NULL,
    game_id int NOT NULL,
    game_role_id varchar(100) NOT NULL,
    nickname varchar(255) NOT NULL,
    region varchar(30) NOT NULL
)

CREATE TABLE IF NOT EXISTS task_table (
    id int PRIMARY KEY AUTO_INCREMENT,
    user_id int NOT NULL,
    task_type varchar(100) NOT NULL,
    schedule datetime NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_table(user_id)
);