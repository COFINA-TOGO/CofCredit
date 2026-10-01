<h1 style="color: #333333; font-size: 24px; margin-bottom: 20px;">{{ $greeting }}</h1>

@foreach ($paragraphs as $paragraph)
<p style="color: #666666; font-size: 16px; line-height: 1.5;">{{ $paragraph }}</p>
@endforeach

@if ($linkUrl)
<p style="color: #666666; font-size: 16px; line-height: 1.5;"><a href="{{ $linkUrl }}">{{ $linkLabel }}</a></p>
@endif

<p style="color: #666666; font-size: 16px; line-height: 1.5;">Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>

<hr style="border: none; border-top: 1px solid #dddddd; margin: 20px 0;">

<p style="color: #999999; font-size: 12px;">Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.</p>
