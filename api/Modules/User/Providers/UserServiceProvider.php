<?php

namespace Modules\User\Providers;

use Illuminate\Support\ServiceProvider;

class UserServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadRoutesFrom(base_path('modules') . '/User/routes.php');
        $this->loadMigrationsFrom(base_path('modules') . '/User/Database/migrations');
        $this->loadFactoriesFrom(base_path('modules') . '/User/Database/factories');
    }

    public function register(): void
    {
        //
    }
}
