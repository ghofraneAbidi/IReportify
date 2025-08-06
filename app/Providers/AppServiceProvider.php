<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\SqlServerRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Enregistrement du Repository SQL Server
        $this->app->singleton(SqlServerRepository::class, function ($app) {
            return new SqlServerRepository();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}

