<?php

namespace App\Http\Traits;

use Illuminate\Support\Facades\Response as FunctionType;

trait CustomResponseTrait
{

    public function responseOk($data = [], $messages = [], $status = 200)
    {
        return FunctionType::json(
            [
                "status" => $status,
                "data" => $data,
                "messages" => $messages,
            ],
        );
    }
    public function responseOkPaginate($data = [], $messages = [], $status = 200)
    {
        return FunctionType::json(
            array_merge(["status" => $status, "messages" => $messages], $data),
        );
    }
    public function responseError($errors, int $status = 400)
    {
        return FunctionType::json(
            [
                "status" => $status,
                "errors" => $errors,
            ],
            200,
        );
    }
}
