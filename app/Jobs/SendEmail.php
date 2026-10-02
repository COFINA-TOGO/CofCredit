<?php

namespace App\Jobs;

use App\Mail\EmailSkeleton;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class SendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $receiverEmail;
    protected $subject;
    protected $content;

    /**
     * Create a new job instance.
     */
    public function __construct(string $receiverEmail, string $subject, string $content)
    {
        $this->receiverEmail = $receiverEmail;
        $this->subject = $subject;
        $this->content = $content;
    }

    /**
     * Le nombre de tentatives d'envoi
     */
    public $tries = 3;

    /**
     * Le délai (en secondes) entre deux tentatives
     */
    public $backoff = 5;

    /**
     * Execute the job.
     *
     * Le job est lancé après la réponse HTTP (dispatchAfterResponse), sans worker :
     * les tentatives se font donc ici, et un échec définitif est journalisé.
     */
    public function handle(): void
    {
        for ($attempt = 1; ; $attempt++) {
            try {
                Mail::to($this->receiverEmail)->send(
                    new EmailSkeleton(
                        $this->subject,
                        $this->content
                    )
                );
                return;
            } catch (Throwable $exception) {
                if ($attempt >= $this->tries) {
                    Log::error("Échec de l'envoi du mail « {$this->subject} » à {$this->receiverEmail}", ["exception" => $exception]);
                    return;
                }
                sleep($this->backoff);
            }
        }
    }
}
