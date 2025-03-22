FROM mongo:7.0

# 환경 변수 설정
ENV MONGO_INITDB_DATABASE=blogdb

# 초기화 스크립트 복사
COPY ./init.js /docker-entrypoint-initdb.d/

# 볼륨 설정
VOLUME ["/data/db"]

# 27017 포트 노출
EXPOSE 27017