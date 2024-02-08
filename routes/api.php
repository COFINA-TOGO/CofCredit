<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\TypeOfApplicantController;
use App\Http\Controllers\TypeOfCreditController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('auth/login', [AuthController::class, "login"])->name("auth.login");
Route::prefix("/auth")->name("auth.")->middleware('auth:sanctum')->group(function () {
    Route::get('show', [AuthController::class, "show"])->name("show");
    Route::delete('logout', [AuthController::class, "logout"])->name("logout");
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix("user")->name("user.")->group(function () {
        Route::get("/", [UserController::class, "index"])->name("index");
        Route::get("/{id}", [UserController::class, "show"])->name("show");
        Route::post("/", [UserController::class, "store"])->name("store");
        Route::put("/update-password", [UserController::class, "update_password"])->name("update-password");
        Route::put("/{id}", [UserController::class, "update"])->name("update");
        Route::delete("/{id}", [UserController::class, "destroy"])->name("destroy");
    });
    Route::prefix("type-of-applicant")->name("type-of-applicant.")->group(function () {
        Route::get("/", [TypeOfApplicantController::class, "index"])->name("index");
        Route::get("/{id}", [TypeOfApplicantController::class, "show"])->name("show");
        Route::post("/", [TypeOfApplicantController::class, "store"])->name("store");
        Route::put("/{id}", [TypeOfApplicantController::class, "update"])->name("update");
        Route::delete("/{id}", [TypeOfApplicantController::class, "destroy"])->name("destroy");
    });
    Route::prefix("type-of-credit")->name("type-of-credit.")->group(function () {
        Route::get("/", [TypeOfCreditController::class, "index"])->name("index");
        Route::get("/{id}", [TypeOfCreditController::class, "show"])->name("show");
        Route::post("/", [TypeOfCreditController::class, "store"])->name("store");
        Route::put("/{id}", [TypeOfCreditController::class, "update"])->name("update");
        Route::delete("/{id}", [TypeOfCreditController::class, "destroy"])->name("destroy");
    });
});
