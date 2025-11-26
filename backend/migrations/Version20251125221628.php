<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251125221628 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE rental (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, start_time VARCHAR(10) NOT NULL, end_time VARCHAR(10) NOT NULL, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(20) NOT NULL, birth_date DATE NOT NULL, driving_license_number VARCHAR(50) NOT NULL, address VARCHAR(255) NOT NULL, city VARCHAR(100) NOT NULL, postal_code VARCHAR(20) NOT NULL, country VARCHAR(100) NOT NULL, total_price DOUBLE PRECISION NOT NULL, options CLOB DEFAULT NULL, status VARCHAR(20) NOT NULL, created_at DATETIME NOT NULL, vehicle_id INTEGER NOT NULL, CONSTRAINT FK_1619C27D545317D1 FOREIGN KEY (vehicle_id) REFERENCES vehicle (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_1619C27D545317D1 ON rental (vehicle_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE rental');
    }
}
