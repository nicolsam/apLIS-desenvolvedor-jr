<?php

require_once __DIR__ . '/../src/Translator.php';

class TranslatorTest
{
    public function testGetLanguageWithPortugueseHeader(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'pt-BR,pt;q=0.9';
        $lang = Translator::getLanguage();
        assert($lang === 'pt-BR', 'Should return pt-BR for Portuguese header');
        echo "✓ testGetLanguageWithPortugueseHeader\n";
    }

    public function testGetLanguageWithEnglishHeader(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'en-EN,en;q=0.9';
        $lang = Translator::getLanguage();
        assert($lang === 'en-EN', 'Should return en-EN for English header');
        echo "✓ testGetLanguageWithEnglishHeader\n";
    }

    public function testGetLanguageWithEmptyHeader(): void
    {
        unset($_SERVER['HTTP_ACCEPT_LANGUAGE']);
        $lang = Translator::getLanguage();
        assert($lang === 'pt-BR', 'Should default to pt-BR');
        echo "✓ testGetLanguageWithEmptyHeader\n";
    }

    public function testGetWithPortugueseTranslation(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'pt-BR';
        $result = Translator::get('invalid_data');
        assert($result === 'Dados inválidos', 'Should return Portuguese translation');
        echo "✓ testGetWithPortugueseTranslation\n";
    }

    public function testGetWithEnglishTranslation(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'en-EN';
        $result = Translator::get('invalid_data');
        assert($result === 'Invalid data', 'Should return English translation');
        echo "✓ testGetWithEnglishTranslation\n";
    }

    public function testGetReturnsKeyForUnknownTranslation(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'pt-BR';
        $result = Translator::get('unknown_key');
        assert($result === 'unknown_key', 'Should return key for unknown translation');
        echo "✓ testGetReturnsKeyForUnknownTranslation\n";
    }

    public function testAllRequiredKeysExistInPortuguese(): void
    {
        $translations = (new ReflectionClass(Translator::class))->getProperty('translations');
        $translations->setAccessible(true);
        $data = $translations->getValue();
        
        assert(isset($data['pt-BR']['invalid_data']), 'pt-BR should have invalid_data');
        assert(isset($data['pt-BR']['doctor_created']), 'pt-BR should have doctor_created');
        assert(isset($data['pt-BR']['crm_exists']), 'pt-BR should have crm_exists');
        echo "✓ testAllRequiredKeysExistInPortuguese\n";
    }

    public function testAllRequiredKeysExistInEnglish(): void
    {
        $translations = (new ReflectionClass(Translator::class))->getProperty('translations');
        $translations->setAccessible(true);
        $data = $translations->getValue();
        
        assert(isset($data['en-EN']['invalid_data']), 'en-EN should have invalid_data');
        assert(isset($data['en-EN']['doctor_created']), 'en-EN should have doctor_created');
        assert(isset($data['en-EN']['crm_exists']), 'en-EN should have crm_exists');
        echo "✓ testAllRequiredKeysExistInEnglish\n";
    }

    public function run(): void
    {
        echo "Running Translator tests...\n";
        $this->testGetLanguageWithPortugueseHeader();
        $this->testGetLanguageWithEnglishHeader();
        $this->testGetLanguageWithEmptyHeader();
        $this->testGetWithPortugueseTranslation();
        $this->testGetWithEnglishTranslation();
        $this->testGetReturnsKeyForUnknownTranslation();
        $this->testAllRequiredKeysExistInPortuguese();
        $this->testAllRequiredKeysExistInEnglish();
        echo "\nAll tests passed!\n";
    }
}

$test = new TranslatorTest();
$test->run();