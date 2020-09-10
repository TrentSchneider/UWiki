-- Seed for users table (needs to be entered first to line up with wikis table seed)
-- password is hashed, need to use "asdf" as the password
INSERT INTO users (email, password) VALUES ("bob@email.com", "$2a$10$yhraAi/Nsa0Fc2KrRminueXY0sn33yot2bwtPbwtryzC5/s/xkOsS");

-- Seed for wikis table (needs to be entered second to line up with users table seed)
INSERT INTO wikis (category, title, description, userID) VALUES ("Code", "Java Script", "(test data) as;ldkfasdlkfsa;f a;sdlkjas;dlkfjs a;dslfjasd;lfkjasd sal;kdfjas;lkdjfa", 1);
