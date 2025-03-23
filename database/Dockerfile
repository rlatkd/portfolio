FROM    mongo:7.0
ENV     MONGO_INITDB_DATABASE=blogdb
COPY    ./mongo-initializer.js /docker-entrypoint-initdb.d/
VOLUME  ['/data/db']
EXPOSE  27017