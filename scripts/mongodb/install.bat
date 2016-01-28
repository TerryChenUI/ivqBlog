D:
mkdir "D:\MongoDB"
mkdir "D:\MongoDB\db"
mkdir "D:\MongoDB\logs"
cd D:\MongoDB\bin
mongod --dbpath "D:\MongoDB\db" --logpath "D:\MongoDB\logs\MongoDB.log" --install