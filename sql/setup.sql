DROP TABLE IF EXISTS `character`;
DROP TABLE IF EXISTS player;
DROP TABLE IF EXISTS campaign_settings;
DROP TABLE IF EXISTS campaign;
CREATE TABLE campaign ( id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(255) NOT NULL);
CREATE TABLE campaign_settings (id INT PRIMARY KEY AUTO_INCREMENT,campaign_id INT,FOREIGN KEY (campaign_id) REFERENCES campaign(id) ON DELETE CASCADE);
CREATE TABLE player (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, pronouns VARCHAR(255), triggers TEXT, notes TEXT);
CREATE TABLE `character` (id INT PRIMARY KEY AUTO_INCREMENT, character_name VARCHAR(255), senses TEXT, armor_class INT, passive_stealth INT, passive_perception INT, passive_investigation INT, inititive INT, background_feature TEXT, background_notes TEXT, notes TEXT, player_id INT, FOREIGN KEY (player_id) REFERENCES player(id) ON DELETE CASCADE);
