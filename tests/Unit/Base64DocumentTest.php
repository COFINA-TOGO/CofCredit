<?php

namespace Tests\Unit;

use App\Http\Traits\ControllerHelperTrait;
use PHPUnit\Framework\TestCase;

class Base64DocumentTest extends TestCase
{
	use ControllerHelperTrait;

	private const PNG = "\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\rIDATx\x9cc\xf8\xff\xff?\x00\x05\xfe\x02\xfe\xa75\x81\x84\x00\x00\x00\x00IEND\xaeB`\x82";

	public function test_extension_comes_from_content_not_from_client_prefix(): void
	{
		$document = $this->decodeBase64Document("data:image/php;base64," . base64_encode(self::PNG));

		$this->assertSame("png", $document["extension"]);
		$this->assertSame(self::PNG, $document["data"]);
	}

	public function test_pdf_is_accepted(): void
	{
		$document = $this->decodeBase64Document("data:application/pdf;base64," . base64_encode("%PDF-1.4\n%test"));

		$this->assertSame("pdf", $document["extension"]);
	}

	public function test_php_script_is_rejected_even_with_image_prefix(): void
	{
		$this->assertNull($this->decodeBase64Document("data:image/png;base64," . base64_encode("<?php system(\$_GET['c']); ?>")));
	}

	public function test_invalid_payloads_are_rejected(): void
	{
		$this->assertNull($this->decodeBase64Document(null));
		$this->assertNull($this->decodeBase64Document("not a data uri"));
		$this->assertNull($this->decodeBase64Document("data:image/png;base64,@@@"));
		$this->assertNull($this->decodeBase64Document("data:image/png;base64," . base64_encode(self::PNG), maxSize: 10));
	}

	public function test_pdf_is_rejected_where_only_images_are_allowed(): void
	{
		$this->assertNull($this->decodeBase64Document("data:application/pdf;base64," . base64_encode("%PDF-1.4\n%test"), $this->imageMimeTypes()));
	}
}
