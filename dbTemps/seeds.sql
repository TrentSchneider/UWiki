-- Seed for wikis table (needs to be entered first to line up with users table seed below)
INSERT INTO wikis (category, title, description, userID) VALUES ('Code', "Java Script", "Basic overview of Java Script", "as;ldkfasdlkfsa;f a;sdlkjas;dlkfjs a;dslfjasd;lfkjasd sal;kdfjas;lkdjfa", 1);

-- Seed for users table (needs to be entered first to line up with wikis table seed above)
INSERT INTO users (name, email, password) VALUES ("Bob", "bob@email.com", "asdf");