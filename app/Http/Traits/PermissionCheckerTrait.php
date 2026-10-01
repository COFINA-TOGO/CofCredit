<?php
namespace App\Http\Traits;

trait PermissionCheckerTrait
{
    public function check($actions, $subject, $connectedUser)
    {
        foreach ($connectedUser->ability_rules as $rules) {
            if (in_array($subject, $rules["subject"]) || in_array("all", $rules["subject"])) {
                if (in_array("manage", $rules["action"])) {
                    return true;
                }
                foreach ($actions as $action) {
                    if (in_array($action, $rules["action"]))
                        return true;
                }
            }
        }
        return false;
    }

    public function checkAny($actions, array $subjects, $connectedUser)
    {
        foreach ($subjects as $subject) {
            if ($this->check($actions, $subject, $connectedUser)) {
                return true;
            }
        }
        return false;
    }
}
