<?php

namespace IDoc\Console\Commands;

use Illuminate\Console\Command;
use PDO;
use PDOException;

class DatabaseCreateCommand extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:create {database?} {--F|force}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create new database and over the old';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $database = $this->argument('database', env('DB_DATABASE'));
        $force    = $this->option('force');
        if (!$database) {
            $this->info('No database is set');
            return;
        }
        if (in_array($database, $this->systemDatabase())) {
            $this->error("$database is a system database of mysqldb.");
            $this->line("\tList of system database: ");
            foreach ($this->systemDatabase() as $val) {
                $this->line("\t\t$val");
            }
            return;
        }

        try {
            $pdo = $this->getPDOConnection(
                env('DB_HOST'), env('DB_PORT'), env('DB_USERNAME'), env('DB_PASSWORD')
            );
            if (!empty($this->getDatabase($database))) {
                $this->line("$database is exist...");
                if ($force) {
                    $this->line("Drop $database with option force ...");
                    $pdo->exec("DROP DATABASE $database");
                }
                else {
                    if ($this->confirm("$database is already exist. Do you want to re-create this?")) {
                        $this->line("Drop $database..");
                        $pdo->exec("DROP DATABASE $database");
                    }
                    else {
                        $this->line("Cancel re-create database $database");
                        return;
                    }
                }
            }
            $this->line("Creating $database...");
            $pdo->exec(sprintf(
                    'CREATE DATABASE IF NOT EXISTS %s CHARACTER SET %s COLLATE %s;', $database,
                    env('DB_CHARSET', 'utf8'), env('DB_COLLATION', 'utf8_general_ci')
            ));

            $this->info(sprintf('Successfully created %s database', $database));
        }
        catch (PDOException $exception) {
            $this->error(sprintf('Failed to create %s database, %s', $database, $exception->getMessage()));
        }
    }

    /**
     * @param  string $host
     * @param  integer $port
     * @param  string $username
     * @param  string $password
     * @return PDO
     */
    private function getPDOConnection($host, $port, $username, $password)
    {
        return new PDO(sprintf('mysql:host=%s;port=%d;', $host, $port), $username, $password);
    }

    private function getDatabase($database)
    {
        try {
            $pdo = $this->getPDOConnection(
                env('DB_HOST'), env('DB_PORT'), env('DB_USERNAME'), env('DB_PASSWORD')
            );
            return $pdo->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$database'");
        }
        catch (PDOException $exception) {
            $this->error(sprintf('Failed to create %s database, %s', $database, $exception->getMessage()));
        }
    }

    /**
     * List all system database of mysql
     * @return []
     */
    private function systemDatabase()
    {
        return [
            'information_schema',
            'mysql',
            'performance_schema',
            'phpmyadmin',
            'test',
        ];
    }

}
