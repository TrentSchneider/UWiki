-- Seed for users table (needs to be entered first to line up with wikis table seed)
INSERT INTO users (name, email, password) VALUES ("Bob", "bob@email.com", "asdf");

-- Seed for wikis table (needs to be entered second to line up with users table seed)
INSERT INTO wikis (category, title, description, userID) VALUES ("Code", "Java Script", "(test data) as;ldkfasdlkfsa;f a;sdlkjas;dlkfjs a;dslfjasd;lfkjasd sal;kdfjas;lkdjfa", 1);
