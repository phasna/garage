<?php

namespace App\Repository;

use App\Entity\Vehicle;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Vehicle>
 */
class VehicleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Vehicle::class);
    }

    /**
     * Trouve tous les véhicules disponibles
     * @return Vehicle[]
     */
    public function findAvailable(): array
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.isAvailable = :available')
            ->setParameter('available', true)
            ->getQuery()
            ->getResult();
    }
}


