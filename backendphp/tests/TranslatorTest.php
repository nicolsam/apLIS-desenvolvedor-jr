<?php

require_once __DIR__ . '/../src/Translator.php';

class TranslatorTest extends PHPUnit\Framework\TestCase
{
    public function testGetLanguageWithPortugueseHeader(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'pt-BR,pt;q=0.9';
        $lang = Translator::getLanguage();
        $this->assertEquals('pt-BR', $lang);
        unset($_SERVER['HTTP_ACCEPT_LANGUAGE']);
    }

    public function testGetLanguageWithEnglishHeader(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'en-EN,en;q=0.9';
        $lang = Translator::getLanguage();
        $this->assertEquals('en-EN', $lang);
        unset($_SERVER['HTTP_ACCEPT_LANGUAGE']);
    }

    public function testGetLanguageWithEmptyHeader(): void
    {
        unset($_SERVER['HTTP_ACCEPT_LANGUAGE']);
        $lang = Translator::getLanguage();
        $this->assertEquals('pt-BR', $lang);
    }

    public function testGetWithPortugueseTranslation(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'pt-BR';
        $result = Translator::get('invalid_data');
        $this->assertEquals('Dados inválidos', $result);
        unset($_SERVER['HTTP_ACCEPT_LANGUAGE']);
    }

    public function testGetWithEnglishTranslation(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'en-EN';
        $result = Translator::get('invalid_data');
        $this->assertEquals('Invalid data', $result);
        unset($_SERVER['HTTP_ACCEPT_LANGUAGE']);
    }

    public function testGetReturnsKeyForUnknownTranslation(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'pt-BR';
        $result = Translator::get('unknown_key');
        $this->assertEquals('unknown_key', $result);
        unset($_SERVER['HTTP_ACCEPT_LANGUAGE']);
    }

    public function testAllRequiredKeysExistInPortuguese(): void
    {
        $reflection = new ReflectionClass(Translator::class);
        $property = $reflection->getProperty('translations');
        $property->setAccessible(true);
        $data = $property->getValue();
        
        $this->assertArrayHasKey('invalid_data', $data['pt-BR']);
        $this->assertArrayHasKey('doctor_created', $data['pt-BR']);
        $this->assertArrayHasKey('crm_exists', $data['pt-BR']);
        $this->assertArrayHasKey('not_found', $data['pt-BR']);
    }

    public function testAllRequiredKeysExistInEnglish(): void
    {
        $reflection = new ReflectionClass(Translator::class);
        $property = $reflection->getProperty('translations');
        $property->setAccessible(true);
        $data = $property->getValue();
        
        $this->assertArrayHasKey('invalid_data', $data['en-EN']);
        $this->assertArrayHasKey('doctor_created', $data['en-EN']);
        $this->assertArrayHasKey('crm_exists', $data['en-EN']);
        $this->assertArrayHasKey('not_found', $data['en-EN']);
    }
}