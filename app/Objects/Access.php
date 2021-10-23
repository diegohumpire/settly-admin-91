<?php

namespace App\Objects;

use Illuminate\Support\Arr;

class Access 
{
    private array $properties = [];

    public function __construct(array $properties = [])
    {
        $this->properties = $properties;
    }

    public function __get(string $property)
    {
        return Arr::get($this->properties, $property, null);
    }
}