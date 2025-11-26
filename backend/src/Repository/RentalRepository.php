<?php

namespace App\Repository;

use App\Entity\Rental;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Rental>
 */
class RentalRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Rental::class);
    }

    /**
     * Vérifie si un véhicule est disponible pour une période donnée
     */
    public function isVehicleAvailableForPeriod(int $vehicleId, \DateTimeInterface $startDate, \DateTimeInterface $endDate): bool
    {
        $qb = $this->createQueryBuilder('r')
            ->where('r.vehicle = :vehicleId')
            ->andWhere('r.status = :status')
            ->andWhere('(
                (r.startDate <= :startDate AND r.endDate >= :startDate) OR
                (r.startDate <= :endDate AND r.endDate >= :endDate) OR
                (r.startDate >= :startDate AND r.endDate <= :endDate)
            )')
            ->setParameter('vehicleId', $vehicleId)
            ->setParameter('status', 'active')
            ->setParameter('startDate', $startDate)
            ->setParameter('endDate', $endDate);

        $count = $qb->select('COUNT(r.id)')
            ->getQuery()
            ->getSingleScalarResult();

        return $count === 0;
    }

    /**
     * Récupère toutes les réservations actives pour un véhicule
     */
    public function findActiveRentalsByVehicle(int $vehicleId): array
    {
        return $this->createQueryBuilder('r')
            ->where('r.vehicle = :vehicleId')
            ->andWhere('r.status = :status')
            ->setParameter('vehicleId', $vehicleId)
            ->setParameter('status', 'active')
            ->orderBy('r.startDate', 'ASC')
            ->getQuery()
            ->getResult();
    }
}

