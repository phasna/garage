<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251125210414 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE equipment (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(100) NOT NULL, code VARCHAR(50) NOT NULL, icon VARCHAR(10) NOT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D338D58377153098 ON equipment (code)');
        $this->addSql('CREATE TABLE "user" (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles CLOB NOT NULL, password VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649F85E0677 ON "user" (username)');
        $this->addSql('CREATE TABLE vehicle (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, brand VARCHAR(100) NOT NULL, model VARCHAR(100) NOT NULL, year INTEGER NOT NULL, fuel_type VARCHAR(50) NOT NULL, transmission VARCHAR(50) NOT NULL, seats INTEGER NOT NULL, price_per_day DOUBLE PRECISION NOT NULL, description CLOB NOT NULL, image_url VARCHAR(500) NOT NULL, category VARCHAR(100) NOT NULL, is_available BOOLEAN NOT NULL, unavailability_reason VARCHAR(100) DEFAULT NULL, unavailability_details CLOB DEFAULT NULL)');
        $this->addSql('CREATE TABLE vehicle_equipment (vehicle_id INTEGER NOT NULL, equipment_id INTEGER NOT NULL, PRIMARY KEY (vehicle_id, equipment_id), CONSTRAINT FK_248790D1545317D1 FOREIGN KEY (vehicle_id) REFERENCES vehicle (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_248790D1517FE9FE FOREIGN KEY (equipment_id) REFERENCES equipment (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_248790D1545317D1 ON vehicle_equipment (vehicle_id)');
        $this->addSql('CREATE INDEX IDX_248790D1517FE9FE ON vehicle_equipment (equipment_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE equipment');
        $this->addSql('DROP TABLE "user"');
        $this->addSql('DROP TABLE vehicle');
        $this->addSql('DROP TABLE vehicle_equipment');
    }
}
