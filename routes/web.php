<?php

use App\Http\Controllers\NotesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', [NotesController::class, 'index'])->middleware(['auth', 'verified'])->name('mainPage');

Route::get('/create', [NotesController::class, 'create'])->middleware(['auth', 'verified'])->name('createPage');
Route::post('/create', [NotesController::class, 'store'])->middleware(['auth', 'verified'])->name('createPageStore');

Route::get('/update/{id}', [NotesController::class, 'update'])->middleware(['auth', 'verified'])->name('updatePage');
Route::put('/update/{id}', [NotesController::class, 'updateStore'])->middleware(['auth', 'verified'])->name('updatePageStore');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
