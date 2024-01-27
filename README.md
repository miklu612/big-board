# Big Board

Big Board is a simple message board project made with Next.js. It is capable of
creating new posts and showing them to an user.

It is not advisable to run this in a public environment, since there is quite a
lot of security issues with it and there won't be any maintaining of it.


## Big Board Database

Big Board uses MariaDB for its post storing stuff. Right now you have to
manually create the server yourself, but in the future I will be making it so
you can just run a script to create it.

Big Board assumes that you have a Database called `big_board` with a table in
it called `posts` that contains the following definition.

```
MariaDB [big_board]> describe posts;
+---------+-----------+------+-----+---------+-------+
| Field   | Type      | Null | Key | Default | Extra |
+---------+-----------+------+-----+---------+-------+
| id      | int(11)   | YES  |     | NULL    |       |
| title   | char(255) | YES  |     | NULL    |       |
| content | text      | YES  |     | NULL    |       |
+---------+-----------+------+-----+---------+-------+
```

The username must be `bigboard` and its password be `password123`. These will
be changed in the future, but during development they will be hardcoded. This
user must have all privilidges (cybersecurity be damned).

