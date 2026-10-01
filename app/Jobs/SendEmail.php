<?php

namespace App\Jobs;

use App\Mail\EmailSkeleton;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

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
     * Le nombre de tentatives avant de marquer le job en échec (table failed_jobs)
     */
    public $tries = 3;

    /**
     * Le délai (en secondes) entre deux tentatives
     */
    public $backoff = 60;

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Une exception remonte au worker : le job est relancé puis enregistré dans failed_jobs
        Mail::to($this->receiverEmail)->send(
            new EmailSkeleton(
                $this->subject,
                $this->content
            )
        );
    }
}
