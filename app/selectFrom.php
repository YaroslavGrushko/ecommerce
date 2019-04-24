<?php
require '../vendor/autoload.php';
// I'm using SqliteConnection class to connect to Db and
// SQLiteCreateTable class to create new table
use App\SQLiteConnection as SQLiteConnection;
use App\SQLiteCreateTable as SQLiteCreateTable;
// connect to/create database
// and create new instance of SQLiteCreateTable class:
$sqlite = new SQLiteCreateTable( (new SQLiteConnection()) -> connect());
// create table and orders table where clients will paste theirs orders
$sqlite->createTables();
// get all $tables
$tables=$sqlite->getTableList();
// get content of podactsTbl
$content=$sqlite->getTableContent();
// pass $tables and $content to js
echo json_encode(array($tables,$content));
?>
