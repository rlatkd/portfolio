FROM   mysql:8.0

ENV    MYSQL_ROOT_PASSWORD=1234
ENV    MYSQL_DATABASE=blog
ENV    MYSQL_USER=rlatkd
ENV    MYSQL_PASSWORD=1234

COPY   ./init.sql /docker-entrypoint-initdb.d/

CMD    ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci", "--skip-character-set-client-handshake"]