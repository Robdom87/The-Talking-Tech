INSERT INTO user( username, password ) VALUES
("BigJohn26", "1234"),
("SteveJoe", "unodos34"),
("DownUnder", "12threefour");


INSERT INTO post( title, content, user_id , created_at, updated_at) VALUES
("Lil John", "Where is lil john... I miss him.", 1, "2022-10-5 12:40:59", "2022-10-5 12:40:59"),
("Update", "found him!", 1, "2022-10-5 13:40:59", "2022-10-5 13:40:59" ),
("Apple", "I made it." , 2 ,"2022-10-5 14:40:59", "2022-10-5 14:40:59"),
("Crikey", "Mate", 3 ,"2022-10-5 15:40:59", "2022-10-5 15:40:59"); 

INSERT INTO comment( comment, user_id, post_id , created_at, updated_at) VALUES
("I gotchu.", 2, 1, "2022-10-5 12:50:59", "2022-10-5 12:50:59"),
("Hope you find him mate.", 3, 1, "2022-10-5 13:00:59", "2022-10-5 13:00:59"),
("nice!", 1 , 2 , "2022-10-5 14:00:59", "2022-10-5 14:00:59");




