@ECHO OFF
md D:\MongoDB\backup\%date:~0,4%-%date:~5,2%-%date:~8,2%
cd D:\MongoDB\Server\bin
mongodump -h 127.0.0.1:27017 -d ivqBlog -o 'D:\MongoDB\backup\%date:~0,4%-%date:~5,2%-%date:~8,2%'