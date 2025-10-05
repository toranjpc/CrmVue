<?php

namespace Modules;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;

class ModuleServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $modulesPath = base_path('modules');
        if (!File::exists($modulesPath)) return;

        foreach (File::directories($modulesPath) as $moduleDir) {
            $providersDir = $moduleDir . '/Providers';
            if (!File::exists($providersDir)) continue;
            foreach (File::files($providersDir) as $providerFile) {
                $className = pathinfo($providerFile, PATHINFO_FILENAME);
                $namespace = 'Modules\\' . basename($moduleDir) . '\\Providers\\' . $className;

                if (class_exists($namespace)) {
                    $this->app->register($namespace);
                }
            }
        }


        require_once __DIR__ . '/helpers.php';
    }

    public function boot(): void
    {


        Schema::defaultStringLength(191);
    }
}
