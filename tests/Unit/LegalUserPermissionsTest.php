<?php

namespace Tests\Unit;

use App\Models\User;
use PHPUnit\Framework\TestCase;

class LegalUserPermissionsTest extends TestCase
{
	public function test_legal_profile_can_access_guarantee_and_guarantor_exports(): void
	{
		$user = new User();
		$user->profile = 'legal';

		$rules = $user->ability_rules;

		$this->assertTrue($this->hasRule($rules, 'guarantee-list', 'read'));
		$this->assertTrue($this->hasRule($rules, 'guarantee', 'download'));
		$this->assertTrue($this->hasRule($rules, 'guarantor-list', 'read'));
		$this->assertTrue($this->hasRule($rules, 'guarantor', 'download'));
	}

	private function hasRule(array $rules, string $subject, string $action): bool
	{
		foreach ($rules as $rule) {
			if (in_array($subject, $rule['subject'], true) && in_array($action, $rule['action'], true)) {
				return true;
			}
		}

		return false;
	}
}
