<?php

namespace IDoc\Console\Commands;

use Illuminate\Console\Command;

class TruncateDatabaseCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:truncate {database?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Drops all tables of specific or all connections';

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
        //
        $database = $this->argument('database' , env('DB_DATABASE'));
        
        if($database == "all" || empty($database)) {
            $databases = array(env('DB_CONNECTION'));
        }
        else{
            $databases = array($database);
        }
        foreach ($databases as $databasetoempty) {
            $pdo = \DB::connection($databasetoempty)->getPdo();
    
            $tables = $pdo
                ->query("SHOW FULL TABLES;")
                ->fetchAll();
    
            $sql = 'SET FOREIGN_KEY_CHECKS=0;';
    
            foreach ($tables as $tableInfo) {
                // truncate tables only
                if ('BASE TABLE' !== $tableInfo[1])
                    continue;
        
                $name = $tableInfo[0];
                $sql .= 'DROP TABLE ' . $name . ';';
                $this->info('Dropping table ' . $name);
            }
    
            $sql .= 'SET FOREIGN_KEY_CHECKS=1;';
    
            $pdo->exec($sql);
        }
    }
    
    protected function getArguments()
    {
        return [
            ['database', InputArgument::OPTIONAL, 'Database to be drop all table.', null],
        ];
    }
}
