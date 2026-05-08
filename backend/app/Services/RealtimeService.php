<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RealtimeService
{
    private string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = env('REALTIME_SERVER_URL', 'http://localhost:3000');
    }

    public function broadcast(string $event, mixed $data): void
    {
        try {
            Http::post("{$this->baseUrl}/broadcast", [
                'event' => $event,
                'data' => $data,
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to broadcast realtime event: {$e->getMessage()}");
        }
    }
}
