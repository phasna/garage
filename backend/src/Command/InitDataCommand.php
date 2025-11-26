<?php

namespace App\Command;

use App\Entity\Equipment;
use App\Entity\User;
use App\Entity\Vehicle;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:init-data',
    description: 'Initialise les données de base : admin, équipements et véhicules',
)]
class InitDataCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption('with-vehicles', null, InputOption::VALUE_NONE, 'Inclure les véhicules de démonstration')
            ->addOption('reset', null, InputOption::VALUE_NONE, 'Réinitialiser toutes les données');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        if ($input->getOption('reset')) {
            $io->warning('Réinitialisation de toutes les données...');
            $this->resetData();
        }

        // Créer l'administrateur
        $this->createAdmin($io);

        // Créer les équipements
        $equipments = $this->createEquipments($io);

        // Créer les véhicules si demandé
        if ($input->getOption('with-vehicles')) {
            $this->createVehicles($io, $equipments);
        }

        $io->success('Initialisation terminée avec succès !');

        return Command::SUCCESS;
    }

    private function resetData(): void
    {
        // Supprimer tous les véhicules
        $vehicles = $this->entityManager->getRepository(Vehicle::class)->findAll();
        foreach ($vehicles as $vehicle) {
            $this->entityManager->remove($vehicle);
        }

        // Supprimer tous les équipements
        $equipments = $this->entityManager->getRepository(Equipment::class)->findAll();
        foreach ($equipments as $equipment) {
            $this->entityManager->remove($equipment);
        }

        // Supprimer tous les utilisateurs
        $users = $this->entityManager->getRepository(User::class)->findAll();
        foreach ($users as $user) {
            $this->entityManager->remove($user);
        }

        $this->entityManager->flush();
    }

    private function createAdmin(SymfonyStyle $io): void
    {
        $existingUser = $this->entityManager->getRepository(User::class)->findOneBy(['username' => 'admin']);
        
        if ($existingUser) {
            $io->note('Utilisateur admin existe déjà');
            return;
        }

        $user = new User();
        $user->setUsername('admin');
        $user->setRoles(['ROLE_ADMIN']);
        
        $hashedPassword = $this->passwordHasher->hashPassword($user, 'admin123');
        $user->setPassword($hashedPassword);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $io->success('Utilisateur admin créé (username: admin, password: admin123)');
    }

    private function createEquipments(SymfonyStyle $io): array
    {
        $equipmentsData = [
            ['code' => 'gps', 'name' => 'GPS', 'icon' => '📍'],
            ['code' => 'regulateur', 'name' => 'Régulateur de vitesse', 'icon' => '⚡'],
            ['code' => 'camera_recul', 'name' => 'Caméra de recul', 'icon' => '📷'],
            ['code' => 'radar_stationnement', 'name' => 'Radar de stationnement', 'icon' => '📡'],
            ['code' => 'toit_panoramique', 'name' => 'Toit panoramique', 'icon' => '☀️'],
            ['code' => 'sieges_chauffants', 'name' => 'Sièges chauffants', 'icon' => '🔥'],
            ['code' => 'ecran_tactile', 'name' => 'Écran tactile', 'icon' => '📺'],
            ['code' => 'detecteur_angle_mort', 'name' => 'Détecteur angle mort', 'icon' => '👁️'],
            ['code' => 'hayon_electrique', 'name' => 'Hayon électrique', 'icon' => '🚪'],
            ['code' => 'limiteur', 'name' => 'Limiteur de vitesse', 'icon' => '🚦'],
            ['code' => 'keyless', 'name' => 'Démarrage sans clé', 'icon' => '🔑'],
            ['code' => 'carplay', 'name' => 'Apple CarPlay / Android Auto', 'icon' => '📱'],
            ['code' => 'grand_coffre', 'name' => 'Grand coffre', 'icon' => '🧳'],
        ];

        $equipments = [];
        
        foreach ($equipmentsData as $data) {
            $existing = $this->entityManager->getRepository(Equipment::class)->findOneBy(['code' => $data['code']]);
            
            if ($existing) {
                $equipments[$data['code']] = $existing;
                continue;
            }

            $equipment = new Equipment();
            $equipment->setCode($data['code']);
            $equipment->setName($data['name']);
            $equipment->setIcon($data['icon']);

            $this->entityManager->persist($equipment);
            $equipments[$data['code']] = $equipment;
        }

        $this->entityManager->flush();
        $io->success(count($equipmentsData) . ' équipements créés ou vérifiés');

        return $equipments;
    }

    private function createVehicles(SymfonyStyle $io, array $equipments): void
    {
        $vehiclesData = [
            [
                'brand' => 'Renault',
                'model' => 'Clio',
                'year' => 2022,
                'fuelType' => 'Essence',
                'transmission' => 'Manuelle',
                'seats' => 5,
                'pricePerDay' => 35,
                'description' => 'Parfaite pour la ville, économique et pratique',
                'imageUrl' => 'https://www.planeterenault.com/images/1200x900/filters:format(jpeg)/UserFiles/photos/slideshow/renault-clio-blue-dci-100-2022-001.jpeg',
                'category' => 'Économique',
                'equipments' => ['gps', 'regulateur', 'carplay']
            ],
            [
                'brand' => 'Ford',
                'model' => 'Fiesta',
                'year' => 2021,
                'fuelType' => 'Essence',
                'transmission' => 'Automatique',
                'seats' => 5,
                'pricePerDay' => 40,
                'description' => 'Citadine moderne avec transmission automatique',
                'imageUrl' => 'https://www.largus.fr/images/styles/max_1300x1300/public/images/ford-fiesta-hybrid-ecoboost-155-231_1.jpg?itok=-6b5mlXW',
                'category' => 'Économique',
                'equipments' => ['gps', 'regulateur', 'carplay']
            ],
            [
                'brand' => 'Volkswagen',
                'model' => 'Golf',
                'year' => 2023,
                'fuelType' => 'Hybride',
                'transmission' => 'Automatique',
                'seats' => 5,
                'pricePerDay' => 55,
                'description' => 'Compacte hybride, confortable et écologique',
                'imageUrl' => 'https://sf1.autoplus.fr/wp-content/uploads/autoplus/2023/01/volkswagen-golf-8-restylee-2023.jpg',
                'category' => 'Compacte',
                'equipments' => ['gps', 'regulateur', 'camera_recul', 'radar_stationnement', 'carplay']
            ],
            [
                'brand' => 'Peugeot',
                'model' => '3008',
                'year' => 2022,
                'fuelType' => 'Diesel',
                'transmission' => 'Automatique',
                'seats' => 7,
                'pricePerDay' => 75,
                'description' => 'SUV familial spacieux avec 7 places',
                'imageUrl' => 'https://www.completecar.ie/img/testdrives/11819_large.jpg',
                'category' => 'SUV',
                'equipments' => ['gps', 'toit_panoramique', 'camera_recul', 'detecteur_angle_mort', 'keyless']
            ],
            [
                'brand' => 'BMW',
                'model' => 'Série 3',
                'year' => 2023,
                'fuelType' => 'Essence',
                'transmission' => 'Automatique',
                'seats' => 5,
                'pricePerDay' => 120,
                'description' => 'Berline premium avec équipements haut de gamme',
                'imageUrl' => 'https://i.gaw.to/content/photos/52/47/524791-bmw-serie-3-2023-de-belles-retouches-et-un-grand-ecran.jpeg',
                'category' => 'Berline',
                'equipments' => ['gps', 'sieges_chauffants', 'ecran_tactile', 'camera_recul', 'keyless']
            ],
            [
                'brand' => 'Tesla',
                'model' => 'Model 3',
                'year' => 2023,
                'fuelType' => 'Électrique',
                'transmission' => 'Automatique',
                'seats' => 5,
                'pricePerDay' => 95,
                'description' => 'Véhicule électrique premium avec grande autonomie',
                'imageUrl' => 'https://i.gaw.to/vehicles/photos/40/29/402996-2023-tesla-model-3.jpg',
                'category' => 'Électrique',
                'equipments' => ['gps', 'ecran_tactile', 'camera_recul', 'keyless']
            ],
            [
                'brand' => 'Renault',
                'model' => 'Master',
                'year' => 2021,
                'fuelType' => 'Diesel',
                'transmission' => 'Manuelle',
                'seats' => 3,
                'pricePerDay' => 80,
                'description' => 'Utilitaire pour déménagement et transport',
                'imageUrl' => 'https://www.largus.fr/images/styles/max_1300x1300/public/images/renault-master-2021-12-7.jpg?itok=G0F4xn-s',
                'category' => 'Utilitaire',
                'equipments' => ['gps', 'radar_stationnement', 'grand_coffre']
            ],
            [
                'brand' => 'Audi',
                'model' => 'A4',
                'year' => 2022,
                'fuelType' => 'Hybride',
                'transmission' => 'Automatique',
                'seats' => 5,
                'pricePerDay' => 110,
                'description' => 'Berline executive avec technologie avancée',
                'imageUrl' => 'https://hips.hearstapps.com/hmg-prod/images/2022-audi-a4-mmp-1-1621027611.jpg?crop=0.795xw:0.671xh;0.0849xw,0.178xh&resize=2048:*',
                'category' => 'Berline',
                'equipments' => ['gps', 'sieges_chauffants', 'ecran_tactile', 'camera_recul', 'keyless']
            ],
            [
                'brand' => 'Peugeot',
                'model' => '508',
                'year' => 2022,
                'fuelType' => 'Diesel',
                'transmission' => 'Automatique',
                'seats' => 5,
                'pricePerDay' => 70,
                'description' => 'Berline française élégante et spacieuse',
                'imageUrl' => 'https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1662729832/autoexpress/2022/09/Peugeot%20508%20facelift%202022%20UK.jpg',
                'category' => 'Berline',
                'equipments' => ['gps', 'regulateur', 'camera_recul', 'carplay', 'grand_coffre']
            ],
            [
                'brand' => 'Renault',
                'model' => 'Talisman',
                'year' => 2021,
                'fuelType' => 'Essence',
                'transmission' => 'Automatique',
                'seats' => 5,
                'pricePerDay' => 65,
                'description' => 'Berline confortable pour longs trajets',
                'imageUrl' => 'https://www.ecoreseau.fr/wp-content/uploads/2021/06/2020-Nouvelle-Renault-TALISMAN-1.jpg',
                'category' => 'Berline',
                'equipments' => ['gps', 'regulateur', 'camera_recul', 'carplay', 'grand_coffre']
            ],
            [
                'brand' => 'Renault',
                'model' => 'Zoe',
                'year' => 2023,
                'fuelType' => 'Électrique',
                'transmission' => 'Automatique',
                'seats' => 5,
                'pricePerDay' => 50,
                'description' => 'Citadine électrique idéale pour la ville',
                'imageUrl' => 'https://cdn.motor1.com/images/mgl/W3Jx1/s1/2020-renault-zoe.webp',
                'category' => 'Électrique',
                'equipments' => ['gps', 'ecran_tactile', 'camera_recul']
            ],
            [
                'brand' => 'Mercedes-Benz',
                'model' => 'Classe S',
                'year' => 2023,
                'fuelType' => 'Hybride',
                'transmission' => 'Automatique',
                'seats' => 5,
                'pricePerDay' => 250,
                'description' => 'Berline de luxe ultime avec confort exceptionnel',
                'imageUrl' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/2018_Mercedes-Benz_S_350_D_AMG_Line_Front.jpg/1200px-2018_Mercedes-Benz_S_350_D_AMG_Line_Front.jpg',
                'category' => 'Luxe',
                'equipments' => ['gps', 'sieges_chauffants', 'ecran_tactile', 'toit_panoramique', 'hayon_electrique', 'keyless']
            ],
        ];

        $count = 0;
        foreach ($vehiclesData as $data) {
            $vehicle = new Vehicle();
            $vehicle->setBrand($data['brand']);
            $vehicle->setModel($data['model']);
            $vehicle->setYear($data['year']);
            $vehicle->setFuelType($data['fuelType']);
            $vehicle->setTransmission($data['transmission']);
            $vehicle->setSeats($data['seats']);
            $vehicle->setPricePerDay($data['pricePerDay']);
            $vehicle->setDescription($data['description']);
            $vehicle->setImageUrl($data['imageUrl']);
            $vehicle->setCategory($data['category']);
            $vehicle->setIsAvailable(true);

            foreach ($data['equipments'] as $equipmentCode) {
                if (isset($equipments[$equipmentCode])) {
                    $vehicle->addEquipment($equipments[$equipmentCode]);
                }
            }

            $this->entityManager->persist($vehicle);
            $count++;
        }

        $this->entityManager->flush();
        $io->success($count . ' véhicules créés');
    }
}


