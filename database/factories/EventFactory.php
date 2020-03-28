<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Event;
use Faker\Generator as Faker;

$factory->define(Event::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence(5),
        'description' => $faker->paragraph(),
        'cover' => '',
        'address' => $faker->address(),
        'contact' => $faker->phoneNumber(),
        'time' => $faker->dateTime()
    ];
});
