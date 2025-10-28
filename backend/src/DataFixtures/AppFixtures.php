<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Rental;
use App\Entity\Vehicle;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Create vehicles
        $vehicles = [];

        // Economic vehicles
        $vehicle1 = new Vehicle();
        $vehicle1->setBrand('Renault')
            ->setModel('Clio')
            ->setYear(2022)
            ->setFuelType('essence')
            ->setTransmission('manuelle')
            ->setSeats(5)
            ->setPricePerDay('35.00')
            ->setDescription('Parfaite pour la ville, économique et pratique')
            ->setImageUrl('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500')
            ->setAvailable(true)
            ->setCategory('economique');
        $manager->persist($vehicle1);
        $vehicles[] = $vehicle1;

        $vehicle2 = new Vehicle();
        $vehicle2->setBrand('Ford')
            ->setModel('Fiesta')
            ->setYear(2021)
            ->setFuelType('essence')
            ->setTransmission('automatique')
            ->setSeats(5)
            ->setPricePerDay('40.00')
            ->setDescription('Citadine moderne avec transmission automatique')
            ->setImageUrl('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500')
            ->setAvailable(true)
            ->setCategory('economique');
        $manager->persist($vehicle2);
        $vehicles[] = $vehicle2;

        // Compact vehicles
        $vehicle3 = new Vehicle();
        $vehicle3->setBrand('Volkswagen')
            ->setModel('Golf')
            ->setYear(2023)
            ->setFuelType('hybride')
            ->setTransmission('automatique')
            ->setSeats(5)
            ->setPricePerDay('55.00')
            ->setDescription('Compacte hybride, confortable et écologique')
            ->setImageUrl('https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500')
            ->setAvailable(true)
            ->setCategory('compacte');
        $manager->persist($vehicle3);
        $vehicles[] = $vehicle3;

        // SUV
        $vehicle4 = new Vehicle();
        $vehicle4->setBrand('Peugeot')
            ->setModel('3008')
            ->setYear(2022)
            ->setFuelType('diesel')
            ->setTransmission('automatique')
            ->setSeats(7)
            ->setPricePerDay('75.00')
            ->setDescription('SUV familial spacieux avec 7 places')
            ->setImageUrl('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500')
            ->setAvailable(true)
            ->setCategory('suv');
        $manager->persist($vehicle4);
        $vehicles[] = $vehicle4;

        // Luxury
        $vehicle5 = new Vehicle();
        $vehicle5->setBrand('BMW')
            ->setModel('Série 3')
            ->setYear(2023)
            ->setFuelType('essence')
            ->setTransmission('automatique')
            ->setSeats(5)
            ->setPricePerDay('120.00')
            ->setDescription('Berline de luxe avec équipements haut de gamme')
            ->setImageUrl('https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500')
            ->setAvailable(true)
            ->setCategory('luxe');
        $manager->persist($vehicle5);
        $vehicles[] = $vehicle5;

        $vehicle6 = new Vehicle();
        $vehicle6->setBrand('Tesla')
            ->setModel('Model 3')
            ->setYear(2023)
            ->setFuelType('electrique')
            ->setTransmission('automatique')
            ->setSeats(5)
            ->setPricePerDay('95.00')
            ->setDescription('Véhicule électrique premium avec autopilot')
            ->setImageUrl('https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500')
            ->setAvailable(true)
            ->setCategory('luxe');
        $manager->persist($vehicle6);
        $vehicles[] = $vehicle6;

        // Utility vehicle
        $vehicle7 = new Vehicle();
        $vehicle7->setBrand('Renault')
            ->setModel('Master')
            ->setYear(2021)
            ->setFuelType('diesel')
            ->setTransmission('manuelle')
            ->setSeats(3)
            ->setPricePerDay('80.00')
            ->setDescription('Utilitaire pour déménagement et transport')
            ->setImageUrl('https://images.unsplash.com/photo-1586796945708-c7afd4e6bf31?w=500')
            ->setAvailable(true)
            ->setCategory('utilitaire');
        $manager->persist($vehicle7);
        $vehicles[] = $vehicle7;

        // Create customers
        $customers = [];

        $customer1 = new Customer();
        $customer1->setFirstName('Jean')
            ->setLastName('Dupont')
            ->setEmail('jean.dupont@email.com')
            ->setPhone('+33123456789')
            ->setBirthDate(new \DateTime('1985-03-15'))
            ->setDrivingLicenseNumber('123456789')
            ->setAddress('123 Rue de la Paix')
            ->setCity('Paris')
            ->setPostalCode('75001')
            ->setCountry('France');
        $manager->persist($customer1);
        $customers[] = $customer1;

        $customer2 = new Customer();
        $customer2->setFirstName('Marie')
            ->setLastName('Martin')
            ->setEmail('marie.martin@email.com')
            ->setPhone('+33198765432')
            ->setBirthDate(new \DateTime('1990-07-22'))
            ->setDrivingLicenseNumber('987654321')
            ->setAddress('456 Avenue des Champs')
            ->setCity('Lyon')
            ->setPostalCode('69001')
            ->setCountry('France');
        $manager->persist($customer2);
        $customers[] = $customer2;

        $customer3 = new Customer();
        $customer3->setFirstName('Pierre')
            ->setLastName('Durand')
            ->setEmail('pierre.durand@email.com')
            ->setPhone('+33145678901')
            ->setBirthDate(new \DateTime('1988-11-30'))
            ->setDrivingLicenseNumber('456789123')
            ->setAddress('789 Boulevard Saint-Michel')
            ->setCity('Marseille')
            ->setPostalCode('13001')
            ->setCountry('France');
        $manager->persist($customer3);
        $customers[] = $customer3;

        // Create some rentals
        $rental1 = new Rental();
        $rental1->setVehicle($vehicles[0])
            ->setCustomer($customers[0])
            ->setStartDate(new \DateTime('2024-01-15'))
            ->setEndDate(new \DateTime('2024-01-20'))
            ->setTotalPrice('175.00')
            ->setStatus('completed')
            ->setDeposit('200.00')
            ->setPaymentMethod('credit_card')
            ->setPaymentStatus('paid')
            ->setNotes('Location sans problème');
        $manager->persist($rental1);

        $rental2 = new Rental();
        $rental2->setVehicle($vehicles[2])
            ->setCustomer($customers[1])
            ->setStartDate(new \DateTime('2024-02-01'))
            ->setEndDate(new \DateTime('2024-02-07'))
            ->setTotalPrice('385.00')
            ->setStatus('active')
            ->setDeposit('300.00')
            ->setPaymentMethod('credit_card')
            ->setPaymentStatus('paid')
            ->setNotes('Location en cours');
        $manager->persist($rental2);

        $rental3 = new Rental();
        $rental3->setVehicle($vehicles[4])
            ->setCustomer($customers[2])
            ->setStartDate(new \DateTime('2024-03-10'))
            ->setEndDate(new \DateTime('2024-03-15'))
            ->setTotalPrice('600.00')
            ->setStatus('confirmed')
            ->setDeposit('500.00')
            ->setPaymentMethod('bank_transfer')
            ->setPaymentStatus('paid')
            ->setNotes('Location de luxe confirmée');
        $manager->persist($rental3);

        $manager->flush();
    }
}
