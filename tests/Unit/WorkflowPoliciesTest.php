<?php

namespace Tests\Unit;

use App\Models\CAT;
use App\Models\Contract;
use App\Models\Notification;
use App\Models\User;
use App\Models\VerbalTrial;
use App\Policies\CATPolicy;
use App\Policies\ContractPolicy;
use App\Policies\NotificationPolicy;
use App\Policies\VerbalTrialPolicy;
use PHPUnit\Framework\TestCase;

class WorkflowPoliciesTest extends TestCase
{
	public function test_only_creator_credit_admin_can_admin_validate_contract(): void
	{
		$contract = new Contract();
		$contract->creator_id = 10;

		$this->assertTrue((new ContractPolicy)->admin_validate($this->user('credit_admin', 10), $contract)->allowed());
		$this->assertFalse((new ContractPolicy)->admin_validate($this->user('credit_admin', 11), $contract)->allowed());
		$this->assertFalse((new ContractPolicy)->admin_validate($this->user('head_credit', 12), $contract)->allowed());
	}

	public function test_only_head_credit_can_head_validate_contract(): void
	{
		$contract = new Contract();
		$contract->creator_id = 10;

		$this->assertTrue((new ContractPolicy)->head_validate($this->user('head_credit'), $contract)->allowed());
		$this->assertFalse((new ContractPolicy)->head_validate($this->user('credit_admin', 10), $contract)->allowed());
	}

	public function test_cat_cannot_be_unblocked_before_validation(): void
	{
		$operation = $this->user('operation');

		$this->assertFalse((new CATPolicy)->unblock($operation, $this->cat('waiting', 'waiting'))->allowed());
		$this->assertFalse((new CATPolicy)->unblock($operation, $this->cat('rejected', 'waiting'))->allowed());
		$this->assertFalse((new CATPolicy)->unblock($operation, $this->cat('validated', 'validated'))->allowed());
		$this->assertTrue((new CATPolicy)->unblock($operation, $this->cat('validated', 'waiting'))->allowed());
	}

	public function test_cat_can_only_be_validated_while_waiting(): void
	{
		$headCredit = $this->user('head_credit');

		$this->assertTrue((new CATPolicy)->validate($headCredit, $this->cat('waiting', 'waiting'))->allowed());
		$this->assertFalse((new CATPolicy)->validate($headCredit, $this->cat('validated', 'waiting'))->allowed());
		$this->assertFalse((new CATPolicy)->reject_validation($headCredit, $this->cat('validated', 'waiting'))->allowed());
	}

	public function test_document_download_is_restricted_to_profiles_working_on_the_file(): void
	{
		$courier = $this->user('courier');

		$this->assertFalse((new ContractPolicy)->downloadDocument($courier, new Contract())->allowed());
		$this->assertFalse((new VerbalTrialPolicy)->downloadDocument($courier, new VerbalTrial())->allowed());
		$this->assertFalse((new CATPolicy)->downloadDocument($courier, new CAT())->allowed());

		// Le CAF télécharge les notifications sans avoir le droit "read" dessus
		$this->assertTrue((new NotificationPolicy)->downloadDocument($this->user('caf'), new Notification())->allowed());
		$this->assertTrue((new ContractPolicy)->downloadDocument($this->user('credit_admin'), new Contract())->allowed());
		$this->assertTrue((new CATPolicy)->downloadDocument($this->user('operation'), new CAT())->allowed());
	}

	private function user(string $profile, int $id = 1): User
	{
		$user = new User();
		$user->id = $id;
		$user->profile = $profile;

		return $user;
	}

	private function cat(string $validationStatus, string $unblockStatus): CAT
	{
		$cat = new CAT();
		$cat->validation_status = $validationStatus;
		$cat->unblock_status = $unblockStatus;

		return $cat;
	}
}
