<?php

use Illuminate\Database\Seeder;

class CommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('comments')->truncate();

        factory(App\Comment::class, 100)->create();
        $this->command->info("Comment table seeded");
    }
}
