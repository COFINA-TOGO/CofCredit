<?php

namespace Tests\Feature;

use App\Http\Controllers\Controller;
use App\Jobs\SendEmail;
use App\Models\User;
use Illuminate\Support\Facades\Bus;
use Tests\TestCase;

class NotifyByEmailTest extends TestCase
{
	public function test_email_content_is_escaped_and_sent_to_each_receiver(): void
	{
		Bus::fake();
		config(["app.url" => "https://credit.example.test"]);

		$user = new User();
		$user->email = "head@example.test";

		(new Controller)->notifyByEmail(
			[$user, "admin@example.test", null],
			"Contrat rejeté",
			"Cher(e) Admin Crédit,",
			["Motif : <script>alert(1)</script>"],
			"/contract",
			"Consulter les contrats"
		);

		Bus::assertDispatchedTimes(SendEmail::class, 2);
		Bus::assertDispatched(SendEmail::class, function (SendEmail $job) {
			$content = $this->property($job, "content");

			return in_array($this->property($job, "receiverEmail"), ["head@example.test", "admin@example.test"])
				&& str_contains($content, "&lt;script&gt;alert(1)&lt;/script&gt;")
				&& !str_contains($content, "<script>")
				&& str_contains($content, 'href="https://credit.example.test/contract"');
		});
	}

	private function property(object $object, string $name)
	{
		$property = new \ReflectionProperty($object, $name);
		$property->setAccessible(true);

		return $property->getValue($object);
	}
}
